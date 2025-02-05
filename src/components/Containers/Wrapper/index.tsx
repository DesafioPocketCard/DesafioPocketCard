import React from 'react';
import { Box, Typography } from '@mui/material';
import { IWrapper } from './types';
import { Container } from './styles';
import BreadcrumbsNavigation from './BreadCrumbNavigation';

function BoxContainer({ title, asideItems, children, ...props }: IWrapper) {
  return (
    <Container>
      <Box className="header">
        <BreadcrumbsNavigation />
        <Box className="title-container">
          <Typography component="h1">{title}</Typography>
          <Box className="aside-items">{asideItems}</Box>
        </Box>
      </Box>
      <Box className="span-all" {...props}>
        {children}
      </Box>
    </Container>
  );
}

export default BoxContainer;
