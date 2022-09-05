import { Injectable } from '@nestjs/common';
import { User, Conversation, Message } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async getConversationsForUser(user: User): Promise<User[]> {
    // return all conversations where user is part of
    const users = await this.prismaService.user.findMany({
      where: {
        NOT: {
          id: user.id,
        },
      },
      include: {
        conversations: {
          select: {
            conversation: {
              select: {
                id: true,
                messages: true,
              },
            },
          },
        },
      },
    });
    const connetedUsers = users.map((u) => {
      delete u.createdAt,
        delete u.updatedAt,
        delete u.password,
        delete u.email,
        delete u.hashRtoken;
      return u;
    });
    return connetedUsers;

    // const conversations = await this.prismaService.conversation.findMany({
    //   where: {
    //     users: {
    //       some: {
    //         id: user.id,
    //       },
    //     },
    //   },
    //   include: {
    //     users: true,
    //   },
    // });

    // conversations.forEach((c) => {
    //   c.users = c.users.filter((u) => u.id !== user.id);
    // });
  }

  async createConversation(userId: number, otherUserId: number) {
    return await this.prismaService.conversation.create({
      data: {
        users: {
          create: [
            {
              user: {
                connect: {
                  id: userId,
                },
              },
            },
            {
              user: {
                connect: {
                  id: otherUserId,
                },
              },
            },
          ],
        },
      },
    });
  }

  async sendMessage(conversationId: number, userId: number, message: string) {
    return this.prismaService.message.create({
      data: {
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        content: message,
      },
    });
  }

  async getConversation(userId: number) {
    const conversation = await this.prismaService.conversation.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
    if (conversation === null) {
      return await this.prismaService.conversation.create({
        data: {
          users: {
            create: [
              {
                user: {
                  connect: {
                    id: userId,
                  },
                },
              },
            ],
          },
        },
        include: {
          users: true,
          messages: true,
        },
      });
    }
    return conversation;
  }

  async getMessages(conversationId: string) {
    // return this.prismaService.chat.findOne({
    //   where: {
    //     id: conversationId,
    //   },
    // });
  }

  async getMessagesByUser(user: User) {
    // return this.prismaService.chat.findMany({
    //   where: {
    //     participants: {
    //       some: {
    //         id: user.id,
    //       },
    //     },
    //   },
    // });
  }
}
