const { BrowserWindow, app } = require("electron");
const { stderr, stdout } = require("process");
const exec = require("child_process").exec;
require("./src/server/main");

let mainWindow = null;

function main() {
  mainWindow = new BrowserWindow({
    title: "Asset Tracker",
    height: 600,
    width: 800,
  });
  setTimeout(() => {
    mainWindow.loadURL(`http://localhost:3000/`);
  }, 5000);
  mainWindow.on("close", (event) => {
    exec("npx kill-port 3000", (err, stdout, stderr) => {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
    });
    mainWindow = null;
  });
}

app.on("ready", main);
