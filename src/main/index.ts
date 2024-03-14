import { app, shell, BrowserWindow, ipcMain, Notification } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs'
import { INIT_CONFIG_DATA } from '../constant/data'

const NOTIFICATION_TITLE = '打开失败'
const NOTIFICATION_BODY = '请检查路径是否准确'

function showNotification() {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

const userDataPath = app.getPath('userData')

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    // backgroundColor: '#ff0000', // 设置状态栏的背景色为红色
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      webSecurity: false
    }
    // titleBarStyle: 'hidden'
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    // IPC test
    ipcMain.on('ping', () => console.log('pong'))

    createWindow()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
  .then(showNotification)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
function openApp(app: string) {
  shell.openPath(app).catch(() => {
    showNotification()
  })
}
function writeFile(arg) {
  try {
    const filePath = path.join(userDataPath, 'config')
    fs.writeFileSync(filePath, arg, 'utf8')
    console.log('success')
  } catch (err) {
    console.error('error:', err)
  }
}
ipcMain.on('writeFile', (_, arg) => {
  writeFile(arg)
})

ipcMain.on('readFile', (event) => {
  try {
    const filePath = path.join(userDataPath, 'config')
    const data = fs.readFileSync(filePath, 'utf8')
    // event.returnValue(data)
    if (!data) writeFile(INIT_CONFIG_DATA)
    event.sender.send('checkPerlReply', data)
    console.log('success', userDataPath)
  } catch (err) {
    console.error('error:', err)
  }
})

ipcMain.on('openExternalApp', (_, arg) => {
  console.log(arg)

  openApp(arg)
})
