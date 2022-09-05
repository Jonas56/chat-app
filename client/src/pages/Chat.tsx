import React, { useEffect, useState } from "react";
import { User } from "../components/chat/types";
import { SideBar, SideNav, ActiveDiscussion } from "../components/chat";
import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { useNavigate } from "react-router-dom";
import { socket } from "../app/api/socketService";

const message: string =
  "Hello there! I'm a chat bot. I'm here to help you chat with your friends. How can I help you?";

export function Chat() {
  const [discussions, setDiscussions] = useState<User[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [activeDiscussion, setActiveDiscussion] = useState<any>({});

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    socket.connect();

    socket.on("connect", () => {
      console.log("connected");
      setIsConnected(true);
    });
    socket.on("users", (discussions) => {
      setDiscussions(discussions);
      console.log(discussions);
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
      {/*  active converversation : @arg1: discussions available, @arg2: handle active discussion */}
      <SideBar discussions={discussions} />
      <>
        {/*  active converversation : @arg1: connectedUser, @arg2: list of messages (history) */}
        <ActiveDiscussion connectedUser={connectedUser} messages={message} />
      </>
    </div>
  );
}
