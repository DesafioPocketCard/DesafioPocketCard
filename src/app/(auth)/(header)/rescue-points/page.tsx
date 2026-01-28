"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import React from "react";
import {
  GridContainer,
  HeaderContainer,
  TitleContainer,
} from "./styles"; // Removi 'Title' daqui pois vamos usar Typography padrão para evitar erro
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

  // 1. Definição correta das queries
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

  // 2. Função com nome correto
  const handlerSelectCategory = (categoryName: string) => {
    router.push(`/rescue-points/type/${encodeURIComponent(categoryName.trim())}`);
  };

  const cartData = cartQuery.data?.data?.sacola;
  const saldoUsuario = cartQuery.data?.data?.total_pontos_usuario || 0;
  
  // 3. Array seguro de categorias (Para evitar erro se for undefined)
  const categoriesList = categoriesQuery.data?.data || [];

  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <TitleContainer {...props}>
          <Header />
<HeaderContainer sx={{ 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', // <--- MUDEI AQUI (antes era 'center')
    width: '100%',
    mt: 2
}}>
    
    {/* --- BLOCO ESQUERDO (Ícone + Textos) --- */}
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}>
        
        {/* 1. Ícone (Seta) */}
        {/* Adicionei 'mt: 0.5' para descer a seta um pouquinho e alinhar com o texto */}
        <IconButton onClick={() => router.back()} sx={{ padding: 0, mt: 0.5 }}>
            <ArrowBackIos htmlColor="white" fontSize="small" />
        </IconButton>

        {/* 2. Coluna de Textos */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component="h1" sx={{ color: 'white', fontWeight: 'semibold', fontSize: '1.6rem', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                Resgate de Prêmios
            </Typography>

            <Typography sx={{ color: 'white', fontSize: '1rem', fontWeight: 500 }}>
                Você tem: {saldoUsuario} pontos
            </Typography>
        </Box>

    </Box>

    {/* --- BLOCO DIREITO (Sacola) --- */}
    <Box>
        {/* Aqui mantivemos o padding original para alinhar com o topo do bloco esquerdo */}
        <IconButton onClick={() => router.push(`/rescue-points/cart`)} sx={{ padding: 0.5 }}>
            <Badge
                badgeContent={cartData?.itens.length || 0}
                color="error"
            >
                <Image
                src={shoppingbag}
                alt="shoppingbag"
                width={32}
                height={32}
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
          sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 4, overflowX: "hidden" }}
        >
          {/* --- LISTA DE CATEGORIAS (CORRIGIDA) --- */}
          <Box mt={2}>
              <Typography component="h2" variant="subtitle1" fontWeight="bold" mb={1}>
                Categorias
              </Typography>

              {/* Usa categoriesQuery aqui, não 'categories' */}
              {categoriesQuery.isLoading && <CircularProgress size={20} />}
              
              {!categoriesQuery.isLoading && categoriesList.length === 0 && (
                  <Typography variant="caption" color="textSecondary">
                      Nenhuma categoria encontrada.
                  </Typography>
              )}

              {/* BOX DE ROLAGEM LATERAL */}
              <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  gap: 1.5, 
                  overflowX: 'auto', 
                  pb: 1,
                  width: '100%',
                  whiteSpace: 'nowrap',
                  '&::-webkit-scrollbar': { display: 'none' },
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                  WebkitOverflowScrolling: 'touch',
              }}>
                {/* Mapeamento correto da lista de strings */}
                {categoriesList.map((catName, index) => (
                  <Chip 
                    key={index} 
                    label={catName.trim()} 
                    onClick={() => handlerSelectCategory(catName)} // Chama a função certa
                    color="primary" 
                    variant="filled" 
                    
                    sx={{ 
                        fontWeight: 500,
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        flexShrink: 0, // Garante o scroll
                        '&:hover': { 
                            backgroundColor: theme.palette.primary.dark,
                        }
                    }}
                  />
                ))}
              </Box>
          </Box>

          {/* --- PRODUTOS EM DESTAQUE --- */}
          <Box>
              <Typography component="h1" variant="h6" align="center" mb={2} mt={1}>
                Produtos em destaque
              </Typography>
          </Box>

          {highGiftsQuery.isLoading && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress disableShrink />
            </Box>
          )}

          <GridContainer>
            {/* Usa highGiftsQuery aqui */}
            {highGiftsQuery.data?.data.map((rescuePoint, index) => (
              <GridCardImage
                key={index}
                title={rescuePoint.nome}
                icon={rescuePoint.img_premio}
                onClick={() =>
                  router.push(`/rescue-points/product/${rescuePoint.id_premio}`)
                }
                points={rescuePoint.qtde_pontos_resgate}
                sx={{ 
                    padding: "8px 20px",
                    // Estilos para limitar o texto do título
                     "& .MuiTypography-root": {
                        minHeight: "16px",
                        display: "-webkit-box",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        textAlign: "center"
                      }
                }} 
              />
            ))}
          </GridContainer>
        </Container>
      )}
    />
  );
}