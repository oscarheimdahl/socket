import { connectHandler, rootHandler, publicHandler } from './handlers.ts';

Deno.serve({
  port: 8080,
  handler: (request) => {
    const route = new URL(request.url).pathname;

    if (route === '/connect') {
      return connectHandler(request);
    }

    if (route.startsWith('/public')) {
      return publicHandler(request);
    }

    if (route === '/') {
      return rootHandler(request);
    }

    return new Response(null, { status: 404 });
  },
});
