"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Header } from "@/components/Layout";
import { IconButton, Typography } from "@mui/material";
import React from "react";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Buttons";
import {
  Container,
  HeaderContainer,
  Title,
  TitleContainer,
  MapBox,
} from "./styles";

interface IProps {
  params: {
    id: string;
  };
}

export default function GoalsCheckIn({ params }: IProps) {
  const router = useRouter();

  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <TitleContainer {...props}>
          <Header />
          <HeaderContainer>
            <IconButton onClick={() => router.back()}>
              <ArrowBackIos htmlColor="white" fontSize="small" />
            </IconButton>
            <Typography component="h1">Visitas ao Stand</Typography>
            <Typography>Meta: 200 visitas</Typography>
          </HeaderContainer>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <Container {...props}>
          <Title>
            <Typography component="h1">Fazer Check-in</Typography>
            <Typography component="p">
              Realize o checkin utilzando a localização em tempo real.
            </Typography>
          </Title>
          <MapBox />
          <Button onClick={() => router.push("/campains/check-in/success")}>
            Fazer Check-in
          </Button>
        </Container>
      )}
    />
  );
}
