import { TOPICS } from '../topics.ts';
type Socket = {
  id: string;
  socket: WebSocket;
};

let sockets: Socket[] = [];

export function initSocket(socket: WebSocket) {
  const newSocket = { socket, id: crypto.randomUUID() };
  attachListeners(newSocket);
}

export function attachListeners(newSocket: Socket) {
  newSocket.socket.onopen = () => {
    console.log(newSocket.id);
    sockets.push(newSocket);
  };
  newSocket.socket.onmessage = (event) => {
    const { topic, data } = JSON.parse(event.data);
    console.log(topic, data);

    if (topic === TOPICS.NEW_MESSAGE) {
      handleNewMessage(newSocket, data);
    }
  };
  newSocket.socket.onclose = () => {
    sockets = sockets.filter((otherSocket) => otherSocket.id !== newSocket.id);
    sockets.forEach((s) => {
      if (s.socket.readyState === WebSocket.OPEN) s.socket.send('2');
    });
    console.log('DISCONNECTED');
  };
  newSocket.socket.onerror = () => {
    sockets = sockets.filter((s) => s.id !== newSocket.id);
    console.log('ERROR');
  };
}

function handleNewMessage(thisSocket: Socket, data: any) {
  sockets.forEach((otherSocket) => {
    if (otherSocket.id === thisSocket.id) return;
    otherSocket.socket.send(
      JSON.stringify({ topic: TOPICS.NEW_MESSAGE, data })
    );
  });
}
