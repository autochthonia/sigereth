import React, { SFC } from 'react';
import { createBrowserRouter, makeRouteConfig, Route, RouteRenderArgs, WithRouter } from 'found';
import firebase from 'firebase';
import Login from 'pages/Login';
import { UserSubscription } from 'store/Subscriptions';
import HeaderContainer from 'containers/Header';
import SmartLoader from 'atoms/SmartLoader';
import WaitForFirebaseAuth from 'services/WaitForFirebaseAuth';
import LandingPage from 'pages/Landing';
import { injectGlobal } from 'emotion';
import { normalize } from 'polished';

injectGlobal(normalize());
const Layout: SFC = ({ children }) => (
  <div>
    <HeaderContainer />
    <main>{children}</main>
    <footer>footer</footer>
  </div>
);

class AsyncRoute extends Route {
  // @ts-ignore
  render({ Component, props }: RouteRenderArgs) {
    console.log('Async route initiated. Loading status: ', Component && props ? 'done' : 'loading');
    return Component && props ? <Component {...props} /> : <SmartLoader />;
  }
}
const TransformAsyncRoute = AsyncRoute as any;

const ProtectedRouteRedirect: SFC<WithRouter> = ({ children, router }) => {
  if (!firebase.auth().currentUser) {
    console.debug('User is not currently signed in, redirecting to login page.');
    router.replace('/login');
  }
  return <React.Fragment>{children}</React.Fragment>;
};

const routeConfig = makeRouteConfig(
  <Route path="/" Component={WaitForFirebaseAuth}>
    <Route path="/" Component={Layout}>
      <Route path="/" Component={LandingPage} />
      <Route path="login" Component={Login} />
      <Route Component={ProtectedRouteRedirect}>
        <Route Component={UserSubscription}>
          <TransformAsyncRoute
            path="dashboard"
            getComponent={async () => (await import('../containers/Dashboard')).default}
          />
          <TransformAsyncRoute
            path="games/new"
            getComponent={async () => (await import('../containers/CreateGame')).default}
          />
          <TransformAsyncRoute
            path="games/:gameId"
            getComponent={async () => (await import('../containers/Game')).default}
          />
        </Route>
      </Route>
    </Route>
  </Route>,
);

const BrowserRouter = createBrowserRouter({
  routeConfig,
  renderError: ({ error }) => <div>{error.status === 404 ? 'Not found' : 'Error'}</div>,
});

export default BrowserRouter;
