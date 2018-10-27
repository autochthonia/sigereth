import React, { Component, ComponentClass, ComponentType } from 'react';
import {
  DocumentReference,
  Query,
  CollectionReference,
  DocumentSnapshotExpanded,
  QuerySnapshotExpanded,
} from 'types/Firestation';
import { firestore } from 'firebase';
import { pick, forEach, isEqual, isFunction, every } from 'lodash';
import SmartLoader from 'atoms/SmartLoader';
import { expandDocumentSnapshot, expandQuerySnapshot } from 'store/expandSnapshot';

type FirestoreQueryable<DataType> =
  | DocumentReference<DataType>
  | Query<DataType>
  | CollectionReference<DataType>;

type FirestoryQueryableFunction<DataType, Props> = (
  firestore: firestore.Firestore,
  props: Props,
) => Promise<FirestoreQueryable<DataType>>;

type QueryConfigEntry<Props = {}> =
  | FirestoreQueryable<any>
  | FirestoryQueryableFunction<any, Props>;

type QueryConfig<Props = {}> = {
  [queryName: string]: QueryConfigEntry<Props>;
};

type FirestoreQueryableExpanded<
  Props,
  QE extends QueryConfigEntry<Props>
> = QE extends FirestoreQueryable<any>
  ? FirestoreQueryableExpanded1<QE>
  : QE extends FirestoryQueryableFunction<any, Props>
    ? FirestoreQueryableExpanded1<ReturnType<QE>>
    : unknown;

type FirestoreQueryableExpanded1<QE extends FirestoreQueryable<any>> = QE extends
  | CollectionReference<infer DataType>
  | Query<infer DataType>
  ? QuerySnapshotExpanded<DataType>
  : QE extends DocumentReference<infer DataType> ? DocumentSnapshotExpanded<DataType> : unknown;

interface WithFirestoreConfig<Props, PL extends keyof Props, Q extends QueryConfig<Props>> {
  /** Object containing the queries to be provided to WrappedComponent.
   * The queryName used is also the prop name the snapshot is passed in. */
  queries: Q;
  /** A list of props to whitelist passing to WrappedComponent.
   * Configs without a list will whitelist all props */
  props?: PL[];
  /** Loading config items */
  loading?: {
    /** Number of ms after which to display the loading icon */
    delay?: number;
    /** Number of ms after which to display the timeout message */
    timeout?: number;
  };
}

type WithFirestoreHoC = <Props>() => <PL extends keyof Props, Q extends QueryConfig<Props>>(
  config: WithFirestoreConfig<Props, PL, Q>,
) => (
  WrappedComponent: ComponentType<WithFirestore<Props, Q> & Pick<Props, PL>>,
) => ComponentClass<Props, { error: Error; queries: {}; loaded: boolean }>;

