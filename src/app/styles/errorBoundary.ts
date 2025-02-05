'use client';

import { Box, styled } from '@mui/material';

const ErrorBoundaryContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  height: '100vh',
  maxHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  '& > div ': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& > h1': {
      ...theme.fonts['primary-xl'],
      color: theme.palette.base[900],
    },
    '& > svg ': {
      width: '52px',
      height: '52px',
    },
  },
  '& > p': {
    ...theme.fonts['primary-md'],
    color: theme.palette.base[600],
    marginBottom: '12px',
  },
}));

export { ErrorBoundaryContainer };
