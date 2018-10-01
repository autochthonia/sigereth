import React, { SFC } from 'react';
import Flex from 'atoms/Flex';
import { Link } from 'found';

const LandingPage: SFC = () => (
  <Flex flexDirection="column">
    <h1>Sigereth</h1>
    <h2>Exalted 3rd edition combat manager</h2>

    <Link to="/dashboard">Dashboard</Link>
  </Flex>
);

export default LandingPage;
