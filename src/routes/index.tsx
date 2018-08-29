import React, { SFC } from 'react';
import { createBrowserRouter, makeRouteConfig, Route, RedirectException } from 'found';
import firebase from 'firebase';
import Login from 'pages/Login';

const Layout: SFC = ({ children }) => (
  <div>
    <header>header</header>
    <main>{children}</main>
    <footer>footer</footer>
  </div>
);
const LandingPage: SFC = () => <div>Landing Page</div>;

const routeConfig = makeRouteConfig(
  <Route path="/" Component={Layout}>
    <Route path="/" Component={LandingPage} />
    <Route path="/login" Component={Login} />
    <Route
      render={({ Component, ...props }) => {
        if (!firebase.auth().currentUser) throw new RedirectException('/login');
        return <Component {...props} />;
      }}
    >
      <Route
        path="/dashboard"
        getComponent={async () => (await import('../containers/Dashboard')).default}
      />
      <Route
        path="/games/:gameId"
        getComponent={async () => (await import('../containers/Game')).default}
      />
    </Route>
  </Route>,
);

const BrowserRouter = createBrowserRouter({
  routeConfig,
  renderError: ({ error }) => <div>{error.status === 404 ? 'Not found' : 'Error'}</div>,
});

export default BrowserRouter;
