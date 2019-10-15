global.console = {
  log: console.log,
  error: console.error,
  warn: jest.fn(), // ignore console.warn in tests
  info: console.info,
  debug: console.debug,
};
