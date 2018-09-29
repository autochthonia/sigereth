import React, { SFC } from 'react';
import { WithRouter } from 'found';
import { compose } from 'recompose';
import { connectStore, StoreConnect } from 'store';

const Login: SFC<WithRouter & StoreConnect> = ({
  router,
  store: {
    actions: { login },
  },
}) => (
  <div>
    <button onClick={() => login().then(() => router.push('/dashboard'))}>log in</button>
  </div>
);

export default compose(connectStore())(Login);
