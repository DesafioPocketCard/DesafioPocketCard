"use client";

import React from "react";
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
          <HeaderContainer>
            <IconButton onClick={() => router.back()}>
              <ArrowBackIos htmlColor="white" fontSize="small" />
            </IconButton>
            <Typography component="h1">Resgate de Prêmios</Typography>
            {/* Mostra o saldo real vindo do banco */}
            <Typography>Você tem: {isLoading ? "..." : saldoUsuario} pontos</Typography>
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
                
                <Image 
                    src={product.img_premio} 
                    alt={product.nome_premio} 
                    width={80} 
                    height={80}
                    style={{ objectFit: 'contain' }} 
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