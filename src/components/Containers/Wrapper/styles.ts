'use client';

import { Box, styled } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
  display: 'grid',
  grid: 'auto auto 1fr / 1fr auto',
  alignItems: 'center',
  rowGap: '80px',
  height: '100%',
  paddingTop: '60px',
  '& .header': {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    '& .title-container': {
      display: 'flex',
      justifyContent: 'space-between',
      '& > h1': {
        ...theme.fonts['primary-xl'],
        color: theme.palette.base.A200,
        [theme.breakpoints.down('sm')]: {
          ...theme.fonts['primary-lg'],
        },
      },
      '& .aside-items': {
        display: 'flex',
        gap: '8px',
      },
    },
  },
  '& .span-all': {
    gridColumn: '1/-1',
  },
  '& .divider': {
    marginBottom: '10px',
  },
  '& > div': {
    height: '100%',
  },
}));

export { Container };
