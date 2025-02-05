"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Header } from "@/components/Layout";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import { CartCard, Container, HeaderContainer, TitleContainer } from "./styles";
import { ArrowBackIos, Delete } from "@mui/icons-material";
import sapato from "@/assets/images/sapato.png";
import applewatch from "@/assets/images/apple_watch.png";
import Image from "next/image";
import { Button } from "@/components/Buttons";

interface IProps {
  params: {
    id: string;
  };
}

export default function Success({ params }: IProps) {
  const router = useRouter();

  const products = [
    {
      id: 1,
      name: "Tênis Nike Air Max 90",
      point: 30,
      image: sapato,
    },
    {
      id: 2,
      name: "Apple Watch SE GPS 40mm",
      point: 30,
      image: applewatch,
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
          </HeaderContainer>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <Container {...props}>
          <Typography component="h1">Produtos na sacola</Typography>
          <Typography component="h2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem
            urna, imperdiet id ante u.
          </Typography>
          {products.map((product) => (
            <CartCard key={product.id}>
              <Box className="image">
                <Image src={product.image} alt={product.name} />
              </Box>
              <Box className="info">
                <Typography component="h3">{product.name}</Typography>
                <Typography component="span">{product.point} pontos</Typography>
                <Box className="remove">
                  <Delete />
                  Remover
                </Box>
              </Box>
            </CartCard>
          ))}
          <Divider />
          <Typography className="total">Total: 60 pontos</Typography>
          <Button>Solicitar Resgate</Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => router.push("/rescue-points")}
          >
            Continuar Resgatando
          </Button>
        </Container>
      )}
    />
  );
}
