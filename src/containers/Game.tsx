import { compose, branch, withProps, renderComponent } from 'recompose';
import { orderBy } from 'lodash';
import Game from 'pages/Game';
// @ts-ignore
import withLifecycle from '@hocs/with-lifecycle';
import { connectStore, StoreConnect } from 'store';
import { WithRouter, withRouter } from 'found';
import { Game as TGame } from 'types/Game';
import Loading from 'atoms/Loading';

const GameContainer = compose<{}, StoreConnect & WithRouter>(
  connectStore(),
  withRouter,
  withLifecycle({
    onWillMount({
      store,
      match: {
        params: { gameId },
      },
    }: StoreConnect & WithRouter) {
      this.unsubscribe = store.actions.subscribe((firestore, getState, setState) => {
        firestore.doc(`games/${gameId}`).onSnapshot(snap => {
          const state = getState();
          setState({
            ...state,
            games: {
              ...state.games,
              [gameId]: {
                ...snap,
                data: snap.data() as TGame,
              },
            },
          });
        });
      });
    },
    onWillUnmount() {
      this.unsubscribe();
    },
  }),
  withProps(({ store: { games }, match: { params: { gameId } } }: StoreConnect & WithRouter) => ({
    orderedCombatants: orderBy(games[gameId].data.combat.combatants, ['initiative'], ['desc']),
    loading: !games[gameId].exists,
  })),
  branch(() => false, renderComponent(Loading)),
)(Game);

export default GameContainer;
