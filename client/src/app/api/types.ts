export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  name: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
}
