import { ChangeEvent, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./redux/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// useFormInputs hook
// This hook is used to add the form inputs to the form (e.g. name, email, etc.)

const useFormInputs = (initialState = {}) => {
  const [inputs, setInputs] = useState(initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  return [inputs, handleInputChange];
};

export default useFormInputs;
