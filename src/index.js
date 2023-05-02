const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
// import { moveWindow } from './script.js';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    minHeight : 150,
    minWidth : 300,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule:true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // moveWindow();
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  // mainWindow.webContents.on('did-finish-load', () => {
  //   mainWindow.webContents.executeJavaScript(`
  //     window.require = require;
  //   `);
  // });
};
ipcMain.handle("showWarning", async (event, options) => {
  return await dialog.showMessageBoxSync(null, options);
});
// nativeTheme.themeSource = 'light';
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
