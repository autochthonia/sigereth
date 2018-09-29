import Flex from 'atoms/Flex';
import React, { SFC } from 'react';
import withTextEntry, { WithTextEntry } from './withTextEntry';
import Input from 'atoms/Input';
import withDisabled, { WithDisabled } from './withDisabled';
import { compose } from 'recompose';
import { DocumentReference } from 'types/Firestation';

const Form = Flex.withComponent('form');
const SubmitButton = Flex.withComponent('input');

export interface MessagesChatInputProps {
  sendMessage: (value: string) => Promise<DocumentReference>;
}
const MessagesChatInput: SFC<WithTextEntry & WithDisabled & MessagesChatInputProps> = ({
  value,
  onChange,
  sendMessage,
  disabled,
  setDisabled,
}) => (
  <Form
    onSubmit={e => {
      e.preventDefault();
      setDisabled(true);
      sendMessage(value)
        .then(() => {
          setDisabled(false);
          onChange({ target: { value: '' } });
        })
        .catch(() => {
          setDisabled(false);
        });
    }}
  >
    <Input value={value} onChange={onChange} disabled={disabled} />
    <SubmitButton type="submit" disabled={disabled} />
  </Form>
);

export default compose<WithTextEntry & WithDisabled, MessagesChatInputProps>(
  withTextEntry,
  withDisabled,
)(MessagesChatInput);
