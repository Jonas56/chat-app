import React, { useEffect, useState } from "react";
import Message from "../components/chat/Message";
import ChatHeader from "../components/chat/Header";
import { User } from "../components/chat/types";
import MessageInput from "../components/chat/MessageInput";
import SideBar from "../components/chat/Sidebar";
import SideNav from "../components/chat/SideNav";
import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { useNavigate } from "react-router-dom";
import { socket } from "../app/api/socketService";

const message: string =
  "Hello there! I'm a chat bot. I'm here to help you chat with your friends. How can I help you?";

export function Chat() {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    socket.connect();

    socket.on("connect", () => {
      console.log("connected");
      setIsConnected(true);
    });
    socket.on("users", (users) => {
      setUsers(users);
      console.log(users);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [user, navigate]);

  const connectedUser: User = user?.user;

  return (
    <div className="flex bg-gray-100 h-screen space-x-4 ">
      <SideNav />
      <SideBar discussions={users} />
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col bg-gray-100">
        <div>
          <ChatHeader user={connectedUser} />
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto my-5 sm:my-10 mx-2
           scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            <Message message={message} user={connectedUser} />
            <Message message={message} user={connectedUser} reply={true} />
          </div>
        </div>
        <MessageInput />
      </div>
    </div>
  );
}
