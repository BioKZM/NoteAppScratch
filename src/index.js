const { app, BrowserWindow } = require('electron');
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
    // titleBarOverlay : {
    //   color : "#cc0000",
    //   symbolColor: "#000000",
    //   height : 30,
    // },
    // titleBarStyle : 'hidden',
    height: 600,
    // frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // moveWindow();
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// function moveWindow() {
//   const currentWindow = remote.getCurrentWindow();
//   currentWindow.setResizable(true);
//   currentWindow.setMovable(true);

//   let initialPosition = currentWindow.getPosition();
//   let offsetX, offsetY;

//   document.getElementById("titleBar").addEventListener("mousedown", function(e) {
//     offsetX = e.screenX - initialPosition[0];
//     offsetY = e.screenY - initialPosition[1];
//     document.addEventListener("mousemove", dragWindow, true);
//   });

//   document.addEventListener("mouseup", function() {
//     document.removeEventListener("mousemove", dragWindow, true);
//     currentWindow.setPosition(initialPosition[0], initialPosition[1]);
//     currentWindow.setResizable(false);
//     currentWindow.setMovable(false);
//   });

//   function dragWindow(e) {
//     let x = e.screenX - offsetX;
//     let y = e.screenY - offsetY;
//     currentWindow.setPosition(x, y);
//     initialPosition = [x, y];
//   }
// }
