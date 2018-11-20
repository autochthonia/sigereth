import { ChangeEvent, useState, useCallback } from 'react';

export const useInput = (
  // initialValue: string = '',
): {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  set: (value: string) => void;
} => {
  const [value, setValue] = useState('');
  const onChange = useCallback(function(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }, []);

  return {
    value,
    onChange,
    set: setValue,
  };
};
