import {  Interpolation, Themed } from 'react-emotion';

export default ({
  display = 'flex',
  alignContent,
  alignItems,
  alignSelf,
  flex,
  flexBasis,
  flexDirection,
  flexFlow,
  flexGrow,
  flexShrink,
  flexWrap,
  justifyContent,
  order,
  placeContent,
}: {
  [cssProperty: string]: any;
}) => ({
  display,
  alignContent,
  alignItems,
  alignSelf,
  flex,
  flexBasis,
  flexDirection,
  flexFlow,
  flexGrow,
  flexShrink,
  flexWrap,
  justifyContent,
  order,
  placeContent,
});
