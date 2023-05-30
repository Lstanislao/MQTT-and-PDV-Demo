export const ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8085/vpos'
    : 'http://localhost:8085/vpos';
// http://localhost:8085/vpos
