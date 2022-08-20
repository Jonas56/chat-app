import DiscussionComponent from "./Discussion";
import { Discussion } from "./types";

// const discusions: Discussion[] = [
//   {
//     id: 1,
//     updatedAt: new Date(),
//     creator: {
//       id: "1",
//       name: "John Doe",
//       avatar:
//         "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgwOTkyMzYzODEwNzkyNTM2/gettyimages-666932578.jpg  ",
//     },
//     message: "Hello there! I'm a chat bot",
//     messagesNumber: 23,
//   },
//   {
//     id: 2,
//     updatedAt: new Date(),
//     creator: {
//       id: "1",
//       name: "John Doe",
//       avatar:
//         "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgwOTkyMzYzODEwNzkyNTM2/gettyimages-666932578.jpg  ",
//     },
//     message: "Hello there! I'm a chat bot",
//     messagesNumber: 23,
//   },
//   {
//     id: 3,
//     updatedAt: new Date(),
//     creator: {
//       id: "1",
//       name: "John Doe",
//       avatar:
//         "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgwOTkyMzYzODEwNzkyNTM2/gettyimages-666932578.jpg  ",
//     },
//     message: "Hello there! I'm a chat bot",
//     messagesNumber: 23,
//   },
// ];

export default function SideBar({ discussions }: any) {
  return (
    <div className="sidebar hidden lg:flex w-1/3 flex-2 flex-col p:2 sm:p-6">
      <div className="hidden lg:block heading flex-2">
        <h1 className="text-3xl text-gray-700 mb-4 font-bold">Messages</h1>
      </div>
      <div className="search flex-2 pb-6 px-2">
        <input
          type="text"
          className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200"
          placeholder="Search"
        />
      </div>
      <div className="flex-1 h-full overflow-auto px-2">
        {discussions.map((discussion: any) => (
          <DiscussionComponent key={discussion.id} discussion={discussion} />
        ))}
      </div>
    </div>
  );
}
