import React from "react";
import {DialogContext} from "../hooks/useDialog";
import Overlay from "./Overlay";
import Alert from "../components/Alert";
import Prompt from "../components/Prompt";
import InPrompt from "../components/InPrompt";
import OutPrompt from "../components/OutPrompt";

type AlertState = {
  type: "alert",
  message: string;
  subMessage: string,
  onClickOk: () => void
};

type PromptState = {
  type: "prompt",
  message: string;
  subMessage: string,
  onClickOk: (input: object) => void,
  onClickCancel: () => void
};

type InPromptState = {
  type:"inPrompt",
  onClickOk: (input:object) => void,
  onClickCancel: () => void
  roomNum:string;
  seatNum:string;
}

type OutPromptState = {
  type:"outPrompt",
  onClickOk: () => void,
  onClickCancel: () => void
  roomNum:string;
  seatNum:string;
}

type PropsType = {
  children: React.ReactNode;
};

function DialogProvider({children}: PropsType) {
  const [state, setState] = React.useState<AlertState | PromptState | InPromptState | OutPromptState>();

  const alert = (message?: string, subMessage?:string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        type: "alert",
        message: message ?? '',
        subMessage: subMessage ?? "",
        onClickOk: () => {
          setState(undefined);
          resolve(true);
        },
      });
    });
  };

  const prompt = (message?: string, subMessage?:string): Promise<object | undefined> => {
    return new Promise((resolve) => {
      setState({
        type: "prompt",
        message: message ?? '',
        subMessage: subMessage ?? "",
        onClickOk: (input: object) => {
          setState(undefined);
          resolve(input);
        },
        onClickCancel: () => {
          setState(undefined);
          resolve(undefined);
        },
      });
    });
  }

  const inPrompt = (roomNum?: string, seatNum?: string): Promise<object | undefined> => {
    return new Promise((resolve) => {
      setState({
        type: "inPrompt",
        roomNum: roomNum ?? "",
        seatNum: seatNum ?? "",
        onClickOk: (input: object) => {
          setState(undefined);
          resolve(input);
        },
        onClickCancel: () => {
          setState(undefined);
          resolve(undefined);
        },
      });
    });
  };

  const outPrompt = (roomNum?: string, seatNum?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        type: "outPrompt",
        roomNum: roomNum ?? "",
        seatNum: seatNum ?? "",
        onClickOk: () => {
          setState(undefined);
          resolve(true);
        },
        onClickCancel: () => {
          setState(undefined);
          resolve(false);
        },
      });
    });
  };

  return <DialogContext.Provider value={{alert, prompt, inPrompt, outPrompt}}>
    {children}
    {state && <Overlay>
      {state.type == "alert" &&
          <Alert message={state.message} subMessage={state.subMessage} onClickOk={state.onClickOk}/>}
      {state.type == "prompt" &&
          <Prompt message={state.message} subMessage={state.subMessage} onClickOk={state.onClickOk}
                  onClickCancel={state.onClickCancel}/>}
      {state.type == "inPrompt" &&
          <InPrompt roomNum={state.roomNum} seatNum={state.seatNum} onClickOk={state.onClickOk}
                    onClickCancel={state.onClickCancel}/>}
      {state.type == "outPrompt" &&
          <OutPrompt roomNum={state.roomNum} seatNum={state.seatNum} onClickOk={state.onClickOk}
                     onClickCancel={state.onClickCancel}/>}
    </Overlay>}
  </DialogContext.Provider>;
}

export default DialogProvider;
