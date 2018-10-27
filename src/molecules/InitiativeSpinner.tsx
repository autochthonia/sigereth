import React, { PureComponent, ChangeEvent, FocusEvent } from 'react';
import Input from 'atoms/Input';
import styled from 'react-emotion';
import Flex from 'atoms/Flex';

const InitiativeSpinnerContainer = styled(Flex)({
  position: 'relative',
  '::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '2px',
    bottom: '0',
    left: '0',
    backgroundColor: '#000',
    visibility: 'hidden',
    transform: 'scaleX(0)',
    transition: 'all 0.3s ease-in-out 0s',
  },
  ':hover, :focus-within': {
    ':after': {
      visibility: 'visible',
      transform: 'scaleX(1)',
    },
  },
});

const StyledInput = styled(Input)({
  fontSize: 32,
  height: '1em',
  width: 54,
  textAlign: 'center',
  border: 'none',
  '::-webkit-inner-spin-button, ::-webkit-outer-spin-button': {
    appearance: 'none',
    margin: 0,
  },
});

interface PInitiativeSpinner {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => Promise<any>;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => Promise<any>;
}

class InitiativeSpinner extends PureComponent<PInitiativeSpinner> {
  cursor = this.props.value.toString.length;
  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.cursor = e.target.selectionStart;
    e.target.type = 'text';
    e.target.selectionStart = this.cursor;
    e.target.type = 'number';
    console.log(this.cursor, e.target.selectionStart);
    this.props.onChange(e);
  };
  onFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.type = 'text';
    e.target.selectionStart = this.cursor;
    e.target.type = 'number';
  };
  render() {
    const { value, onBlur } = this.props;
    return (
      <InitiativeSpinnerContainer display="inline-flex" height="fit-content">
        <StyledInput
          type="number"
          value={value}
          max={999}
          min={-999}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={onBlur}
        />
      </InitiativeSpinnerContainer>
    );
  }
}

export default InitiativeSpinner;
