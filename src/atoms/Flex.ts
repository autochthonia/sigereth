import styled from 'react-emotion';

import basicCss from 'styles/basicCss';
import flexCss from 'styles/flexCss';
import marginPaddingCss from 'styles/marginPaddingCss';
import resetCss from 'styles/resetCss';

const Flex = styled.div(resetCss, flexCss, basicCss, marginPaddingCss);

export default Flex;
export const FlexUl = Flex.withComponent('ul');
export const FlexOl = Flex.withComponent('ol');
export const FlexLi = Flex.withComponent('li');
