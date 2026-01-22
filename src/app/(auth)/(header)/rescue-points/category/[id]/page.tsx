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
import {
  Badge,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { GridCardImage } from "@/components/Cards";
import Image from "next/image";
import shoppingbag from "@/assets/icons/shopping-bag-white.svg";
import { useQueries, useQuery } from "@tanstack/react-query";
import GiftService from "@/services/gift.service";
import CartService from "@/services/cart.service";
import IGiftCategory from "@/types/GiftCategory";
import GiftCategoryService from "@/services/gift_category.service";

type Props = {
  params: {
    id: string;
  };
};

export default function page({ params: { id } }: Props) {
  const router = useRouter();


  const { data} = useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.get(),
  });

  const [category, gifts] = useQueries({
    queries: [
      {
        queryKey: ["category-by-id"],
        queryFn: () => GiftCategoryService.getById(id),
        enabled: !!id,
      },
      {
        queryKey: ["gifts"],
        queryFn: () => GiftService.get(id),
      },
    ],
  });

  const cartData = data?.data?.sacola;
  const saldoUsuario = data?.data?.total_pontos_usuario || 0;



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
            <Typography component="h1">Resgate de Prêmios</Typography>
            <Typography>Você tem: {saldoUsuario} pontos</Typography>
            <Badge
              badgeContent={cartData?.itens.length || 0}
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
        <Container
          {...props}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Title>
            <Typography component="h1">
              {category?.data?.data[0].nome_grupo_premio}
            </Typography>
          </Title>
          {gifts.isLoading && (
            <Box display={"flex"} justifyContent="center" my={2}>
              <CircularProgress disableShrink />
            </Box>
          )}
          <GridContainer>
            {gifts.data?.data.map((rescuePoint, index) => (
              <GridCardImage
                key={index}
                title={rescuePoint.nome}
                icon={rescuePoint.img_premio}
                onClick={() =>
                  router.push(`/rescue-points/product/${rescuePoint.id_premio}`)
                }
                sx={{
                  padding: "8px 20px",
                }}
                points={rescuePoint.qtde_pontos_resgate}
              />
            ))}
          </GridContainer>
        </Container>
      )}
    />
  );
}
