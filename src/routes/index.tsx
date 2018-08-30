import React, { SFC } from 'react';
import {
  createBrowserRouter,
  makeRouteConfig,
  Route,
  RedirectException,
  RouteRenderArgs,
} from 'found';
import firebase from 'firebase';
import Login from 'pages/Login';
import Loading from 'atoms/Loading';
import { UserSubscription, GameSubscription } from 'store/Subscriptions';
import HeaderContainer from 'containers/Header';
import RenderChildren from 'atoms/RenderChildren';

const Layout: SFC = ({ children }) => (
  <div>
    <HeaderContainer />
    <main>{children}</main>
    <footer>footer</footer>
  </div>
);
const LandingPage: SFC = () => <div>Landing Page</div>;

class AsyncRoute extends Route {
  // @ts-ignore
  render({ Component, props }: RouteRenderArgs) {
    console.log('Async route initiated. Loading status: ', Component && props ? 'done' : 'loading');
    return Component && props ? <Component {...props} /> : <Loading />;
  }
}
const TransformAsyncRoute = AsyncRoute as any;

const routeConfig = makeRouteConfig(
  <Route path="/" Component={Layout}>
    <Route path="/" Component={LandingPage} />
    <Route path="login" Component={Login} />
    <Route
      Component={RenderChildren}
      render={({ Component, ...props }) => {
        if (!firebase.auth().currentUser) throw new RedirectException('/login');
        return Component && props ? <Component {...props} /> : <Loading />;
      }}
    >
      <Route Component={UserSubscription}>
        <TransformAsyncRoute
          path="dashboard"
          getComponent={async () => (await import('../containers/Dashboard')).default}
        />
        <Route Component={GameSubscription}>
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
