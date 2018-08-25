import React from 'react';
import { times } from 'lodash';
import Flex from './Flex';

const Dotscale = ({ value, scale = 5 }: { value: number; scale?: number }) => (
  <Flex>{times(scale, idx => (value >= idx ? '⚫' : '⚪'))}</Flex>
);

export default Dotscale;
