import React, { Component } from 'react';
import Flex, { TFlex } from 'atoms/Flex';
import { WithRouter, Link } from 'found';
import { WithAuthStatus, WithActions } from 'store/HoC';
import styled from 'react-emotion';
import { performanceLog } from 'services/log';

const Header: TFlex<HTMLElement> = styled(Flex)({
  background: 'grey',
  position: 'relative',
  marginBottom: 12,
  '::after': {
    filter: 'url(#brushed-line-filter)',
    background: 'grey',
    height: '12px',
    width: '100%',
    display: 'block',
    content: "''",
    top: '100%',
    position: 'absolute',
    zIndex: -1,
  },
}).withComponent('header');

class HeaderView extends Component<WithRouter & WithAuthStatus & WithActions> {
  onResize = () => {
    performanceLog.warn('HeaderView onResize');
    this.forceUpdate();
  };
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
  render() {
    console.log('rerender');
    const {
      router,
      isLoggedIn,
      actions: { logout },
    } = this.props;
    return (
      <>
        {/* https://codepen.io/anon/pen/qJVzGz */}
        <svg style={{ visibility: 'hidden', position: 'absolute', height: 0, width: 0 }}>
          <filter id="brushed-line-filter">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.004 4"
              numOctaves="3"
              seed="122"
              stitchTiles="stitch"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              // in2="colormatrix1"
              scale="-18"
              xChannelSelector="R"
              yChannelSelector="R"
              result="displacementMap"
            />
            <feGaussianBlur in="displacementMap" stdDeviation="0.575" />
          </filter>
        </svg>
        <Header justifyContent="space-between" padding={6}>
          <span>Sigereth</span>
          <span>
            {isLoggedIn ? (
              <button onClick={() => logout().then(() => router.push('/'))}>log out</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </span>
        </Header>
      </>
    );
  }
}

export default HeaderView;
