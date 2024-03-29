import { TOPICS } from '../topics.ts';
type Socket = {
  id: string;
  socket: WebSocket;
  name?: string;
};

let sockets: Socket[] = [];

export function initSocket(socket: WebSocket) {
  const newSocket = { socket, id: crypto.randomUUID() };
  attachListeners(newSocket);
}

export function attachListeners(thisSocket: Socket) {
  function broadcastUsers(includeSelf = false) {
    broadcastMessage(
      thisSocket,
      TOPICS.USER_JOIN,
      sockets.map((socket) => socket.name),
      { includeSelf }
    );
  }
  function removeThisSocket() {
    sockets = sockets.filter((socket) => socket.id !== thisSocket.id);
  }

  thisSocket.socket.onopen = () => {
    sockets.push(thisSocket);
    broadcastUsers(true);
  };
  thisSocket.socket.onmessage = (event) => {
    const { topic, data } = JSON.parse(event.data);

    if (topic === TOPICS.NEW_MESSAGE) {
      broadcastMessage(thisSocket, topic, data);
    }
    if (topic === TOPICS.UPDATE_NAME) {
      thisSocket.name = data;
      broadcastUsers(true);
    }
  };
  thisSocket.socket.onclose = () => {
    removeThisSocket();
    broadcastUsers();
  };
  thisSocket.socket.onerror = () => {
    removeThisSocket();
    broadcastUsers();
  };
}

function broadcastMessage(
  thisSocket: Socket,
  topic: string,
  data?: any,
  options?: { includeSelf: boolean }
) {
  sockets.forEach((otherSocket) => {
    if (!options?.includeSelf && otherSocket.id === thisSocket.id) return;
    sendMessage(otherSocket.socket, topic, data);
  });
}

function sendMessage(socket: WebSocket, topic: string, data?: any) {
  if (socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify({ topic, data }));
}
