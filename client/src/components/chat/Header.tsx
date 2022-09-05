import React from "react";
import { User } from "./types";
import { IoCallOutline } from "react-icons/io5";
import { BsCameraVideo } from "react-icons/bs";

export function ChatHeader({ user }: { user: User | null }) {
  return (
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 bg-white px-4 rounded-full">
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <span className="absolute text-green-500 right-0 bottom-0">
            <svg width="20" height="20">
              <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
            </svg>
          </span>
          <img
            src={user?.avatar}
            alt=""
            className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            <span className="text-gray-700 mr-3">{user?.name}</span>
          </div>
          <span className="md:text-lg text-gray-600">Online</span>
        </div>
      </div>
      <div className="flex items-center space-x-5 sm:mr-2">
        <button className="rounded-full transition duration-500 ease-in-out hover:bg-gray-100 focus:outline-none ">
          <div className="p-2">
            <BsCameraVideo className="text-gray-900 text-2xl " />
          </div>
        </button>
        <button className="rounded-full transition duration-500 ease-in-out hover:bg-gray-100 focus:outline-none">
          <div className="p-2">
            <IoCallOutline className="text-gray-900 text-2xl" />
          </div>
        </button>
      </div>
    </div>
  );
}
