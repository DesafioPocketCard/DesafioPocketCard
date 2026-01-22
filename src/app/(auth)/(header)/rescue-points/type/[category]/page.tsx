"use client";

import React from "react";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import {
  GridContainer,
  HeaderContainer,
  TitleContainer,
} from "../../styles"; // Importando estilos da pasta pai (rescue-points)
import { Header } from "@/components/Layout";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { GridCardImage } from "@/components/Cards";
import { useQuery } from "@tanstack/react-query";
import GiftService from "@/services/gift.service";

interface PageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const router = useRouter();

  // 1. Decodificar o nome da URL (ex: "Alimenta%C3%A7%C3%A3o" vira "Alimentação")
  // React.use() é necessário em versões mais novas do Next para params, 
  // mas vamos usar direto por compatibilidade com versões anteriores por enquanto.
  const categoryName = decodeURIComponent(params.category);

  // 2. Buscar produtos dessa categoria
  const { data, isLoading } = useQuery({
    queryKey: ["gifts-by-category", categoryName],
    queryFn: () => GiftService.getByCategory(categoryName),
  });

  const products = data?.data || [];

  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <TitleContainer {...props}>
          <Header />
          <HeaderContainer sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            
            <IconButton onClick={() => router.back()} sx={{ padding: 0, mr: 1 }}>
              <ArrowBackIos htmlColor="white" fontSize="small" />
            </IconButton>
            
            <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Categoria
                </Typography>
                <Typography component="h1" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: 1 }}>
                    {categoryName}
                </Typography>
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