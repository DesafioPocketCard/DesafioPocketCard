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
  Avatar,
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
import { useQueries } from "@tanstack/react-query";
import GiftService from "@/services/gift.service";
import GiftCategoryService from "@/services/gift_category.service";
import CardHorizontalWrapper from "@/components/Cards/CardHorizontalWrapper";
import useCategory from "@/store/useCategory";
import IGiftCategory from "@/types/GiftCategory";

export default function page() {
  const router = useRouter();
  const theme = useTheme();
  const { setCategory } = useCategory();

  const [categories, highGifts] = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => GiftCategoryService.get(),
      },
      {
        queryKey: ["high-gifts"],
        queryFn: () => GiftService.getHigh(),
      },
    ],
  });

  const handlerSetCategory = (category: IGiftCategory) => {
    router.push(`/rescue-points/category/${category.id_grupo_premio}`);
  };

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
        <Container
          {...props}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {categories.isLoading && (
            <Box display={"flex"} justifyContent="center" my={2}>
              <CircularProgress disableShrink />
            </Box>
          )}
          {categories.data?.data && (
            <CardHorizontalWrapper
              data={categories.data?.data || []}
              renderItem={(rescuePoint, index) => (
                <Avatar
                  src={rescuePoint.nome_arquivo}
                  sx={{
                    width: 72,
                    height: 72,
                    border: `1px solid ${theme.palette.secondary?.["200"] || "#B6B6B6"}`,
                  }}
                  alt={rescuePoint.nome_grupo_premio}
                  key={index}
                  onClick={handlerSetCategory.bind(null, rescuePoint)}
                />
              )}
            />
          )}
          <Title>
            <Typography component="h1">Produtos em destaque</Typography>
          </Title>
          {highGifts.isLoading && (
            <Box display={"flex"} justifyContent="center" my={2}>
              <CircularProgress disableShrink />
            </Box>
          )}
          <GridContainer>
            {highGifts.data?.data.map((rescuePoint, index) => (
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
