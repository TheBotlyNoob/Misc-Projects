const write = require('clipboardy').writeSync;
const spaceText = require('.');

const spacedText = spaceText(process.argv.slice(2).join(''));

console.log(spacedText);

write(spacedText);
