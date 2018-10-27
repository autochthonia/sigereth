import { compose, lifecycle, mapProps } from 'recompose';
import { connectStore, StoreConnect } from '.';
import RenderChildren from 'atoms/RenderChildren';
import { expandDocumentSnapshot } from './expandSnapshot';
import { DocumentSnapshot } from 'types/Firestation';
import { User } from 'types/User';

export const UserSubscription = compose(
  connectStore(),
  lifecycle<StoreConnect, { unsubscribe?: Function }>({
    componentWillMount() {
      console.log(1);
      const {
        store: {
          actions: { subscribe },
          auth,
        },
      } = this.props;
      console.log(subscribe);
      this.setState({
        ...this.state,
        unsubscribe: subscribe((firestore, getState, setState) => {
          if (auth && auth.user) {
            console.debug('Subscribing to user');
            return firestore
              .doc(`users/${auth.user.uid}`)
              .onSnapshot((snap: DocumentSnapshot<User>) => {
                const state = getState();
                setState({
                  ...state,
                  user: expandDocumentSnapshot(snap),
                });
              });
          } else {
            console.error('UserSubscription error: no user found');
          }
        }),
      });
    },
    componentWillUnmount() {
      console.debug('Unsubscribing from user: ', !!this.state.unsubscribe);
      this.state.unsubscribe && this.state.unsubscribe();
    },
  }),
  mapProps(({ store, ...props }) => ({ ...props })),
)(RenderChildren);
