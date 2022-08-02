import { User } from "./";

export interface MessageProps {
  message: string;
  user: User;
  reply?: boolean;
}
