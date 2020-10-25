const main = require('.')
const config = require('./config');
const _ = require('./common/utils');

module.exports = bin;

if (!module.parent) _.try(() => bin(config), error => {
  process.exitCode = 1;
  if (error instanceof _.Error) error.log(false);
  else console.error(error);
});

async function bin(config) {
  await main(config);
}
