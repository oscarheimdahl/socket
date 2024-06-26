import { TOPICS } from '@root/topics';
import { setUserId } from '../store/store';

const DEV = import.meta.env.MODE === 'development';

const socketUrl = DEV
  ? 'ws://localhost:8080/connect'
  : 'wss://' + window.location.host + '/connect';
const clientId = crypto.randomUUID();
const socket = new WebSocket(socketUrl + '?id=' + clientId);
const onMessageCallbacks: { [topic: string]: ((data: any) => void)[] } = {};

socket.addEventListener('message', (event) => {
  const { topic, data } = JSON.parse(event.data);
  onMessageCallbacks[topic]?.forEach((callback) => {
    callback(data);
  });
});

socket.addEventListener('open', () => {
  send(TOPICS.USER_JOIN);
  setUserId(clientId);
});

export function send(topic: string, data?: any) {
  socket.send(JSON.stringify({ topic, data }));
}

export function onTopic(topic: string, callback: (data: any) => void) {
  const previousCallbacks = onMessageCallbacks[topic] || [];
  onMessageCallbacks[topic] = [...previousCallbacks, callback];
}
