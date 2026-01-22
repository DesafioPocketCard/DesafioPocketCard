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
  // Stack removido pois vamos usar Box para ter controle total do scroll
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
            
            {/* ESQUERDA: Voltar + Título */}
            <Box display="flex" alignItems="center" gap={1}>
                <IconButton onClick={() => router.back()} sx={{ padding: 0 }}>
                  <ArrowBackIos htmlColor="white" fontSize="small" />
                </IconButton>
                <Typography component="h1" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Resgate
                </Typography>
            </Box>

            {/* DIREITA: Pontos + Carrinho */}
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
          sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 4, overflowX: "hidden" }} // overflowX hidden no container pai evita scroll da página inteira
        >
          {/* --- LISTA DE CATEGORIAS --- */}
          <Box mt={2}>
              <Typography component="h2" variant="subtitle1" fontWeight="bold" mb={1}>
                Categorias
              </Typography>

              {categoriesQuery.isLoading && <CircularProgress size={20} />}
              
              {!categoriesQuery.isLoading && categoriesList.length === 0 && (
                  <Typography variant="caption" color="textSecondary">
                      Nenhuma categoria encontrada.
                  </Typography>
              )}

              {/* --- AQUI ESTÁ A MÁGICA DA ROLAGEM LATERAL --- */}
              <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  gap: 1.5, // Um pouco mais de espaço entre os itens
                  overflowX: 'auto', // Habilita o scroll
                  pb: 1,
                  width: '100%',
                  whiteSpace: 'nowrap', // Garante que não quebre linha
                  
                  // Esconde a barra de rolagem (estética)
                  '&::-webkit-scrollbar': { display: 'none' },
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                  
                  // Comportamento suave no touch
                  WebkitOverflowScrolling: 'touch',
              }}>
                {categoriesList.map((catName, index) => (
                  <Chip 
                    key={index} 
                    label={catName.trim()} 
                    onClick={() => handlerSelectCategory(catName)}
                    color="primary" 
                    variant="filled" 
                    
                    sx={{ 
                        fontWeight: 500,
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        
                        // --- O SEGREDO DO LAYOUT ---
                        flexShrink: 0, // IMPEDE o botão de encolher. Ele mantem o tamanho real e "empurra" o scroll.
                        
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
            {highGiftsQuery.data?.data.map((rescuePoint, index) => (
              <GridCardImage
                key={index}
                title={rescuePoint.nome}
                icon={rescuePoint.img_premio}
                onClick={() =>
                  router.push(`/rescue-points/product/${rescuePoint.id_premio}`)
                }
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