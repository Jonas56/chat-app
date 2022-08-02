import React from "react";
import { AiOutlineAudio, AiOutlineCamera } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";

export default function MessageInput() {
  return (
    <div className="border-t-2 border-gray-200 p-4 mb-2">
      <div className="relative flex rounded-full">
        <span className="absolute inset-y-0 flex items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <AiOutlineAudio className="h-6 w-6 text-gray-600" />
          </button>
        </span>
        <input
          type="text"
          placeholder="Write your message!"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <ImAttachment className="h-5 w-5 text-gray-600" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <AiOutlineCamera className="h-6 w-6 text-gray-600" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <BsEmojiSmile className="h-5 w-5 text-gray-700" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none"
          >
            <span className="font-bold">Send</span>
            <IoSend className="h-6 w-6 ml-2 transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
