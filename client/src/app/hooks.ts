import { ChangeEvent, useState, useEffect, useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./redux/store";
import io, { ManagerOptions, Socket, SocketOptions } from "socket.io-client";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// useFormInputs hook
// This hook is used to add the form inputs to the form (e.g. name, email, etc.)

export const useFormInputs = (initialState = {}) => {
  const [inputs, setInputs] = useState(initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  return [inputs, handleInputChange];
};

export const useSocket = (
  url: string,
  options?: Partial<ManagerOptions & SocketOptions> | undefined
): Socket => {
  const { current: socket } = useRef(io(url, options));

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return socket;
};
