import styled, { StyledComponent } from 'react-emotion';
import { map } from 'lodash';
import { transformCss, ExtendedStandardProperties } from 'styles';

/**
 * Basic HTML+CSS building block. Has built-in typescript definitions for the standard css properties.
 * If you add a prop that's not a css property, remove it from
 */
const Div: StyledComponent<
  // Props
  ExtendedStandardProperties & { children?: React.ReactNode },
  // No inner props?
  {},
  // No theme
  {}
> = styled('div')(
  ({
    // Picking out props here lets you set defaults, just remember to add them back below.
    display = 'flex',
    ...remainingProps
  }) => {
    // Create an array with each of our CSS Properties
    return map({ ...remainingProps, display }, (value, key) => transformCss(key, value));
  },
);

export default Div;

export const Ul = styled(Div.withComponent('ul'))({ margin: 0, padding: 0 });
export const Li = styled(Div.withComponent('li'))();