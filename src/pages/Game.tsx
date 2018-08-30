import React, { SFC } from 'react';
import Flex from 'atoms/Flex';
import CombatantList from 'organisms/CombatantList';
import { Game } from 'types/Game';
import { Combat, Combatant } from 'types/Combat';

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
    Turn {turn} - Active Combatant: {activeCombatant.name}
  </Article>
);

type GameProps = {
  game: Game;
  combat: Combat;
  orderedCombatants: Combatant[];
  activeCombatant: Combatant;
};

const Game: SFC<GameProps> = ({ orderedCombatants, activeCombatant, game, combat }) => (
  <Flex>
    <GameHeader name={game.name} />
    <CombatInfo activeCombatant={activeCombatant} turn={combat.turn} />
    <CombatantList combatants={orderedCombatants} activeCombatant={activeCombatant} />
  </Flex>
);

export default Game;
