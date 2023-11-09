import { io } from "socket.io-client";
//
// const SocketEvents = {
//   MESSAGE: "message",
//
// }

export const socket = io("http://localhost:4000");
// console.log(socket.id)