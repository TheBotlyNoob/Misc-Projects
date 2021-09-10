require('keylogger.js').start((key, isKeyUp) =>
  isKeyUp ? '' : console.log(key)
);
