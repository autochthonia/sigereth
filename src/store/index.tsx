import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { store as firestore } from 'services/firestation';
import { Game } from 'types/Game';
import { Document } from 'types/Firestation';

export interface StoreState {
  refs: {
    bodyRef: React.RefObject<HTMLElement>;
    modalRef: React.RefObject<HTMLElement>;
    headerRef: React.RefObject<HTMLElement>;
    mainRef: React.RefObject<HTMLElement>;
    footerRef: React.RefObject<HTMLElement>;
  };
  actions: {
    subscribe?: (
      callback: (
        store: firebase.firestore.Firestore,
        getState: () => StoreState,
        setState: (state: StoreState, sideEffect?: Function) => void,
      ) => void,
    ) => void;
  };
  games: {
    [gameId: string]: Document<Game>;
  };
}
interface StoreProps {
  children: JSX.Element;
}

const initialState: StoreState = {
  refs: {
    bodyRef: React.createRef<HTMLElement>(),
    modalRef: React.createRef<HTMLElement>(),
    headerRef: React.createRef<HTMLElement>(),
    mainRef: React.createRef<HTMLElement>(),
    footerRef: React.createRef<HTMLElement>(),
  },
  actions: {},
  games: {},
};

const { Provider, Consumer } = React.createContext(initialState);

export default class Store extends Component<StoreProps, StoreState> {
  static Provider = Provider;
  static Consumer = Consumer;
  static propTypes = {
    children: PropTypes.node,
  };
  constructor(props: StoreProps) {
    super(props);
    this.state = {
      ...initialState,
      actions: {
        ...initialState.actions,
        subscribe: this.subscribe,
      },
    };
  }

  subscribe: StoreState['actions']['subscribe'] = callback =>
    callback(firestore, () => ({ ...this.state }), this.setState.bind(this));

  render() {
    return <Store.Provider value={this.state}>{this.props.children}</Store.Provider>;
  }
}

export interface StoreConnect {
  store: StoreState;
}
export const connectStore = () => (WrappedComponent: React.ComponentClass<StoreConnect>) => (
  props: object,
) => <Store.Consumer>{store => <WrappedComponent store={store} {...props} />}</Store.Consumer>;
