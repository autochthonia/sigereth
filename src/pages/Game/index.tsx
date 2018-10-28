import React, { Component } from 'react';
import Flex from 'atoms/Flex';
import CombatantList from 'organisms/CombatantList';
import { Game as IGame, Message, Player } from 'types/Game';
import { Combat, Combatant } from 'types/Combat';
import MessagesContainer from 'containers/Game/Messages';
import AddCombatant from 'organisms/AddCombatant';
import { PMessagesOrganism } from 'organisms/Messages';
import { firestore } from 'firebase';
import { getUID } from 'services/firestation';
import GameHeader from 'organisms/GameHeader';

interface CombatInfoProps {
  turn: Combat['turn'];
  activeCombatant: firestore.DocumentSnapshotExpanded<Combatant>;
}
const Article = Flex.withComponent('section');
const CombatInfo = ({ turn, activeCombatant }: CombatInfoProps) => (
  <Article>
    Turn {turn} - Active Combatant: {activeCombatant ? activeCombatant.data.name : 'None'}
  </Article>
);

interface PGame {
  game: firestore.DocumentSnapshotExpanded<IGame>;
  combat: firestore.DocumentSnapshotExpanded<Combat>;
  activeCombatant: firestore.DocumentSnapshotExpanded<Combatant>;
  orderedCombatants: firestore.DocumentSnapshotExpanded<Combatant>[];
  players: firestore.QuerySnapshotExpanded<Player>;
}

class Game extends Component<PGame> {
  messagesRef = this.props.game.ref.collection<Message>('messages');
  sendMessage: PMessagesOrganism['sendMessage'] = async m =>
    this.props.game.ref.collection('messages').add({
      // TODO: sanitize message
      body: m,
      createdAt: firestore.FieldValue.serverTimestamp(),
      sender: this.props.game.ref.collection('players').doc(getUID()),
    });
  render() {
    const { orderedCombatants, activeCombatant, game, combat, players } = this.props;
    return (
      <Flex flexDirection="column">
        <GameHeader gameName={game.data.name} />
        <Flex>
          <Flex flexDirection="column" flexBasis="20%">
            <CombatInfo activeCombatant={activeCombatant} turn={combat.data.turn} />
            <CombatantList combatants={orderedCombatants} activeCombatant={activeCombatant} />
            <AddCombatant
              addCombatant={combatant => combat.ref.collection('combatants').add(combatant)}
            />
          </Flex>
          <Flex flexDirection="column" flexBasis="60%">
            as
          </Flex>
          <Flex flexBasis="20%" flexDirection="column">
            <MessagesContainer
              messages={this.messagesRef}
              sendMessage={this.sendMessage}
              players={players}
            />
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default Game;
