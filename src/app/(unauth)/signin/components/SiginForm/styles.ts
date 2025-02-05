'use client';

import { Box, styled } from '@mui/material';

const FormContainer = styled(Box)<Pick<HTMLFormElement, 'noValidate'>>({
  display: 'grid',
  width: '100%',
  rowGap: '28px',
});

export { FormContainer };
