import React from 'react';
import { DialogContext } from '../hooks/useDialog';
import {
  Alert,
  InPrompt,
  OutPrompt,
  Confirm,
  Prompt,
  UserPrompt,
} from '@/components/index';
import Overlay from './Overlay';
import { UserInfoType } from '@/types/InfoType';

type AlertState = {
  type: 'alert';
  message: string;
  subMessage: string;
  onClickOk: () => void;
};

type ConfirmState = {
  type: 'confirm';
  message: string;
  subMessage: string;
  onClickOk: () => void;
  onClickCancel: () => void;
};

type PromptState = {
  type: 'prompt';
  message: string;
  subMessage: string;
  onClickOk: (input: string) => void;
  onClickCancel: () => void;
};

type UserPromptState = {
  type: 'userPrompt';
  message: string;
  subMessage: string;
  onClickOk: (input: object) => void;
  onClickCancel: () => void;
};

type InPromptState = {
  type: 'inPrompt';
  onClickOk: (input: UserInfoType) => void;
  onClickCancel: () => void;
  roomNum: string;
  seatNum: string;
};

type OutPromptState = {
  type: 'outPrompt';
  onClickOk: (input: UserInfoType) => void;
  onClickCancel: () => void;
  roomNum: string;
  seatNum: string;
};

type PropsType = {
  children: React.ReactNode;
};

function DialogProvider({ children }: PropsType) {
  const [state, setState] = React.useState<
    | AlertState
    | ConfirmState
    | PromptState
    | UserPromptState
    | InPromptState
    | OutPromptState
  >();

  const alert = (message?: string, subMessage?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        type: 'alert',
        message: message ?? '',
        subMessage: subMessage ?? '',
        onClickOk: () => {
          setState(undefined);
          resolve(true);
        },
      });
    });
  };

  const confirm = (message?: string, subMessage?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        type: 'confirm',
        message: message ?? '',
        subMessage: subMessage ?? '',
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

  const prompt = (
    message?: string,
    subMessage?: string,
  ): Promise<string | undefined> => {
    return new Promise((resolve) => {
      setState({
        type: 'prompt',
        message: message ?? '',
        subMessage: subMessage ?? '',
        onClickOk: (input: string) => {
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

  const userPrompt = (
    message?: string,
    subMessage?: string,
  ): Promise<object | undefined> => {
    return new Promise((resolve) => {
      setState({
        type: 'userPrompt',
        message: message ?? '',
        subMessage: subMessage ?? '',
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

  const inPrompt = (
    roomNum?: string,
    seatNum?: string,
  ): Promise<UserInfoType | undefined> => {
    return new Promise((resolve) => {
      setState({
        type: 'inPrompt',
        roomNum: roomNum ?? '',
        seatNum: seatNum ?? '',
        onClickOk: (input: UserInfoType) => {
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

  const outPrompt = (
    roomNum?: string,
    seatNum?: string,
  ): Promise<UserInfoType | undefined> => {
    return new Promise((resolve) => {
      setState({
        type: 'outPrompt',
        roomNum: roomNum ?? '',
        seatNum: seatNum ?? '',
        onClickOk: (input: UserInfoType) => {
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

  return (
    <DialogContext.Provider
      value={{ alert, confirm, prompt, userPrompt, inPrompt, outPrompt }}
    >
      {children}
      {state && (
        <Overlay>
          {state.type == 'alert' && (
            <Alert
              message={state.message}
              subMessage={state.subMessage}
              onClickOk={state.onClickOk}
            />
          )}
          {state.type == 'confirm' && (
            <Confirm
              message={state.message}
              subMessage={state.subMessage}
              onClickOk={state.onClickOk}
              onClickCancel={state.onClickCancel}
            />
          )}
          {state.type == 'prompt' && (
            <Prompt
              message={state.message}
              subMessage={state.subMessage}
              onClickOk={state.onClickOk}
              onClickCancel={state.onClickCancel}
            />
          )}
          {state.type == 'userPrompt' && (
            <UserPrompt
              message={state.message}
              subMessage={state.subMessage}
              onClickOk={state.onClickOk}
              onClickCancel={state.onClickCancel}
            />
          )}
          {state.type == 'inPrompt' && (
            <InPrompt
              roomNum={state.roomNum}
              seatNum={state.seatNum}
              onClickOk={state.onClickOk}
              onClickCancel={state.onClickCancel}
            />
          )}
          {state.type == 'outPrompt' && (
            <OutPrompt
              roomNum={state.roomNum}
              seatNum={state.seatNum}
              onClickOk={state.onClickOk}
              onClickCancel={state.onClickCancel}
            />
          )}
        </Overlay>
      )}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
