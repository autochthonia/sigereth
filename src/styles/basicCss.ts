import { Interpolation, Themed } from 'react-emotion';

export default ({
  height,
  width,
  background,
  backgroundColor,
  color,
  borderRadius,
  cursor,
  border,
  borderWidth,
  borderColor,
  font,
  fontFamily,
  fontWeight,
  fontSize,
  position,
}: {
  [cssProperty: string]: any;
}) => ({
  height,
  width,
  background,
  backgroundColor,
  color,
  borderRadius,
  cursor,
  border,
  borderWidth,
  borderColor,
  font,
  fontFamily,
  fontWeight,
  fontSize,
  position,
});
