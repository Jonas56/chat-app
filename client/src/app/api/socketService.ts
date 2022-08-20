import io from "socket.io-client";

const userApp = JSON.parse(localStorage.getItem("userChatApp")!);

export const socket = io("ws://localhost:5001", {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: false,
  extraHeaders: {
    Authorization: "Bearer: " + userApp?.accessToken,
  },
});

export function disconnect(): void {
  socket.disconnect();
}
