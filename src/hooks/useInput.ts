import { useCallback, useState, ChangeEvent } from 'react';

function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return { value, setValue, onChange };
}

export default useInput;
