// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer} from 'electron';


const electronHandler = {
  init: () => ipcRenderer.invoke('init'),
  reset: () => ipcRenderer.invoke('reset'),
  viewReadingRoom: (id: number) => ipcRenderer.invoke('readingRoom:view', id),
  deleteUser:()=>ipcRenderer.invoke('user:delete'),
  checkIn:(name:string,phone_number:string,seat_id:number)=>ipcRenderer.invoke('reservation:checkin',name,phone_number,seat_id),
  checkOut:(name:string,phone_number:string)=>ipcRenderer.invoke('reservation:checkout',name,phone_number),
  extend:(name:string,phone_number:string)=>ipcRenderer.invoke('reservation:extend',name,phone_number),
  askCheckout:(seat_id:number,name:string,phone_number:string)=>ipcRenderer.invoke('reservation:askCheckout',seat_id,name,phone_number),
  viewAllLog:()=>ipcRenderer.invoke('log:all'),
  viewConfig:()=>ipcRenderer.invoke('config:view'),
  updateConfig:(reservation_time:number,extend_time:number,ask_checkout_time:number)=>ipcRenderer.invoke('config:update',reservation_time,extend_time,ask_checkout_time),
  initConfig:()=>ipcRenderer.invoke('config:init'),
  checkingPassword:(password:string)=>ipcRenderer.invoke('check:password',password),
  requestAppClose: () => ipcRenderer.send('app:requestClose'),
  notifyCloseDenied: (callback: () => void) => ipcRenderer.on('app:closeDenied', callback),
  submitInquiry:(name:string,phone_number:string,title:string,content:string)=>ipcRenderer.invoke('inquiry:submit',name,phone_number,title,content),
  viewInquiry:()=>ipcRenderer.invoke('inquiry:view'),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
