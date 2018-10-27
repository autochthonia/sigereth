import React from 'react';
import { css, keyframes } from 'emotion';

const rotatePlane = keyframes({
  '0%': {
    transform: 'perspective(120px) rotateX(0deg) rotateY(0deg)',
  },
  '50%': {
    transform: 'perspective(120px) rotateX(-180.1deg) rotateY(0deg)',
  },
  '100%': {
    transform: 'perspective(120px) rotateX(-180deg) rotateY(-179.9deg)',
  },
});

const spinnerClass = css({
  width: 40,
  height: 40,
  backgroundColor: '#333',
  margin: '100px auto',
  animation: `${rotatePlane} 1.2s infinite ease-in-out`,
});

const Spinner = () => <div className={spinnerClass} />;

export default Spinner;
