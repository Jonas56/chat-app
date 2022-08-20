import React from "react";
import { MessageProps } from "./types";

export default function Message(props: MessageProps) {
  const { reply, message, user } = props;
  return reply ? (
    <div className="chat-message flex flex-col space-x-2 items-end justify-end">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-indigo-600 text-white ">
              {message}
            </span>
          </div>
        </div>
        <img
          src={user?.avatar}
          alt="My profile"
          className="w-6 h-6 rounded-full order-2"
        />
      </div>
      <div>
        <span className="text-xs text-gray-400 mr-8">viewed 10:30 pm</span>
      </div>
    </div>
  ) : (
    <div className="chat-message flex flex-col space-x-2">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div className="">
            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
              {message}
            </span>
          </div>
        </div>
        <img
          src={user?.avatar}
          alt="My profile"
          className="w-6 h-6 rounded-full order-1"
        />
      </div>
      <div>
        <span className="text-xs text-gray-400 ml-6">10:30 pm</span>
      </div>
    </div>
  );
}
