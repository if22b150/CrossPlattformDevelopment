import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import * as path from 'node:path';
import * as remoteMain from '@electron/remote/main/index.js';


// Initialize remote module
remoteMain.initialize();

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true, // Allows remote module usage in renderer process
        },
    });

    // Attach the main window to the remote module
    remoteMain.enable(mainWindow.webContents);

    // Load local file or localhost server if in development mode
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:8100'
            : `file://${path.join(__dirname, 'build/index.html')}`
    );

    mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
