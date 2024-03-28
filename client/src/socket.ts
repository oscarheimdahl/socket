// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080/connect');

// Connection opened
socket.addEventListener('open', (event) => {
  socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', (event) => {
  console.log('Message from server ', event.data);
});

setTimeout(() => {
  socket.send('Hello Server!');
}, 2000);

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(1, 2));
