let sockets: WebSocket[] = [];

export function initSocket(socket: WebSocket) {
  socket.onopen = () => {
    sockets.push(socket);
    console.log('Num connected: ', sockets.length);
  };
  socket.onmessage = (event) => {
    console.log(`RECEIVED: ${event.data}`);

    sockets.forEach((s) => {
      if (s === socket) return;
      console.log('sending');
      s.send(event.data);
    });
  };
  socket.onclose = () => {
    sockets = sockets.filter((s) => s !== socket);
    sockets.forEach((s) => {
      s.send('2');
    });
    console.log('DISCONNECTED');
  };
  socket.onerror = () => {
    sockets = sockets.filter((s) => s !== socket);
    console.log('ERROR');
  };
}
