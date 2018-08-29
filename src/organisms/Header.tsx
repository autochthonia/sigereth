import React, { SFC } from 'react';
import Flex from 'atoms/Flex';
import { WithRouter, Link } from 'found';
import { WithAuthStatus, WithActions } from 'store/HoC';

const Header = Flex.withComponent('header');
const HeaderView: SFC<WithRouter & WithAuthStatus & WithActions> = ({
  router,
  isLoggedIn,
  actions: { logout },
}) => (
  <Header justifyContent="space-between">
    <span>Sigereth</span>
    <span>
      {isLoggedIn ? (
        <button onClick={() => logout().then(() => router.push('/'))}>log out</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </span>
  </Header>
);

export default HeaderView;
