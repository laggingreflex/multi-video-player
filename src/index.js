const Path = require('path');
const OS = require('os');
const { spawn } = require('child_process');
const webpack = require('webpack-simple-node-api');
const lodash = require('lodash');
const html = require('html-webpack-plugin');
const runElectron = require('./electron/run');

module.exports = main;

async function main(config) {
  if (config.build) {
    return build();
  } else {
    return dev();
  }
}

async function dev() {
  console.log('Running webpack-dev-server...');
  const frontend = Frontend({ mode: 'development' })
  const { server } = await frontend.devServer();
  return runElectron({
    args: [
      '--url', `http://localhost:${server.address().port}`,
    ]
  });
}

async function build() {
  // const mode = 'development'
  const mode = 'production'
  const frontend = Frontend({ mode });
  const electron = Electron({ mode });
  await Promise.all([
    frontend.build(),
    electron.build(),
  ]);
}

function Frontend(config) {
  return webpack([config, {
    entry: './src/frontend/index.js',
    output: {
      filename: 'app.js',
      devtoolModuleFilenameTemplate: _ => `file:///${_.absoluteResourcePath.replace(/\\/g, '/')}`,
    },
    module: {
      rules: [{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }],
    },
    plugins: [new html()]
  }]);
}

function Electron(config) {
  return webpack([config, {
    entry: './src/electron/index.js',
    output: {
      filename: 'index.js',
      devtoolModuleFilenameTemplate: _ => `file:///${_.absoluteResourcePath.replace(/\\/g, '/')}`,
    },
    target: 'node',
    node: {
      __filename: false,
      __dirname: false,
    },
    externals({ context, request }, callback) {
      if (request.startsWith('.')) {
        callback();
      } else {
        callback(null, 'commonjs ' + request)
      }
    },
  }]);
}



// const main = require('.');
// const _ = require('./common/utils');
// const config = require('./config');

// _.try(() => main(config), error => {
//   process.exitCode = 1;
//   if (error instanceof _.Error) error.log(false);
//   else console.error(error);
// });
