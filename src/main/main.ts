/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { ElectronHandler } from './preload';

import {
  init,
  askCheckOut,
  autoCheckOut,
  checkIn,
  checkOut,
  deleteAllUser,
  extend,
  viewReadingRoom,
  viewAllLog,
  viewConfig,
  updateConfig,
  reset,
  checkingPassword,
} from './data/controller/Data.controller';
import { ResponseEntity } from './data/class/Response.class';
import { LOG_DTO, READING_ROOM_DTO } from './data/type/Dto.type';
import { Config } from './data/type/Entity.type';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let canCloseApp = false;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 828,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('close', (event) => {
    // canCloseApp = true;
    // app.quit();
    if (!canCloseApp) {
      event.preventDefault(); // Prevent closing
      mainWindow?.webContents.send('app:closeDenied'); // Notify renderer process about the attempt to close
    }
  });

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

//자동 퇴실요청 원래 1분간으로 설정, 현재 10분
setInterval(() => {
  autoCheckOut();
}, 60 * 1000);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    ipcMain.handle('init', async () => {
      return init();
    });
    ipcMain.handle('reset', async () => {
      return reset();
    });
    ipcMain.handle('readingRoom:view', async (_, id: number) => {
      return viewReadingRoom(id) as ResponseEntity<READING_ROOM_DTO>;
    });
    ipcMain.handle('user:delete', async () => {
      return deleteAllUser() as ResponseEntity<boolean>;
    });
    ipcMain.handle(
      'reservation:checkin',
      async (_, name: string, phone_number: string, seat_id: number) => {
        return checkIn(name, phone_number, seat_id) as ResponseEntity<any>;
      },
    );
    ipcMain.handle(
      'reservation:checkout',
      async (_, name: string, phone_number: string) => {
        return checkOut(name, phone_number) as ResponseEntity<boolean>;
      },
    );
    ipcMain.handle(
      'reservation:extend',
      async (_, name: string, phone_number: string) => {
        return extend(name, phone_number) as ResponseEntity<boolean>;
      },
    );
    ipcMain.handle(
      'reservation:askCheckout',
      async (_, seat_id: number, name: string, phone_number: string) => {
        return askCheckOut(
          seat_id,
          name,
          phone_number,
        ) as ResponseEntity<boolean>;
      },
    );
    ipcMain.handle('log:all', async () => {
      return viewAllLog() as ResponseEntity<LOG_DTO[]>;
    });
    ipcMain.handle('check:password', async (_, password: string) => {
      return checkingPassword(password);
    });
    ipcMain.handle('config:view', async () => {
      return viewConfig() as ResponseEntity<Config>;
    });
    ipcMain.handle(
      'config:update',
      async (
        _,
        reservation_time: number,
        extend_time: number,
        ask_checkout_time: number,
      ) => {
        return updateConfig(reservation_time, extend_time, ask_checkout_time);
      },
    );
    ipcMain.on('app:requestClose', (event) => {
      canCloseApp = true;
      app.quit(); // Close the app
    });

    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
