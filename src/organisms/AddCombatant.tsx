import Flex from 'atoms/Flex';
import { toNumber } from 'lodash';
import React, { SFC, FormEvent } from 'react';
import { Combatant } from 'types/Combat';
import { DocumentReference } from 'types/Firestation';
import { withStateHandlers } from 'recompose';
import Input from 'atoms/Input';

export interface PAddCombatants {
  addCombatant: (c: Partial<Combatant>) => Promise<DocumentReference>;
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
  setName(e: FormEvent<HTMLInputElement>): Partial<SAddCombatants>;
  setInitiative(e: FormEvent<HTMLInputElement>): Partial<SAddCombatants>;
};

export default withStateHandlers<SAddCombatants, HAddCombatants, {}>(
  { name: '', initiative: 3 },
  {
    setName: () => e => ({ name: e.target.value }),
    setInitiative: () => e => ({ initiative: toNumber(e.target.value) }),
  },
)(AddCombatant);
