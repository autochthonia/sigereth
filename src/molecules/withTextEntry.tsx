import { withStateHandlers } from 'recompose';
import { FormEvent, ChangeEvent } from 'react';

export interface WithTextEntry {
  onChange: (
    e: ChangeEvent<HTMLInputElement> | { target: { value: string } },
  ) => Partial<WithTextEntryState>;
  value: string;
}
interface WithTextEntryState {
  value: string;
}
interface WithTextEntryProps {
  value?: string;
}

const withTextEntry = withStateHandlers<
  WithTextEntryState,
  {
    onChange(e: FormEvent<HTMLInputElement>): Partial<WithTextEntryState>;
  },
  WithTextEntryProps
>(({ value = '' }) => ({ value }), {
  onChange: (_state, _props) => (e: ChangeEvent<HTMLInputElement>) => ({
    value: e.target.value,
  }),
});

export default withTextEntry;
