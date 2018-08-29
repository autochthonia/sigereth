import React from 'react';
import Flex from 'atoms/Flex';
import { Combatant } from 'types/Combat';
import { max } from 'lodash';
import styled from 'react-emotion';
import colors from 'styles/colors';

const CombatantWrapper = styled(Flex)(
  {
    border: `1px solid ${colors.black}`,
    borderRadius: 3,
  },
  ({ turnOver }: { turnOver: boolean }) => ({
    background: turnOver ? colors.turnOver : colors.white,
  }),
);

const Combatant = ({
  combatant: {
    name = '',
    initiative = 0,
    turnOver = false,
    evasion = 0,
    parry = 0,
    onslaught = 0,
    willpower = 0,
    woundPenalty = 0,
  },
  isActive,
}: {
  combatant: Combatant;
  isActive: boolean;
}) => (
  <CombatantWrapper turnOver={turnOver} isActive={isActive}>
    <Flex>{name}</Flex>
    <Flex>{initiative}</Flex>
    <Flex>Defense: {max([evasion, parry]) - onslaught}</Flex>
    <Flex>Willpower: {willpower}</Flex>
    <Flex>Wound Penalty: {woundPenalty}</Flex>
  </CombatantWrapper>
);

export default Combatant;
