import React from 'react';
import Flex from 'atoms/Flex';
import Input from 'atoms/Input';
import { useInput } from 'hooks/useInput';

const Form = Flex.withComponent('form');

const MessagesRollInput = () => {
  const diceInput = useInput();
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Input {...diceInput} />

      <Input type="button" value="Roll" />
    </Form>
  );
};

export default MessagesRollInput;
