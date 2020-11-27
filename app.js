const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    maxHeight:300,
    maxWidth:300,
    minHeight:300,
    minWidth:300,
    frame:false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('interface/index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})