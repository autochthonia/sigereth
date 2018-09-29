import React, { SFC } from 'react';
import Flex from 'atoms/Flex';
import CombatantList from 'organisms/CombatantList';
import { Game, Message } from 'types/Game';
import { Combat, Combatant } from 'types/Combat';
import { DocumentSnapshotExpanded, CollectionReference } from 'types/Firestation';
import MessagesContainer from 'containers/Game/Messages';
import { firestore } from 'firebase';
import { getUID } from 'services/firestation';

interface GameHeaderProps {
  name: Game['name'];
}
const Header = Flex.withComponent('header');
const GameHeader = ({ name }: GameHeaderProps) => <Header>{name}</Header>;

interface CombatInfoProps {
  turn: Combat['turn'];
  activeCombatant: Combatant;
}
const Article = Flex.withComponent('section');
const CombatInfo = ({ turn, activeCombatant }: CombatInfoProps) => (
  <Article>
    Turn {turn} - Active Combatant: {activeCombatant ? activeCombatant.name : 'None'}
  </Article>
);

type GameProps = {
  game: DocumentSnapshotExpanded<Game>;
  combat: DocumentSnapshotExpanded<Combat>;
  orderedCombatants: Combatant[];
  activeCombatant: Combatant;
};

const Game: SFC<GameProps> = ({ orderedCombatants, activeCombatant, game, combat }) => (
  <Flex flexDirection="column">
    <GameHeader name={game.data.name} />
    <Flex>
      <Flex flexDirection="column">
        <CombatInfo activeCombatant={activeCombatant} turn={combat.data.turn} />
        <CombatantList combatants={orderedCombatants} activeCombatant={activeCombatant} />
      </Flex>
      <Flex>
        <MessagesContainer
          messages={game.ref.collection('messages') as CollectionReference<Message>}
          sendMessage={async m =>
            game.ref.collection('messages').add({
              // TODO: sanitize message
              body: m,
              createdAt: firestore.FieldValue.serverTimestamp(),
              sender: firestore().doc(`users/${getUID()}`),
            } as Message)
          }
        />
      </Flex>
    </Flex>
  </Flex>
);

export default Game;
