import React from 'react';
import { Button, styled } from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { theme } from '@/config';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { IDownloadButtonType } from './types';

export default function DownloadButton({
  url,
  fileName,
  children,
  target = '_blank',
  ...props
}: IDownloadButtonType) {
  const handleClick = () => {
    if (url) {
      const defaultName = format(new Date(), 'dd-MM-yyyy-hh-mm', {
        locale: ptBR,
      });
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || defaultName);
      link.target = target;
      link.click();
    }
  };

  const DownloadBtn = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    borderRadius: 5,
    border: `1px solid ${theme.palette.primary.main}`,
    transition: '.3s',
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.primary.light,
    },
    '&:hover svg': {
      fill: 'white',
    },
  }));

  return (
    <DownloadBtn
      fullWidth
      startIcon={
        <DownloadRoundedIcon
          sx={{
            fill: theme.palette.primary.main,
            width: 24,
            height: 24,
          }}
        />
      }
      onClick={handleClick}
      {...props}
    >
      {children}
    </DownloadBtn>
  );
}
