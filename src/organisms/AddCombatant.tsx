import Flex from 'atoms/Flex';
import { toNumber } from 'lodash';
import React, { SFC, ChangeEvent } from 'react';
import { Combatant } from 'types/Combat';
import { withStateHandlers } from 'recompose';
import Input from 'atoms/Input';
import { firestore } from 'firebase';

export interface PAddCombatants {
  addCombatant: (c: Partial<Combatant>) => Promise<firestore.DocumentReference>;
}

const Form = Flex.withComponent('form');

const AddCombatant: SFC<PAddCombatants & SAddCombatants & HAddCombatants> = ({
  addCombatant,
  name,
  setName,
  initiative,
  setInitiative,
}) => (
  <Form
    flexDirection="column"
    onSubmit={e => {
      e.preventDefault();
      addCombatant({ name, initiative, turnOver: false });
      setName({ target: { value: '' } });
      setInitiative({ target: { value: 3 } });
    }}
  >
    <h3>Add Combatant</h3>
    <Flex>
      <Input value={name} onChange={setName} />
      <Input value={initiative} onChange={setInitiative} type="number" />
      <Input type="submit" value="Add Combatant" />
    </Flex>
  </Form>
);

interface SAddCombatants {
  name: string;
  initiative: number;
}
type HAddCombatants = {
  setName(
    e: ChangeEvent<HTMLInputElement> | { target: { value: string } },
  ): Partial<SAddCombatants>;
  setInitiative(
    e: ChangeEvent<HTMLInputElement> | { target: { value: number } },
  ): Partial<SAddCombatants>;
};

export default withStateHandlers<SAddCombatants, HAddCombatants, {}>(
  { name: '', initiative: 3 },
  {
    setName: () => (e: ChangeEvent<HTMLInputElement>) => ({ name: e.target.value }),
    setInitiative: () => (e: ChangeEvent<HTMLInputElement>) => ({
      initiative: toNumber(e.target.value),
    }),
  },
)(AddCombatant);
