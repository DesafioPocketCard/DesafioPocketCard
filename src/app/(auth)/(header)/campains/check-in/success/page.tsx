"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Header } from "@/components/Layout";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { ArrowBackIos, LocationOnOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { theme } from "@/config";
import { GridContainer } from "../../goals/[id]/styles";
import { GridCard } from "@/components/Cards";
import Image from "next/image";
import handshake from "@/assets/images/handshake.png";
import support from "@/assets/images/support.png";
import officeWorker from "@/assets/images/office-worker.png";
import booth from "@/assets/images/booth.png";
import { Container, HeaderContainer, Title, TitleContainer } from "./styles";

interface IProps {
  params: {
    id: string;
  };
}

export default function GoalsDetail({ params }: IProps) {
  const router = useRouter();

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
            <LocationOnOutlined
              htmlColor="white"
              sx={{
                fontSize: "128px",
              }}
              className="location-icon"
            />
            <Typography component="h1">
              Check-in realizado com sucesso
            </Typography>
            <Typography>Agora você tem 46 pontos!</Typography>
          </HeaderContainer>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <Container {...props}>
          <Title>
            <Typography component="h1">Mais metas</Typography>
          </Title>

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
