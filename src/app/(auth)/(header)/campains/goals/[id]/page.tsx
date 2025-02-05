"use client";

import React from "react";
import {
  Description,
  Divider,
  GridContainer,
  HeaderContainer,
  ProgressBar,
  ProgressLabel,
} from "./styles";
import { Box, Typography } from "@mui/material";
import { BackButton } from "@/components/Buttons";
import { useRouter } from "next/navigation";
import { theme } from "@/config";
import { GridCard } from "@/components/Cards";
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

const goals = [
  {
    id: 1,
    title: "Vendas fechadas",
    description:
      "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
    icon: <Image alt="handshake" src={handshake.src} width={40} height={40} />,
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
    icon: <Image alt="handshake" src={handshake.src} width={40} height={40} />,
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
    icon: <Image alt="handshake" src={handshake.src} width={40} height={40} />,
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
export default function Goals({ params }: IProps) {
  const router = useRouter();
  return (
    <Box>
      <HeaderContainer>
        <BackButton onClick={() => router.back()} />
        <Box>
          <Typography component="h1">
            Olá, <Typography component="span">Maria Fernanda</Typography>.
          </Typography>
          <Typography>mfernanda@teste.com.br</Typography>
        </Box>
      </HeaderContainer>
      <Divider />
      <ProgressLabel>Metas atingidas</ProgressLabel>
      <ProgressBar percentage={50}>
        <Box>
          <Box className="container" />
          <Box className="progress" />
        </Box>
        <Typography component="h1">50%</Typography>
      </ProgressBar>

      <Description>
        Veja abaixo quais as missões disponíveis que devem ser realizadas para
        crescimento do seu sucesso.
      </Description>

      <GridContainer>
        {goals.map((goal, index) => (
          <Box key={index}>
            <GridCard
              title={goal.title}
              icon={goal.icon}
              onClick={() => router.push(`/campains/goal-detail/${goal.id}`)}
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
    </Box>
  );
}
