import { AlertColor } from '@mui/material';
import { useContext } from 'react';
import { NotifierContext } from '@/contexts/NotifierContext';
import { INotifierActionKind } from '@/helpers/Notifier/types';

function useNotifier() {
  const [, dispatch] = useContext(NotifierContext);
  const notify = (message: string, severity: AlertColor = 'success') => {
    dispatch({
      type: INotifierActionKind.SHOW_NOTIFICATION,
      payload: {
        message,
        severity,
      },
    });
  };

  return notify;
}

export default useNotifier;
