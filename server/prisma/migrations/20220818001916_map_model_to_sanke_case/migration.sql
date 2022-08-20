/*
  Warnings:

  - You are about to drop the `UserConversations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserConversations" DROP CONSTRAINT "UserConversations_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "UserConversations" DROP CONSTRAINT "UserConversations_userId_fkey";

-- DropTable
DROP TABLE "UserConversations";

-- CreateTable
CREATE TABLE "user_conversations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_conversations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_conversations" ADD CONSTRAINT "user_conversations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_conversations" ADD CONSTRAINT "user_conversations_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
