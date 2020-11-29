const {
    app,
    BrowserWindow
} = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 300,
        height: 150,
        maxHeight: 150,
        maxWidth: 300,
        minHeight: 150,
        minWidth: 300,
        frame: false,
        transparent: true,
        icon: "Renderer/images/icon.png",
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('Renderer/index.html')
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