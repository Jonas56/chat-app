import React from "react";
import Message from "../components/chat/Message";
import ChatHeader from "../components/chat/Header";
import { User } from "../components/chat/types";
import MessageInput from "../components/chat/MessageInput";
import SideBar from "../components/chat/Sidebar";
import SideNav from "../components/chat/SideNav";

const message: string =
  "Hello there! I'm a chat bot. I'm here to help you chat with your friends. How can I help you?";

const user: User = {
  id: "1",
  name: "John Doe",
  avatar:
    "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgwOTkyMzYzODEwNzkyNTM2/gettyimages-666932578.jpg",
};

export function Chat() {
  return (
    <div className="flex bg-gray-100 h-screen space-x-4 ">
      <SideNav />
      <SideBar />
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col bg-gray-100">
        <div>
          <ChatHeader user={user} />
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto my-5 sm:my-10 mx-2
           scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            <Message message={message} user={user} />
            <Message message={message} user={user} reply={true} />
          </div>
        </div>
        <MessageInput />
      </div>
    </div>
  );
}
