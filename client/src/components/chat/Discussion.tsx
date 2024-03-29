import React, { useState } from "react";
import moment from "moment";

export function DiscussionCard({ discussion }: { discussion: any }) {
  const [activeDiscussion, setActiveDiscussion] = useState<any>({});

  return (
    <div
      className="entry cursor-pointer transform hover:scale-95 duration-100 transition-transform bg-white mb-4 rounded-full p-4 flex shadow-md"
      onClick={() => {
        console.log(discussion);
        setActiveDiscussion(discussion);
      }}
    >
      <div className="flex-2">
        <div className="w-12 h-12 relative">
          <img
            className="w-12 h-12 rounded-full mx-auto"
            src={discussion.avatar}
            alt="chat-user"
          />
          <span className="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="truncate w-32">
          <span className="text-gray-800">{discussion.name}</span>
        </div>
        <div>
          <small className="text-gray-600">Hello, there</small>
        </div>
      </div>
      <div className="flex-2 text-right">
        <div>
          <small className="text-gray-500">
            {moment(new Date()).format("LT")}
          </small>
        </div>
        <div>
          <small className="text-xs bg-indigo-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
            12
          </small>
        </div>
      </div>
    </div>
  );
}
