import { ChatHeader, MessageInput, Message } from "./";

export function ActiveDiscussion({ messages, connectedUser }: any) {
  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col bg-gray-100">
      <div>
        <ChatHeader user={connectedUser} />
        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto my-5 sm:my-10 mx-2
       scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          <Message message={messages} user={connectedUser} />
          <Message message={messages} user={connectedUser} reply={true} />
        </div>
      </div>
      <MessageInput />
    </div>
  );
}
