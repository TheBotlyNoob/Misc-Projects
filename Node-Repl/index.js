#!/usr/bin/env node
const repl = require('pretty-repl');

// Start the repl
const r = repl.start({
  prompt: require('chalk').blue('→  '),
  replMode: repl.REPL_MODE_SLOPPY,
  ignoreUndefined: true
});

// Set __dirname to the current working directory
r.context.__dirname = process.cwd();