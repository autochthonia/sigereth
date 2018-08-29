import { ComponentType } from 'react';
import { compose, mapProps } from 'recompose';
import { pick } from 'lodash';
import { connectStore, StoreConnect, StoreState, initialState } from '.';

export interface WithAuthStatus {
  isLoggedIn: boolean;
}

export const WithAuthStatus = (WrappedComponent: ComponentType<WithAuthStatus>) =>
  compose<WithAuthStatus, {}>(
    connectStore(),
    mapProps<WithAuthStatus, StoreConnect>(({ store, ...props }) => ({
      ...props,
      isLoggedIn: !!store.auth,
    })),
  )(WrappedComponent);

export const WithActions = (
  pickArray = Object.keys(initialState.actions) as Array<keyof StoreState['actions']>,
) => (WrappedComponent: ComponentType<any>) =>
  compose<any, {}>(
    connectStore(),
    mapProps<any, StoreConnect>(({ store, ...props }) => ({
      ...props,
      actions: pick(store.actions, pickArray),
    })),
  )(WrappedComponent);

export interface WithActions {
  actions: StoreState['actions'];
}
