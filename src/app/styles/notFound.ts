'use client';

import { Box, styled } from '@mui/material';

const NotFoundContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  maxHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  '& > h1': {
    ...theme.fonts['primary-xl'],
    color: theme.palette.base[900],
    '& > span': {
      font: 'inherit',
      color: theme.palette.primary[400],
    },
  },
}));

export { NotFoundContainer };
