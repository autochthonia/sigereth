import React, { Component, ReactChildren } from 'react';
import Loading from 'icons/Loading';

interface SmartLoaderProps {
  error?: Error;
  timeout?: number;
  delay?: number;
  loading?: boolean;
}

class SmartLoader extends Component<
  SmartLoaderProps,
  { delayPassed: boolean; timeoutPassed: boolean }
> {
  static defaultProps: SmartLoaderProps & { children: ReactChildren } = {
    error: null,
    timeout: 0,
    delay: 0,
    loading: true,
    children: null,
  };
  state = { delayPassed: false, timeoutPassed: false };
  delayTimeout: NodeJS.Timer = null;
  timeoutTimeout: NodeJS.Timer = null;
  componentDidMount() {
    if (this.props.delay >= 0) {
      this.delayTimeout = setTimeout(() => {
        this.setState({ delayPassed: true });
      }, this.props.delay);
    }

    if (this.props.timeout > 0) {
      this.timeoutTimeout = setTimeout(() => {
        this.setState({ timeoutPassed: true });
      }, this.props.timeout);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.delayTimeout);
    clearTimeout(this.timeoutTimeout);
  }
  render() {
    const { children, loading, error } = this.props;
    const { delayPassed, timeoutPassed } = this.state;
    if (error) {
      return <span>Uh oh, there's been an error.</span>;
    }
    if (timeoutPassed && loading) {
      return <span>Hmmm, this seems to be taking a while</span>;
    }
    if (delayPassed && loading) {
      return <Loading />;
    }
    return loading ? null : children;
  }
}

export default SmartLoader;