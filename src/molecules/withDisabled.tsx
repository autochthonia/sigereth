import { withStateHandlers, StateHandler } from 'recompose';

export interface WithDisabled {
  setDisabled: StateHandler<WithDisabledState>;
  disabled: boolean;
}
interface WithDisabledState {
  disabled: boolean;
}
interface WithDisabledProps {
  disabled?: boolean;
}

const withDisabled = withStateHandlers<
  WithDisabledState,
  {
    setDisabled(bool: boolean): Partial<WithDisabledState>;
  },
  WithDisabledProps
>(({ disabled = false }) => ({ disabled }), {
  setDisabled: (_state, _props) => (bool: boolean) => ({
    disabled: bool,
  }),
});

export default withDisabled;
