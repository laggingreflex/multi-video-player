const yargs = require('yargs-parser');

const { _: positional, $0, ...config } = yargs(process.argv.slice(2))

if (positional[0] === 'build') config.build = true;
else config.dev = true;

module.exports = config;
