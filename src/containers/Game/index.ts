import Game from 'pages/Game';
import withFirestore from 'services/withFirestore';
import { WithRouter } from 'found';
import { orderBy, head } from 'lodash';
import { withProps, compose } from 'recompose';
import { DocumentSnapshotExpanded } from 'types/Firestation';
import { Game as IGame } from 'types/Game';
import { Combatant, Combat } from 'types/Combat';

const GameContainer = compose<
  {
    game: DocumentSnapshotExpanded<IGame>;
    activeCombatant: Combatant;
    orderedCombatants: Combatant[];
  },
  WithRouter
>(
  withFirestore<WithRouter>()({
    queries: {
      game: async (firestore, props) => firestore.doc(`games/${props.match.params.gameId}`),
      combat: async (firestore, props) => firestore.collection(`games/${props.match.params.gameId}/combats`).doc(props.match.params.gameId),
    },
    props: [],
  }),
  withProps<
    {
      activeCombatant: Combatant;
      orderedCombatants: Combatant[];
    },
    { combat: DocumentSnapshotExpanded<Combat> }
  >(({ combat }) => {
    const orderedCombatants = orderBy(combat.data.combatants, ['initiative'], ['desc']);
    return {
      orderedCombatants,
      activeCombatant: head(orderedCombatants),
    };
  }),
)(Game);

export default GameContainer;
