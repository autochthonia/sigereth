import React, { SFC, ChangeEvent } from 'react';
import Input from 'atoms/Input';
import { FlexCss } from 'styles/flexCss';
import Flex from 'atoms/Flex';

export interface PLabeledInput {
  flexDirection?: FlexCss['flexDirection'];
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const LabeledInput: SFC<PLabeledInput> = ({
  flexDirection = 'column',
  children,
  value,
  onChange,
  onBlur,
  name,
}) => (
  <Flex flexDirection={flexDirection} width="100%">
    <label htmlFor={name}>{children}</label>
    <Input value={value} onChange={onChange} onBlur={onBlur} id={name} />
  </Flex>
);

export default LabeledInput;
