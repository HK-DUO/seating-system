import React from "react";
import { UserInfoType } from "../types/InfoType";


type Type = {
  alert: (message?: string, subMessage?: string) => Promise<boolean>
  prompt:(message?:string, subMessage?: string) => Promise<string | undefined>
  userPrompt: (message?: string, subMessage?: string) => Promise<object | undefined>
  inPrompt: (roomNum?:string, seatNum?:string) => Promise<UserInfoType | undefined>
  outPrompt: (roomNum?:string, seatNum?:string) => Promise<UserInfoType | undefined>
};

const DialogContext = React.createContext<Type>({
  alert: () => new Promise((_, reject) => reject()),
  prompt:() => new Promise((_, reject) => reject()),
  userPrompt: () => new Promise((_, reject) => reject()),
  inPrompt: () => new Promise((_, reject) => reject()),
  outPrompt: () => new Promise((_, reject) => reject()),
});


function useDialog(){
  const context = React.useContext<Type>(DialogContext);
  if(context == undefined){
    console.log("useDialog must be used inside a DialogProvider")
  }
  return context;
}

export {useDialog, DialogContext};
