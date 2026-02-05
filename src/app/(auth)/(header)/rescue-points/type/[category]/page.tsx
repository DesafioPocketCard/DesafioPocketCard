"use client";

import React from "react";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import {
  GridContainer,
  HeaderContainer,
  TitleContainer,
} from "../../styles"; 
import { Header } from "@/components/Layout";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Typography,
  Badge
} from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { GridCardImage } from "@/components/Cards";
import { useQuery } from "@tanstack/react-query";
import CartService from "@/services/cart.service";
import GiftService from "@/services/gift.service";
import Image from "next/image"; // Importar Image
import shoppingbag from "@/assets/icons/shopping-bag-white.svg";

interface PageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const router = useRouter();

  // 1. Decodificar o nome da URL (ex: "Alimenta%C3%A7%C3%A3o" vira "Alimentação")
  
  const categoryName = decodeURIComponent(params.category);

  // 2. Buscar produtos dessa categoria
  const { data, isLoading } = useQuery({
    queryKey: ["gifts-by-category", categoryName],
    queryFn: () => GiftService.getByCategory(categoryName),
  });

  // 3. Buscar saldo do usuário
  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.get(),
  });
const saldoUsuario = cartData?.data?.total_pontos_usuario || 0;

  const products = data?.data || [];
  const qtdItensCarrinho = cartData?.data?.sacola?.itens.length || 0;

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
        <Box sx={{ display: 'flex', flexDirection: 'column'

          
         }}>
          <h1>Categoria:</h1>
            <Typography component="h1" sx={{ color: 'white', fontWeight: 'semibold', fontSize: '1.5rem', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                 {categoryName}
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
                badgeContent={cartData?.data?.sacola?.itens.length || 0}
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
          sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 4 }}
        >
          
          {isLoading && (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress color="secondary" />
            </Box>
          )}

          {!isLoading && products.length === 0 && (
             <Box mt={4} textAlign="center">
                <Typography color="textSecondary">
                    Nenhum produto encontrado nesta categoria.
                </Typography>
             </Box>
          )}

          <GridContainer>
            {products.map((rescuePoint: any, index: number) => (
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