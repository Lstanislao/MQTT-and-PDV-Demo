import { io, Socket } from 'socket.io-client';

interface ISocket extends Socket {
  userID?: string;
}

const socket: ISocket = io('http://localhost:3333', {
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
