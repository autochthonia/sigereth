import React, { SFC } from 'react';
import Flex from 'atoms/Flex';
import { Link } from 'found';

const DashboardView: SFC = () => (
  <Flex>
    <Link to="/games/malfeas">Malfeas</Link>
  </Flex>
);

export default DashboardView;
