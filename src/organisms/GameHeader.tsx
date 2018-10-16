import React, { DetailedHTMLProps, HTMLAttributes, SFC } from 'react';
import styled from 'react-emotion';
import Flex, { FlexUl, FlexLi } from 'atoms/Flex';
import { StyledOtherComponent } from 'create-emotion-styled';
import { FlexCss } from 'styles/flexCss';

const Header: StyledOtherComponent<
  FlexCss & { [propName: string]: any },
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
  any
> = styled(Flex)({ listStyle: 'none' }).withComponent('header');

interface PGameHeader {
  gameName: string;
}

const GameHeader: SFC<PGameHeader> = ({ gameName }) => (
  <Header flexDirection="column">
    <Flex>{gameName}</Flex>
    <FlexUl display="inline-flex" justifyContent="center" margin={0} padding={0} listStyle="none">
      <FlexLi padding={12} margin="0 12px">
        Characters
      </FlexLi>
      <FlexLi padding={12} margin="0 12px">
        Notes
      </FlexLi>
      <FlexLi padding={12} margin="0 12px">
        Roll
      </FlexLi>
    </FlexUl>
  </Header>
);

export default GameHeader;
