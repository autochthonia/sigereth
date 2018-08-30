import { compose, lifecycle, mapProps } from 'recompose';
import { connectStore, StoreConnect } from '.';
import { WithRouter, withRouter } from 'found';
import RenderChildren from 'atoms/RenderChildren';
import { expandDocumentSnapshot } from './util';
import { DocumentSnapshot } from 'types/Firestation';
import { Game } from 'types/Game';
import { User } from 'types/User';
import { getGames } from './selectors';

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

export const GameSubscription = compose(
  withRouter,
  connectStore(),
  lifecycle<StoreConnect & WithRouter, { unsubscribe?: Function }>({
    componentDidMount() {
      const {
        store: {
          actions: { subscribe },
        },
        match: {
          params: { gameId },
        },
      } = this.props;
      this.setState({
        ...this.state,
        unsubscribe: subscribe((firestore, getState, setState) => {
          console.debug(`Subscribing to game '${gameId}'`);
          return firestore.doc(`games/${gameId}`).onSnapshot((snap: DocumentSnapshot<Game>) => {
            const state = getState();
            const games = getGames(state);
            const gameDocs = (games && games.docs) || {};
            setState({
              ...state,
              games: {
                ...games,
                docs: {
                  ...gameDocs,
                  [gameId]: expandDocumentSnapshot(snap),
                },
              },
            });
          });
        }),
      });
    },
    componentWillUnmount() {
      console.debug('Unsubscribing from game: ', this.state.unsubscribe);
      this.state.unsubscribe && this.state.unsubscribe();
    },
  }),
  mapProps(({ store, ...props }) => ({ ...props })),
)(RenderChildren);
