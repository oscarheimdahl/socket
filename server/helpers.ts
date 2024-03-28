export function msg(msg: string) {
  return JSON.stringify({ message: msg });
}

export function typeToMime(type: string) {
  switch (type) {
    case 'html':
      return 'text/html';
    case 'js':
      return 'text/javascript';
    case 'css':
      return 'text/css';
    case 'png':
      return 'image/png';
    case 'jpg':
      return 'image/jpeg';
    case 'jpeg':
      return 'image/jpeg';
    case 'svg':
      return 'image/svg+xml';
    case 'ico':
      return 'image/x-icon';
    default:
      return 'text/plain';
  }
}
