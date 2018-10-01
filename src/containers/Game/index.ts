import Game from 'pages/Game';
import withFirestore from 'services/withFirestore';
import { WithRouter } from 'found';
import { orderBy, head, reject } from 'lodash';
import { withProps, compose } from 'recompose';
import { DocumentSnapshotExpanded, QuerySnapshotExpanded } from 'types/Firestation';
import { Game as IGame, Player } from 'types/Game';
import { Combatant, Combat } from 'types/Combat';

const GameContainer = compose<
  {
    game: DocumentSnapshotExpanded<IGame>;
    combat: DocumentSnapshotExpanded<Combat>;
    players: QuerySnapshotExpanded<Player>;
    activeCombatant: DocumentSnapshotExpanded<Combatant>;
    orderedCombatants: DocumentSnapshotExpanded<Combatant>[];
  },
  WithRouter
>(
  withFirestore<WithRouter>()({
    queries: {
      game: async (firestore, props) => firestore.doc(`games/${props.match.params.gameId}`),
      combat: async (firestore, props) =>
        firestore
          .collection(`games/${props.match.params.gameId}/combats`)
          // 1 combat per game paradigm right now - hardcoded here
          .doc(props.match.params.gameId),
      combatants: async (firestore, props) =>
        firestore
          .collection(`games/${props.match.params.gameId}/combats`)
          .doc(props.match.params.gameId)
          .collection('combatants'),
      players: async (firestore, props) =>
        firestore.collection(`games/${props.match.params.gameId}/players`),
    },
    props: [],
  }),
  withProps<
    {
      activeCombatant: DocumentSnapshotExpanded<Combatant>;
      orderedCombatants: DocumentSnapshotExpanded<Combatant>[];
    },
    { combatants: QuerySnapshotExpanded<Combatant> }
  >(({ combatants }) => {
    const orderedCombatants = orderBy(combatants.docs, ['data.initiative'], ['desc']);
    return {
      orderedCombatants,
      activeCombatant: head(reject(orderedCombatants, ['data.turnOver', true])),
    };
  }),
)(Game);

export default GameContainer;
