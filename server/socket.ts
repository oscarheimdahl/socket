import { TOPICS } from '../topics.ts';
type Socket = {
  id: string;
  socket: WebSocket;
  name?: string;
  // Percent of screen
  mousePosition?: { x: number; y: number };
};

let sockets: Socket[] = [];

export function initSocket(socket: WebSocket, clientId: string) {
  const newSocket: Socket = { socket, id: clientId };
  attachListeners(newSocket);
}

export function attachListeners(thisSocket: Socket) {
  function broadcastUsers(includeSelf = false) {
    broadcastMessage(
      thisSocket,
      TOPICS.USER_JOIN,
      sockets.map((socket) => ({ name: socket.name, id: socket.id })),
      { includeSelf }
    );
  }
  function removeThisSocket() {
    sockets = sockets.filter((socket) => socket.id !== thisSocket.id);
  }

  thisSocket.socket.onopen = () => {};
  thisSocket.socket.onmessage = (event) => {
    const { topic, data } = JSON.parse(event.data);

    if (topic === TOPICS.USER_JOIN) {
      sockets.push(thisSocket);
      broadcastUsers(true);
    }
    if (topic === TOPICS.NEW_MESSAGE) {
      broadcastMessage(thisSocket, topic, {
        from: thisSocket.name,
        message: data,
        senderId: thisSocket.id,
      });
    }
    if (topic === TOPICS.UPDATE_NAME) {
      thisSocket.name = data;
      broadcastUsers(true);
    }
    if (topic === TOPICS.MOUSE_MOVE) {
      thisSocket.mousePosition = data;
      broadcastMessage(thisSocket, topic, {
        message: sockets
          .filter((socket) => socket.id === thisSocket.id)
          .map((socket) => ({
            userId: socket.id,
            position: socket.mousePosition,
          })),
      });
    }
    if (topic === TOPICS.MOUSE_CLICK) {
      broadcastMessage(thisSocket, topic, {
        message: thisSocket.id,
      });
    }
    if (topic === TOPICS.USER_TYPE) {
      broadcastMessage(thisSocket, topic);
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
