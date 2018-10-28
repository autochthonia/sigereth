import React from 'react';
import { FlexOl, FlexLi } from 'atoms/Flex';
import { Combatant as TCombatant } from 'types/Combat';
import Combatant from './Combatant';
import { css } from 'emotion';
import { firestore } from 'firebase';

export interface CombatantListProps {
  combatants: firestore.DocumentSnapshotExpanded<TCombatant>[];
  activeCombatant: firestore.DocumentSnapshotExpanded<TCombatant>;
}

const CombatantList = ({ combatants, activeCombatant }: CombatantListProps) => (
  <FlexOl flexDirection="column" marginLeft={12}>
    {combatants.map(c => (
      <FlexLi
        key={c.id}
        className={css({
          marginTop: 12,
          marginBottom: 12,
          ':last-child': { marginBottom: 0 },
          ':first-child': { marginTop: 0 },
        })}
      >
        <Combatant combatant={c} isActive={activeCombatant && c.id === activeCombatant.id} />
      </FlexLi>
    ))}
  </FlexOl>
);

export default CombatantList;
