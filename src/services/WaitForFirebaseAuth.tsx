import React, { Component } from 'react';
import { auth } from 'firebase';
import SmartLoader from 'atoms/SmartLoader';

class WaitForFirebaseAuth extends Component<{}, { auth: boolean }> {
  state: { auth: boolean } = {
    auth: null,
  };
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        console.log('WaitForFirebaseAuth - Logged In');
        this.setState({ auth: true });
      } else {
        console.log('WaitForFirebaseAuth - Not Logged In');
        this.setState({ auth: false });
      }
    });
  }
  render() {
    return this.state.auth === null ? <SmartLoader /> : this.props.children;
  }
}

export default WaitForFirebaseAuth;