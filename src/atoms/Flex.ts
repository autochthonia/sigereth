import styled from 'react-emotion';

import basicCss from 'styles/basicCss';
import flexCss, { FlexCss } from 'styles/flexCss';
import marginPaddingCss from 'styles/marginPaddingCss';
import resetCss from 'styles/resetCss';
import { StyledOtherComponent } from 'create-emotion-styled';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

const Flex: StyledOtherComponent<
  FlexCss & { [propName: string]: any },
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  any
> = styled.div(resetCss, flexCss as any, basicCss, marginPaddingCss);

export default Flex;
export const FlexUl = Flex.withComponent('ul');
export const FlexOl = Flex.withComponent('ol');
export const FlexLi = Flex.withComponent('li');
