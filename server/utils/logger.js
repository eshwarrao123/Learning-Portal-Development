const isDev = process.env.NODE_ENV !== 'production';

const createLogger = (namespace) => ({
  info:  (msg) => { if (isDev) console.info(`[${namespace}] INFO: ${msg}`); },   // eslint-disable-line no-console
  warn:  (msg) => { if (isDev) console.warn(`[${namespace}] WARN: ${msg}`); },   // eslint-disable-line no-console
  error: (msg) => console.error(`[${namespace}] ERROR: ${msg}`),                 // eslint-disable-line no-console
});

export { createLogger };
export default createLogger('app');