const withFirestore: WithFirestoreHoC =
  // An extra function call is needed so that callers can specify Props and
  // still have PL and Q inferred.  It can be removed when
  // https://github.com/Microsoft/TypeScript/issues/10571 is implemented.
  <Props extends {}>() =>
    // Note: if `props` is not passed, there will be no inference for PL and it
    // will default to its constraint, which is exactly the behavior we want as
    // far as typing is concerned.
    <PL extends keyof Props, Q extends QueryConfig<Props>>({
      queries,
      props: propPickList,
      loading: { delay = 200, timeout = 0 } = {},
    }: WithFirestoreConfig<Props, PL, Q>) => WrappedComponent =>
      class WithFirestoreConnect extends Component<
        Props,
        { error: Error; queries: WithFirestore<Props, Q>; loaded: boolean }
      > {
        subscriptions: {
          [queryName: string]: ReturnType<FirestoreQueryable<any>['onSnapshot']>;
        } = {};
        state = {
          error: null as Error,
          queries: {} as WithFirestore<Props, Q>,
          loaded: false,
        };
        componentDidMount() {
          this.restartSubscription();
        }

        cancelSubscriptions = () => {
          forEach(this.subscriptions, unsubscribe => unsubscribe());
          this.subscriptions = {};
        };

        restartSubscription = () => {
          const queryLoadedArray: Promise<boolean>[] = [];
          // Open questions:
          //   - figuring out when all loaded (use a promise?)
          this.cancelSubscriptions();
          forEach(queries, (q: QueryConfigEntry<Props>, key) =>
            queryLoadedArray.push(
              new Promise(async (res, rej) => {
                console.log(`Starting query: '${key}'`);

                let ref: FirestoreQueryable<any>;
                if (isFunction(q)) {
                  // The fact that this is an async/await means that we can
                  // create dependent queries within our FirestoreQueryableFunction
                  ref = await q(firestore(), this.props);
                } else {
                  ref = q;
                }
                if (ref instanceof firestore.DocumentReference) {
                  this.subscriptions[key] = ref.onSnapshot(
                    snap => {
                      this.setState(
                        {
                          queries: Object.assign({}, this.state.queries, {
                            [key]: expandDocumentSnapshot(snap),
                          }),
                        },
                        () => {
                          res(true);
                        },
                      );
                    },
                    err => {
                      console.error(JSON.stringify(err));
                      this.setState({ error: err }, () => {
                        this.cancelSubscriptions();
                        rej(false);
                      });
                    },
                  );
                } else if (
                  ref instanceof firestore.CollectionReference ||
                  ref instanceof firestore.Query
                ) {
                  const ref2: {
                    onSnapshot(
                      os: (snap: firestore.QuerySnapshot) => void,
                      oe: (err: Error) => void,
                    ): () => void;
                  } = ref;
                  this.subscriptions[key] = ref2.onSnapshot(
                    snap => {
                      this.setState(
                        {
                          queries: Object.assign({}, this.state.queries, {
                            [key]: expandQuerySnapshot(snap),
                          }),
                        },
                        () => {
                          res(true);
                        },
                      );
                    },
                    err => {
                      console.error(JSON.stringify(err));
                      this.setState({ error: err }, () => {
                        this.cancelSubscriptions();
                        rej(false);
                      });
                    },
                  );
                }
              }),
            ),
          );
          Promise.all(queryLoadedArray)
            .then(() => {
              if (every(queryLoadedArray, q => q)) {
                console.log('all queries loaded successfully');
                this.setState({ loaded: true });
              } else {
                console.log('at least one query failed');
              }
            })
            .catch(() => {
              if (!this.state.error) {
                this.setState({ error: new Error() }, () => {
                  this.cancelSubscriptions();
                });
              }
            });
        };

        componentDidUpdate(prevProps: Props) {
          if (!isEqual(this.props, prevProps)) {
            this.restartSubscription();
          }
        }
        componentWillUnmount() {
          this.cancelSubscriptions();
        }
        render() {
          if (!this.state.loaded || this.state.error) {
            return <SmartLoader error={this.state.error} timeout={timeout} delay={delay} />;
          }

          const whitelistedProps = propPickList ? pick(this.props, propPickList) : this.props;
          // Have to recast to any because I can't figure out the ts error
          const WrappedComponent2 = WrappedComponent as any;
          return <WrappedComponent2 {...whitelistedProps} {...this.state.queries} />;
        }
      };

export type WithFirestore<Props, Q extends QueryConfig<Props>> = {
  [queryName in keyof Q]: FirestoreQueryableExpanded<Props, Q[queryName]>
};

export default withFirestore;

// EXAMPLE
// interface MyDoc {
//   y: number;
// }
// declare let myDocRef: DocumentReference<MyDoc>;
// declare let myCollRef: CollectionReference<MyDoc>;
// const wrapped = withFirestore<{ x: string }>()({
//   queries: {
//     myDoc: myDocRef,
//     myColl: myCollRef,
//   },
// })(props => {
//   return <>{props.myDoc.data.y + props.myColl.docs[props.x].data.y}</>;
// });
