import React, { SFC, ChangeEvent } from 'react';
import Flex, { FlexUl, FlexLi } from 'atoms/Flex';
import { firestore } from 'firebase';
import { Combatant } from 'types/Combat';
import { max } from 'lodash';
import styled from 'react-emotion';
import colors from 'styles/colors';
import Input from 'atoms/Input';
import { BackgroundProperty } from 'csstype';
import OnslaughtIcon from 'icons/Onslaught';
import InitiativeSpinner from 'molecules/InitiativeSpinner';
import { toNumber } from 'lodash';
import { withHandlers } from 'recompose';

const CombatantWrapper = styled(Flex)(
  {
    border: `1px solid ${colors.black}`,
    borderRadius: 3,
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    ':hover': { boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)' },
  },
  ({ turnOver }: { turnOver: boolean; isActive: boolean }) => ({
    background: turnOver ? colors.turnOver : colors.white,
  }),
  ({ turnOver, isActive }) => {
    if (turnOver) {
      return { boxShadow: 'none' };
    }
    if (isActive) {
      return { boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)' };
    }

    return {
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    };
  },
);

const Avatar = styled(Flex)(
  {
    height: 50,
    width: 50,
    borderRadius: '50%',
    fontVariant: 'uppercase',
    fontSize: 36,
    lineHeight: `${36 * 2}px`,
  },
  ({ background }: { background: BackgroundProperty<string> }) => ({ background }),
);

interface PCombatant {
  combatant: firestore.DocumentSnapshotExpanded<Combatant>;
  isActive: boolean;
  className?: string;
}

interface HCombatant {
  onChangeInitiative: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const Combatant: SFC<PCombatant & HCombatant> = ({
  className,
  combatant: {
    ref,
    data: {
      name = '',
      initiative = 0,
      turnOver = false,
      evasion = 0,
      parry = 0,
      onslaught = 0,
      willpower = 0,
      woundPenalty = 0,
    },
  },
  isActive,
  onChangeInitiative,
}) => (
  <CombatantWrapper className={className} turnOver={turnOver} isActive={isActive} padding={4}>
    <Input
      type="checkbox"
      checked={turnOver}
      onChange={() => ref.update({ turnOver: !turnOver })}
    />
    <InitiativeSpinner value={initiative} onChange={onChangeInitiative} />
    <Avatar background={'lightblue'} justifyContent="center" alignItems="center">
      {name && <span>{name[0]}</span>}
    </Avatar>
    <Flex flexGrow={1} flexDirection="column">
      <Flex>{name}</Flex>
      <FlexUl>
        <FlexLi>Defense: {max([evasion, parry]) - onslaught}</FlexLi>
        <FlexLi>Willpower: {willpower}</FlexLi>
        <FlexLi>Wound Penalty: {woundPenalty}</FlexLi>
        <FlexLi>
          <OnslaughtIcon /> {onslaught}
        </FlexLi>
      </FlexUl>
    </Flex>
  </CombatantWrapper>
);

export default withHandlers<PCombatant, HCombatant>({
  onChangeInitiative: ({ combatant: { ref } }) => (e: ChangeEvent<HTMLInputElement>) =>
    ref.update({ initiative: toNumber(e.target.value) }),
})(Combatant);
