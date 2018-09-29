import React from 'react';
import { keyframes, css } from 'react-emotion';

// $offset: 187;
// $duration: 1.4s;

// .spinner {
//   animation: rotator $duration linear infinite;
// }

// .path {
//   stroke-dasharray: $offset;
//   stroke-dashoffset: 0;
//   transform-origin: center;
//   animation:
//     dash $duration ease-in-out infinite,
//     colors ($duration*4) ease-in-out infinite;
// }

const offset = 187;
const duration = 1.4;

const rotator = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(270deg)' },
});

const dash = keyframes({
  '0%': { strokeDashoffset: offset },
  '50%': { strokeDashoffset: offset / 4, transform: 'rotate(135deg)' },
  '100%': { strokeDashoffset: offset, transform: 'rotate(450deg)' },
});

const colors = keyframes({
  '0%': { stroke: 'grey' },
  '100%': { stroke: 'black' },
});

const spinnerCss = css({
  animation: `${rotator} ${duration}s linear infinite`,
});

const pathCss = css({
  strokeDasharray: offset,
  strokeDashoffset: 0,
  transformOrigin: 'center',
  animation: [
    `${dash} ${duration}s ease-in-out infinite`,
    `${colors} ${duration * 4}s ease-in-out infinite`,
  ],
});

const Loading = () => (
  <svg
    className={spinnerCss}
    width="65px"
    height="65px"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className={pathCss}
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      cx="33"
      cy="33"
      r="30"
    />
  </svg>
);

export default Loading;
