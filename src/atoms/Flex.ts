import styled from 'react-emotion';

import basicCss from 'styles/basicCss';
import flexCss, { FlexCss } from 'styles/flexCss';
import marginPaddingCss from 'styles/marginPaddingCss';
import resetCss from 'styles/resetCss';
import listCss, { ListCss } from 'styles/listCss';
import { StyledOtherComponent } from 'create-emotion-styled';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type TFlex<TheElement = HTMLDivElement, ExtraCss = {}> = StyledOtherComponent<
  FlexCss & ExtraCss & { [propName: string]: any },
  DetailedHTMLProps<HTMLAttributes<TheElement>, TheElement>,
  any
>;

const Flex: TFlex = styled.div(resetCss, flexCss as any, basicCss, marginPaddingCss);

export default Flex;

export const FlexUl: TFlex<HTMLUListElement, ListCss> = styled(Flex)(listCss).withComponent('ul');

export const FlexOl: TFlex<HTMLOListElement, ListCss> = styled(Flex)(listCss).withComponent('ol');

export const FlexLi: TFlex<HTMLLIElement, ListCss> = styled(Flex)(listCss).withComponent('li');
