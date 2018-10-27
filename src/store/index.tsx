import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { store as firestore, getUID } from 'services/firestation';
import { Game } from 'types/Game';
import { DocumentSnapshotExpanded, QuerySnapshotExpanded } from 'types/Firestation';
import { User } from 'types/User';
import firebase from 'firebase';
import { createFSUserRef } from 'services/fsSelector';

export interface StoreState {
  refs: {
    bodyRef: React.RefObject<HTMLElement>;
    modalRef: React.RefObject<HTMLElement>;
    headerRef: React.RefObject<HTMLElement>;
    mainRef: React.RefObject<HTMLElement>;
    footerRef: React.RefObject<HTMLElement>;
  };
  auth: firebase.auth.UserCredential;
  actions: {
    subscribe?: (
      callback: (
        store: firebase.firestore.Firestore,
        getState: () => StoreState,
        setState: (state: StoreState, sideEffect?: Function) => void,
      ) => () => void,
    ) => () => void;
    login?: () => Promise<void>;
    logout?: () => Promise<void>;
  };
  games: QuerySnapshotExpanded<Game>;
  user: DocumentSnapshotExpanded<User>;
}
interface StoreProps {
  children: JSX.Element;
}

export const initialState: StoreState = {
  refs: {
    bodyRef: React.createRef<HTMLElement>(),
    modalRef: React.createRef<HTMLElement>(),
    headerRef: React.createRef<HTMLElement>(),
    mainRef: React.createRef<HTMLElement>(),
    footerRef: React.createRef<HTMLElement>(),
  },
  auth: null,
  actions: null,
  games: null,
  user: null,
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
        login: this.login,
        logout: this.logout,
      },
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('onAuthStateChanged - logged in');
        return this.setState({
          ...this.state,
          auth: {
            ...this.state.auth,
            user,
          },
        });
      }
      console.log('onAuthStateChanged - `logged out');
      return this.setState({
        ...this.state,
        auth: null,
      });
    });
  }

  login = () =>
    firebase
      .auth()
      .signInAnonymously()
      .then(auth =>
        this.setState({
          ...this.state,
          auth,
        }),
      )
      .then(() => {
        createFSUserRef(getUID())
          .get()
          .then(snap => {
            if (!snap.exists) {
              firestore
                .collection('users')
                .doc(getUID())
                .set({});
            }
          });
      });

  logout = () =>
    firebase
      .auth()
      .signOut()
      .then(() =>
        this.setState({
          ...this.state,
          auth: null,
          user: null,
        }),
      );

  subscribe: StoreState['actions']['subscribe'] = callback =>
    callback(firestore, () => ({ ...this.state }), this.setState.bind(this));

  render() {
    console.debug(this.state);
    return <Store.Provider value={this.state}>{this.props.children}</Store.Provider>;
  }
}

export interface StoreConnect {
  store: StoreState;
}
export const connectStore = () => (WrappedComponent: React.ComponentType<StoreConnect>) => (
  props: object,
) => <Store.Consumer>{store => <WrappedComponent store={store} {...props} />}</Store.Consumer>;
