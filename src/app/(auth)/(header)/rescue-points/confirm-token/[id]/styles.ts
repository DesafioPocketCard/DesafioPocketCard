"use client";

import { Box, styled } from "@mui/material";

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

export const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-bottom: 2rem;
  padding-top: 1rem;

  h1 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #fff;
  }
`;


export const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;