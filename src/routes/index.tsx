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

injectGlobal(normalize(), {
  'html, body, #root, #container': { height: '100%', width: '100%' },
  html: {
    ':after': {
      filter: 'url(#roughpaper)',
      content: "''",
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: -999,
    },
  },
});
const Layout: SFC = ({ children }) => (
  <>
    <div id="container">
      <HeaderContainer />
      <main>{children}</main>
      <footer>footer</footer>
    </div>
    <svg style={{ visibility: 'hidden', position: 'absolute', height: 0, width: 0 }}>
      <filter id="roughpaper" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="5" result="noise" />
        <feDiffuseLighting in="noise" result="diffLight" lighting-color="white" surfaceScale="2">
          <feDistantLight azimuth="50" elevation="58" />
        </feDiffuseLighting>
      </filter>
      <rect x="0" y="0" width="100%" height="100%" filter="url(#roughpaper)" fill="none" />
    </svg>
  </>
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
            path="profile"
            getComponent={async () => (await import('../pages/Profile')).default}
          />
          <TransformAsyncRoute
            path="games/new"
            getComponent={async () => (await import('../containers/CreateGame')).default}
          />
          <TransformAsyncRoute
            path="games/:gameId/settings"
            getComponent={async () => (await import('../pages/Game/Settings')).default}
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
