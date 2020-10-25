const { spawn } = require('child_process');
const _ = require('./utils');

module.exports = run

if (!module.parent) _.try(run, error => {
  process.exitCode = 1;
  if (error instanceof _.Error) error.log(false);
  else console.error(error);
});

function run({ args = [] } = {}) {
  const cp = spawn(require('electron'), [
    require.resolve('.'),
    ...args,
  ], { stdio: 'inherit' });
  return new Promise((resolve, reject) => cp.on('exit', code => {
    if (code) reject(`Process exited with error code: ${code}`);
    else resolve();
  }));
}
