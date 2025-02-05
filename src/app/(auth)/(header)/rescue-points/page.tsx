"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import React from "react";
import {
  GridContainer,
  HeaderContainer,
  Title,
  TitleContainer,
} from "./styles";
import { Header } from "@/components/Layout";
import { Badge, Box, Container, IconButton, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { GridCardImage } from "@/components/Cards";
import Image from "next/image";
import incentivo from "@/assets/images/incentivo_face.png";
import applewatch from "@/assets/images/apple_watch.png";
import vale from "@/assets/images/vale_face.png";
import shoppingbag from "@/assets/icons/shopping-bag-white.svg";

export default function page() {
  const router = useRouter();

  const rescuePoints = [
    {
      id: 1,
      title: "Incentivo de R$ 200,00",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: (
        <Image
          alt="incentivo"
          src={incentivo.src}
          width={137.39}
          height={105.47}
        />
      ),
      percentage: 100,
      new: true,
    },
    {
      id: 2,
      title: "Apple Watch SE GPS 40mm",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: (
        <Image
          alt="applewatch"
          src={applewatch.src}
          width={137.39}
          height={105.47}
        />
      ),
      percentage: 30,
      new: true,
    },
    {
      id: 2,
      title: "Vale Prêmios R$ 200,00",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: <Image alt="vale" src={vale.src} width={131.68} height={101.59} />,
      percentage: 100,
    },
    {
      id: 2,
      title: "Vale Prêmios R$ 200,00",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: <Image alt="vale" src={vale.src} width={131.68} height={101.59} />,
      percentage: 100,
    },
    {
      id: 2,
      title: "Vale Prêmios R$ 200,00",
      description:
        "Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. Descricão da meta 1. ",
      icon: <Image alt="vale" src={vale.src} width={131.68} height={101.59} />,
      percentage: 100,
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
            <Typography component="h1">Resgate de Pontos</Typography>
            <Typography>Você tem: 64 pontos</Typography>
            <Badge
              badgeContent={3}
              className="badge"
              onClick={() => router.push(`/rescue-points/cart`)}
              color="secondary"
            >
              <Image
                src={shoppingbag}
                alt="shoppingbag"
                width={24}
                height={24}
              />
            </Badge>
          </HeaderContainer>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <Container {...props}>
          <Title>
            <Typography component="h1">Produtos em destaque</Typography>
          </Title>
          <GridContainer>
            {rescuePoints.map((rescuePoint, index) => (
              <Box key={index}>
                <GridCardImage
                  title={rescuePoint.title}
                  icon={rescuePoint.icon}
                  onClick={() =>
                    router.push(`/rescue-points/product/${rescuePoint.title}`)
                  }
                  disabled={rescuePoint.disabled}
                  sx={{
                    padding: "8px 20px",
                  }}
                  points={rescuePoint.percentage}
                  labelTop={rescuePoint.new ? "Novo" : undefined}
                />
              </Box>
            ))}
          </GridContainer>
        </Container>
      )}
    />
  );
}
