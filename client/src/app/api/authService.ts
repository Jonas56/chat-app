import axios from "axios";
import { CreateUserRequest, LoginUserRequest } from "./types";

const BASE_URL = "/api/auth/local";

export const httpLoginUser = async (credentials: LoginUserRequest) => {
  const response = await axios.post(BASE_URL + "/signin", credentials);
  if (response.status === 200) {
    localStorage.setItem("userChatApp", JSON.stringify(response.data));
  }
  return response.data;
};

export const httpRegisterUser = async (
  credentials: CreateUserRequest
): Promise<JSON> => {
  credentials.avatar = `https://avatars.dicebear.com/api/identicon/${credentials.username}.svg`;
  const response = await axios.post(BASE_URL + "/signup", credentials);
  if (response.status === 201) {
    localStorage.setItem("userChatApp", JSON.stringify(response.data));
  }
  return response.data;
};
