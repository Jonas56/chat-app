import { User } from "./user.type";

export interface Discussion {
  id: number;
  creator: User;
  message: string;
  updatedAt: Date;
  messagesNumber: number;
}
