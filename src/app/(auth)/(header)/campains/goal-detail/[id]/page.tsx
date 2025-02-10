"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Header } from "@/components/Layout";
import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import { MainCard, ProgressBar, Title, TitleContainer } from "./styles";
import { Container, HeaderContainer } from "./styles";
import { ArrowBackIos, LocationOnOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { GridContainer } from "../../goals/[id]/styles";
import { GridCard } from "@/components/Cards";
import { Button } from "@/components/Buttons";
import Image from "next/image";
import handshake from "@/assets/images/handshake.png";
import support from "@/assets/images/support.png";
import officeWorker from "@/assets/images/office-worker.png";
import booth from "@/assets/images/booth.png";

interface IProps {
  params: {
    id: string;
  };
}

export default function GoalsDetail({ params }: IProps) {
  const router = useRouter();
  const theme = useTheme();

  const goals = [
    {
      id: 1,
      title: "Vendas fechadas",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: (
        <Image alt="handshake" src={handshake.src} width={40} height={40} />
      ),
      percentage: 72,
    },
    {
      id: 2,
      title: "Ligações clientes",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: <Image alt="handshake" src={support.src} width={40} height={40} />,
      percentage: 27,
    },
    {
      id: 3,
      title: "Visitas escritório",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: (
        <Image alt="handshake" src={officeWorker.src} width={40} height={40} />
      ),
      percentage: 27,
    },
    {
      id: 1,
      title: "Vendas fechadas",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: (
        <Image alt="handshake" src={handshake.src} width={40} height={40} />
      ),
      percentage: 72,
    },
    {
      id: 3,
      title: "Visitas stand",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: <Image alt="handshake" src={booth.src} width={40} height={40} />,
      percentage: 27,
    },
    {
      id: 2,
      title: "Ligações clientes",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: <Image alt="handshake" src={support.src} width={40} height={40} />,
      percentage: 27,
    },
    {
      id: 3,
      title: "Visitas stand",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: <Image alt="handshake" src={booth.src} width={40} height={40} />,
      percentage: 27,
    },
    {
      id: 3,
      title: "Visitas escritório",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: (
        <Image alt="handshake" src={officeWorker.src} width={40} height={40} />
      ),
      disabled: true,
      percentage: 27,
    },
    {
      id: 1,
      title: "Vendas fechadas",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: (
        <Image alt="handshake" src={handshake.src} width={40} height={40} />
      ),
      percentage: 72,
    },
    {
      id: 2,
      title: "Ligações clientes",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: <Image alt="handshake" src={support.src} width={40} height={40} />,
      percentage: 27,
    },
    {
      id: 3,
      title: "Visitas escritório",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: (
        <Image alt="handshake" src={officeWorker.src} width={40} height={40} />
      ),
      percentage: 27,
      disabled: true,
    },
  ];

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
          <MainCard container>
            <Grid item xs={6} component="div">
              <Typography component="h1">65%</Typography>
              <Typography component="p">Concluído</Typography>
              <ProgressBar percentage={65}>
                <Box className="container" />
                <Box className="progress" />
              </ProgressBar>
            </Grid>
            <Grid item xs={6} component="div">
              <Typography component="h1">45</Typography>
              <Typography component="p">Pontos</Typography>
              <Button
                startIcon={
                  <LocationOnOutlined htmlColor="white" fontSize="small" />
                }
                component="button"
                onClick={() => router.push(`/campains/check-in/${params.id}`)}
              >
                check-in
              </Button>
            </Grid>
          </MainCard>

          <Title>Outras metas em andamento</Title>

          <GridContainer>
            {goals.map((goal, index) => (
              <Box key={index}>
                <GridCard
                  title={goal.title}
                  icon={goal.icon}
                  onClick={() =>
                    router.push(`/campains/goal-detail/${goal.id}`)
                  }
                  disabled={goal.disabled}
                  progress={goal.percentage}
                  sx={{
                    padding: "8px 20px",
                    borderBottom: "1px dashed " + theme.palette.secondary[300],
                    borderRight:
                      index % 2 === 0
                        ? "1px dashed " + theme.palette.secondary[300]
                        : "none",
                    borderTop:
                      index <= 1
                        ? "1px dashed " + theme.palette.secondary[300]
                        : "none",
                  }}
                />
              </Box>
            ))}
          </GridContainer>
        </Container>
      )}
    />
  );
}
