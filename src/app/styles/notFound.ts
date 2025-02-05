'use client';

import { Box, styled } from '@mui/material';

const NotFoundContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  maxHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  '& > h1': {
    ...theme.fonts['h3-title'],
    color: theme.palette.base[900],
    '& > span': {
      font: 'inherit',
      color: theme.palette.primary[400],
    },
  },
}));

export { NotFoundContainer };
