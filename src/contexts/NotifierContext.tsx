/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

/* eslint-disable default-param-last */
import React, { Dispatch, useReducer } from 'react';
import { INotifier, INotifierAction, INotifierActionKind } from '@/helpers/Notifier/types';

export const initialState: INotifier = {
  show: false,
  message: '',
  severity: 'success',
};

export const NotifierContext = React.createContext<[INotifier, Dispatch<INotifierAction>]>([
  initialState,
  (value: INotifierAction) => null,
]);

const reducer = (state = initialState, { type, payload }: INotifierAction) => {
  switch (type) {
    case INotifierActionKind.SHOW_NOTIFICATION:
      return {
        show: true,
        message: payload?.message,
        severity: payload?.severity,
      } as INotifier;
    case INotifierActionKind.HIDE_NOTIFICATION:
      return initialState;
    default:
      return initialState;
  }
};

export function NotifierProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <NotifierContext.Provider value={[state, dispatch]}>{children}</NotifierContext.Provider>;
}
