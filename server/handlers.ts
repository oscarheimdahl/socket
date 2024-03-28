import { initSocket } from './socket.ts';
import { msg, typeToMime } from './helpers.ts';

export function connectHandler(request: Request) {
  if (request.headers.get('upgrade') !== 'websocket') {
    return new Response(msg('Endpoint for websockets only'), { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(request);

  initSocket(socket);

  return response;
}

export async function publicHandler(request: Request) {
  const url = new URL(request.url);
  const filePath = url.pathname.substring(1);
  const fileType = filePath.split('.').at(-1)!;
  try {
    const file = await Deno.open('server/' + filePath, { read: true });
    return new Response(file.readable, {
      headers: { 'content-type': typeToMime(fileType) },
    });
  } catch (_e) {
    console.log('404, No such file');
  }
  return new Response(msg('No such file'), { status: 404 });
}

export async function rootHandler(_request: Request) {
  const file = await Deno.open('public/index.html', { read: true });
  return new Response(file.readable);
}
