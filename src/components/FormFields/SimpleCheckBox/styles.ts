import { Box, BoxProps, Checkbox, styled } from '@mui/material';

export const MUICheckBox = styled(Checkbox)(() => ({
  color: 'primary.main',
  '&.Mui-checked': { color: 'primary.main' },
}));

export const CheckBoxContainer = styled(Box)<BoxProps & { orientation: 'row' | 'column' }>(
  ({ theme, orientation }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    '& .checkbox-box': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: orientation,
      gap: theme.spacing(1),
      '& > label': {
        ...theme.fonts['pf-body'],
        color: theme.palette.secondary[500],
      },
    },
  }),
);


export const CheckboxUnhecked = styled(Box)(({ theme }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '4px',
  border: `1px solid ${theme.palette.primary.main}`,
}));

export const CheckboxChecked = styled(Box)(({ theme }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '4px',
  border: `1px solid ${theme.palette.primary.main}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  "& > div": {
    width: '16px',
    height: '16px',
    borderRadius: '2px',
    backgroundColor: theme.palette.primary.main,
    margin: '2px',
  }
}));