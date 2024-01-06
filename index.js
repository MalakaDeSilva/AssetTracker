const { BrowserWindow, app } = require("electron");
require("./src/server/main");

let mainWindow = null;

function main() {
  mainWindow = new BrowserWindow();
  setTimeout(() => {
    mainWindow.loadURL(`http://localhost:3000/`);
  }, 5000);
  mainWindow.on("close", (event) => {
    mainWindow = null;
  });
}

app.on("ready", main);
