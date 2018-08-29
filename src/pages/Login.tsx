import React from 'react';
import { WithRouter } from 'found';
import { compose } from 'recompose';
import { connectStore, StoreConnect } from 'store';

const Login = ({
  router,
  store: {
    actions: { login },
  },
}: WithRouter & StoreConnect) => (
  <div>
    <button onClick={() => login().then(() => router.push('/dashboard'))}>log in</button>
  </div>
);

export default compose(connectStore())(Login);
