"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import React from "react";
import {
  GridContainer,
  HeaderContainer,
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
  Chip,
  
} from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { GridCardImage } from "@/components/Cards";
import Image from "next/image";
import shoppingbag from "@/assets/icons/shopping-bag-white.svg";
import { useQueries } from "@tanstack/react-query";
import GiftService from "@/services/gift.service";
import CartService from "@/services/cart.service";
import { useTheme } from "@mui/material/styles";

export default function RescuePointsPage() {
  const router = useRouter();
  const theme = useTheme();
  const { setCategory } = useCategory();

    const { data, isLoading, isError } = useQuery({
      queryKey: ["cart"],
      queryFn: () => CartService.get(),
    });


  const [cartQuery, categoriesQuery, highGiftsQuery] = useQueries({
    queries: [
      {
        queryKey: ["cart"],
        queryFn: () => CartService.get(),
      },
      {
        queryKey: ["gift-categories"],
        queryFn: () => GiftService.getCategories(),
      },
      {
        queryKey: ["high-gifts"],
        queryFn: () => GiftService.getHigh(),
      },
    ],
  });

  const handlerSelectCategory = (categoryName: string) => {
    router.push(`/rescue-points/type/${encodeURIComponent(categoryName.trim())}`);
  };

  const cartData = cartQuery.data?.data?.sacola;
  const saldoUsuario = cartQuery.data?.data?.total_pontos_usuario || 0;
  
  const categoriesList = categoriesQuery.data?.data || [];

  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <TitleContainer {...props}>
          <Header />
          <HeaderContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mt: 2 }}>
            
           
            <Box display="flex" alignItems="center" gap={1}>
                <IconButton onClick={() => router.back()} sx={{ padding: 0 }}>
                  <ArrowBackIos htmlColor="white" fontSize="small" />
                </IconButton>
                <Typography component="h1" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Resgate
                </Typography>
            </Box>

           
            <Box display="flex" alignItems="center" gap={2}>
                <Typography sx={{ color: 'white', fontSize: '0.9rem', fontWeight: 500 }}>
                    {saldoUsuario} pts
                </Typography>
                
                <IconButton onClick={() => router.push(`/rescue-points/cart`)} sx={{ padding: 0.5 }}>
                    <Badge
                      badgeContent={cartData?.itens.length || 0}
                      color="error"
                    >
                      <Image
                        src={shoppingbag}
                        alt="shoppingbag"
                        width={24}
                        height={24}
                      />
                    </Badge>
                </IconButton>
            </Box>

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
          {/* Seçao de produtos por categoria
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
          */}
          {highGifts.isLoading && (
            <Box display={"flex"} justifyContent="center" my={2}>
              <CircularProgress disableShrink />
            </Box>
          )}

          <GridContainer>
            {highGiftsQuery.data?.data.map((rescuePoint, index) => (
              <GridCardImage
                key={index}
                title={rescuePoint.nome}
                icon={rescuePoint.img_premio}
                onClick={() =>
                  router.push(`/rescue-points/product/${rescuePoint.id_premio}`)
                }
                sx={{
    padding: "8px 20px",
    height: "100%", // Força o card a ocupar toda a altura da grid
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Distribui o conteúdo
    alignItems: "center",
    // Estilo específico para o título (se o componente aceitar, senão precisa ir no componente filho)
    "& .MuiTypography-root": { // Tentativa de pegar o título pelo CSS
        minHeight: "16px", // Altura suficiente para 2 linhas
        display: "-webkit-box",
        overflow: "hidden",
        textOverflow: "ellipsis",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        textAlign: "center"
    }
  }}
                points={rescuePoint.qtde_pontos_resgate}
                sx={{ padding: "8px 20px" }} 
              />
            ))}
          </GridContainer>
        </Container>
      )}
    />
  );
}