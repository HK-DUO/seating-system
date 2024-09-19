// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },

  init: () => ipcRenderer.invoke('init'),
  viewReadingRoom:(id:number)=>ipcRenderer.invoke('readingRoom:view',id),
  deleteUser:()=>ipcRenderer.invoke('user:delete'),
  checkIn:(name:string,phone_number:string,seat_id:number)=>ipcRenderer.invoke('reservation:checkin',name,phone_number,seat_id),
  checkOut:(name:string,phone_number:string)=>ipcRenderer.invoke('reservation:checkout',name,phone_number),
  extend:(name:string,phone_number:string)=>ipcRenderer.invoke('reservation:extend',name,phone_number),
  askCheckout:(seat_id:number)=>ipcRenderer.invoke('reservation:askCheckout',seat_id),
  viewAllLog:()=>ipcRenderer.invoke('log:all')
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
