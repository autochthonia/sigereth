// @ts-ignore
import { ChangeEvent, useState, useCallback } from 'react';

export const useInput = (
  initialValue: string = '',
): {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  set: (value: string) => void;
} => {
  let [value, setValue] = useState(initialValue);
  let onChange = useCallback(function(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }, []);

  return {
    value,
    onChange,
    set: setValue,
  };
};
