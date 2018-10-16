import styled from 'react-emotion';

import basicCss from 'styles/basicCss';
import flexCss, { FlexCss } from 'styles/flexCss';
import marginPaddingCss from 'styles/marginPaddingCss';
import resetCss from 'styles/resetCss';
import listCss, { ListCss } from 'styles/listCss';
import { StyledOtherComponent } from 'create-emotion-styled';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

const Flex: StyledOtherComponent<
  FlexCss & { [propName: string]: any },
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  any
> = styled.div(resetCss, flexCss as any, basicCss, marginPaddingCss);

export default Flex;
export const FlexUl: StyledOtherComponent<
  FlexCss & ListCss & { [propName: string]: any },
  DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
  any
> = styled(Flex)(listCss).withComponent('ul');

export const FlexOl: StyledOtherComponent<
  FlexCss & ListCss & { [propName: string]: any },
  DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>,
  any
> = styled(Flex)(listCss).withComponent('ol');

export const FlexLi: StyledOtherComponent<
  FlexCss & ListCss & { [propName: string]: any },
  DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>,
  any
> = styled(Flex)(listCss).withComponent('li');
