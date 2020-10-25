const Path = require('path');
const { app, BrowserWindow } = require('electron');
const fs = require('fs-extra');
const _ = require('./utils');
const config = require('../config');

_.try(main, error => {
  process.exitCode = 1;
  if (error instanceof _.Error) error.log(false);
  else console.error(error);
});

async function main() {
  await app.whenReady();
  await createWindow(config);
  app.on('window-all-closed', onWindowAllClosed);
  app.on('activate', onActivate)

  app.on('session-created', (session) => {
    console.log(session)
  })
}

async function createWindow({
  loadURL = null,
  loadFile = 'index.html',
  width = 800,
  height = 600,
  nodeIntegration = true,
  openDevTools = true,
} = {}) {
  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration
    }
  })

  const localIndex = Path.join(__dirname, 'index.html');
  // console.log(`localIndex:`, localIndex);

  if (loadURL || config.url) win.loadURL(loadURL || config.url);
  else if (await fs.pathExists(localIndex)) win.loadFile(localIndex);
  else win.loadFile(loadFile);
  // win.loadFile('index.html')
  if (openDevTools) win.webContents.openDevTools()
}

function onWindowAllClosed() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

function onActivate() {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
}
