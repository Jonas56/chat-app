import { User } from '@prisma/client';

export class UserAuthenticated {
  user: User;
  accessToken: string;
  refreshToken: string;
}
