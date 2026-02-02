"use client";

import React, { useState } from "react";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Header } from "@/components/Layout";
import { Box, Divider, IconButton, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { CartCard, Container, HeaderContainer, TitleContainer } from "./styles";
import { ArrowBackIos, Delete } from "@mui/icons-material";
import { Button } from "@/components/Buttons";
import Image from "next/image";

// Importações novas para conectar com a API
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CartService from "@/services/cart.service";
import { ICartItem } from "@/types/Cart";
import useNotifier from "@/hooks/useNotifier";


const ProductImage = ({ src, alt }: { src: string, alt: string }) => {
    const [imageSrc, setImageSrc] = useState(src);
    const placeholder = "https://placehold.co/80x80?text=Sem+Foto"; // Link de exemplo ou seu '/images/placeholder.png'

    return (
        <Image 
            src={imageSrc} 
            alt={alt} 
            width={80} 
            height={80}
            style={{ objectFit: 'contain' }} 
            unoptimized={true} // <--- ISSO IMPEDE O ERRO 404 DE DERRUBAR O SITE
            onError={() => setImageSrc(placeholder)} // Troca a imagem se falhar
        />
    );
};

interface IProps {
  params: {
    id: string;
  };
}

export default function CartScreen({ params }: IProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const notify = useNotifier(); 

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.get(),
  });

 
  const removeMutation = useMutation({
    mutationFn: (id: number) => CartService.remove(id),
    onSuccess: () => {
      // Recarrega a lista automaticamente após remover
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      notify("Produto removido da sacola!", "success");
    },
    onError: (error: any) => {
      notify(error.message || "Erro ao remover produto.", "error");
    }
  });

 
  const resgateMutation = useMutation({
    mutationFn: () => CartService.solicitarResgate(),
    onSuccess: (responseData) => {
        notify("Resgate solicitado com sucesso!", "success");
        router.push(`/rescue-points/confirm-token/${responseData.id_resgate}`);
    },
    onError: (error: any) => {
        notify(error.message || "Erro ao solicitar resgate.", "error");
    }
  });

  // Funções de clique
  function handleRemove(id: number) {
      
          removeMutation.mutate(id);
      
  }

  function handleSolicitarResgate() {
      resgateMutation.mutate();
  }

  
  const cartData = data?.data?.sacola;
  const saldoUsuario = data?.data?.total_pontos_usuario || 0;
  const listaItens = cartData?.itens || [];
  const totalCart = cartData?.total_pontos_sacola || 0;


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



</HeaderContainer>

        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <Container {...props}>
          <Typography component="h1">Produtos na sacola</Typography>
          <Typography component="h2">
            Confira os itens que você selecionou para resgate.
          </Typography>

          {/* Loading State */}
          {isLoading && (
             <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
             </Box>
          )}

          {/* Lista Vazia */}
          {!isLoading && listaItens.length === 0 && (
              <Typography sx={{ mt: 4, textAlign: 'center' }}>Sua sacola está vazia.</Typography>
          )}

          {/* Lista de Produtos */}
          {listaItens.map((product: ICartItem) => (
            <CartCard key={product.id_sacola_item}>
              <Box className="image">
                {/*
                <Image 
                    src={product.img_premio} 
                    alt={product.nome_premio} 
                    width={80} 
                    height={80}
                    style={{ objectFit: 'contain' }} 
                />
                  */}
                <ProductImage 
                    src={product.img_premio} 
                    alt={product.nome_premio} 
                />
              </Box>
              <Box className="info">
                <Typography component="h3">{product.nome_premio}</Typography>
                <Typography component="span">
                    {product.pontos_custo_unitario} pontos
                    {product.quantidade > 1 && ` (x${product.quantidade})`}
                </Typography>
                
                {/* Botão Remover */}
                <Box 
                    className="remove" 
                    onClick={() => handleRemove(product.id_sacola_item)}
                    sx={{ cursor: 'pointer' }}
                >
                  <Delete />
                  Remover
                </Box>
              </Box>
            </CartCard>
          ))}

          <Divider />
          
          <Typography className="total">
             Total: {totalCart} pontos
          </Typography>

          {/* Botão Solicitar Resgate */}
          <Button 
            onClick={handleSolicitarResgate} 
            disabled={resgateMutation.isPending || listaItens.length === 0}
          >
            {resgateMutation.isPending ? "Processando..." : "Solicitar Resgate"}
          </Button>

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => router.push("/rescue-points")} // Volta para a loja
          >
            Continuar Resgatando
          </Button>
        </Container>
      )}
    />
  );
}