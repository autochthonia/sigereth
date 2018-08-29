import { compose, lifecycle } from 'recompose';
import { connectStore, StoreConnect } from '.';
// @ts-ignore
import withLifecycle from '@hocs/with-lifecycle';
import { WithRouter } from 'found';
import { User } from 'types/User';

export const userSubscription = (WrappedComponent: any) =>
  compose(
    connectStore(),
    lifecycle<StoreConnect & WithRouter, { unsubscribe?: Function }>({
      componentWillMount() {
        const {
          store,
          match: {
            params: { gameId },
          },
        } = this.props;
        this.setState({
          ...this.state,
          unsubscribe: store.actions.subscribe((firestore, getState, setState) => {
            console.debug('Subscribing to users');
            return firestore.doc(`users/${gameId}`).onSnapshot(snap => {
              const state = getState();
              setState({
                ...state,
                user: {
                  ref: snap.ref,
                  id: snap.id,
                  metadata: snap.metadata,
                  data: snap.data() as User,
                },
              });
            });
          }),
        });
      },
      componentWillUnmount() {
        console.debug('Unsubscribing from users');
        this.state.unsubscribe && this.state.unsubscribe();
      },
    }),
  )(WrappedComponent);
