import { User } from "./";

export interface MessageProps {
  message: string | null;
  user: User | null;
  reply?: boolean;
}
