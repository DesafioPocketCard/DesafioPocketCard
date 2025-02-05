'use client';

import { keyframes } from '@mui/material';

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
`;

export default fadeInOut;
