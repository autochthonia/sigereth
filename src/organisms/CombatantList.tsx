import React from 'react';
import { FlexOl, FlexLi } from 'atoms/Flex';
import { Combatant as TCombatant } from 'types/Combat';
import Combatant from './Combatant';

export interface CombatantListProps {
  combatants: TCombatant[];
  activeCombatant: TCombatant;
}

const CombatantList = ({ combatants, activeCombatant }: CombatantListProps) => (
  <FlexOl>
    {combatants.map(c => (
      <FlexLi>
        <Combatant combatant={c} isActive={c === activeCombatant} />
      </FlexLi>
    ))}
  </FlexOl>
);

export default CombatantList;
