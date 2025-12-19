"use client";

import React from "react";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Header } from "@/components/Layout";
import { IconButton, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Container, HeaderContainer } from "./styles";
import ConfirmResgateForm from "./ConfirmResgateForm";

interface IProps {
  params: {
    id: string; // ID do resgate vindo da URL
  };
}

export default function ConfirmTokenPage({ params }: IProps) {
  const router = useRouter();

  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <Container {...props}>
          {/* Header Global */}
          <Header /> 
          
          {/* Sub-header com botão voltar */}
          <HeaderContainer>
            <IconButton onClick={() => router.back()}>
              <ArrowBackIos htmlColor="white" fontSize="small" />
            </IconButton>
            <Typography component="h1">Confirmar Resgate</Typography>
          </HeaderContainer>
        </Container>
      )}
      BodyComponent={(props) => (
        <Container {...props} sx={{ justifyContent: 'center' }}> 
        
          <ConfirmResgateForm idResgate={Number(params.id)} />
        </Container>
      )}
    />
  );
}