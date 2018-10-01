import React from 'react';
import { FlexOl, FlexLi } from 'atoms/Flex';
import { Combatant as TCombatant } from 'types/Combat';
import Combatant from './Combatant';
import { DocumentSnapshotExpanded } from 'types/Firestation';

export interface CombatantListProps {
  combatants: DocumentSnapshotExpanded<TCombatant>[];
  activeCombatant: DocumentSnapshotExpanded<TCombatant>;
}

const CombatantList = ({ combatants, activeCombatant }: CombatantListProps) => (
  <FlexOl flexDirection="column">
    {combatants.map(c => (
      <FlexLi key={c.id}>
        <Combatant combatant={c} isActive={activeCombatant && c.id === activeCombatant.id} />
      </FlexLi>
    ))}
  </FlexOl>
);

export default CombatantList;
