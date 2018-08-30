import { compose, branch, withProps, renderComponent, mapProps } from 'recompose';
import { orderBy, head } from 'lodash';
import Game from 'pages/Game';
// @ts-ignore
import { connectStore, StoreConnect } from 'store';
// @ts-ignore
import { WithRouter, withRouter } from 'found';
import Loading from 'atoms/Loading';
import { getGame } from 'store/selectors';

const GameContainer = compose(
  connectStore(),
  // withRouter,
  withProps(({ store, match }: StoreConnect & WithRouter) => {
    console.log('test');
    const game = getGame(store, { match });
    const loading = !(game && game.exists);
    const gameData = !loading && game && game.data;
    const orderedCombatants =
      !loading && orderBy(gameData.combat.combatants, ['initiative'], ['desc']);
    console.log(`loading status: ${loading ? 'loading' : 'ready'}`);

    return {
      game: !loading && game.data,
      orderedCombatants,
      loading,
      combat: !loading && gameData.combat,
      activeCombatant: !loading && head(orderedCombatants),
    };
  }),
  branch(({ loading }) => loading, renderComponent(Loading)),
  mapProps(({ router, match, store, loading, ...props }) => ({ ...props })),
)(Game);

export default GameContainer;
