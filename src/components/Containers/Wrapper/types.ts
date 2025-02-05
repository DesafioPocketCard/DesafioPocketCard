import { BoxProps } from '@mui/material';
import { ReactNode } from 'react';

interface IWrapper extends BoxProps {
  title?: string;
  children?: ReactNode;
  asideItems?: ReactNode;
}

export type { IWrapper };
