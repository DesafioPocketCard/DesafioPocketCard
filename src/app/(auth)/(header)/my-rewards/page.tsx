"use client";

import React from "react";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import {
  Container,
  GridContainer,
  HeaderContainer,
  TitleContainer,
} from "../rescue-points/styles"; // Reaproveitando estilos da tela de resgate
import { Header } from "@/components/Layout";
import { IconButton, Typography, Box, CircularProgress } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { GridCardImage } from "@/components/Cards";
import { useQuery } from "@tanstack/react-query";
import MyRewardsService from "@/services/my_rewards.service";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function MyRewardsPage() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["my-rewards"],
    queryFn: () => MyRewardsService.getAll(),
  });

  const rewards = data?.data || [];

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
            <Typography component="h1">Meus Prêmios</Typography>
            <Typography>Histórico de resgates realizados</Typography>
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
          {isLoading && (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress color="secondary" />
            </Box>
          )}

          {!isLoading && rewards.length === 0 && (
            <Typography textAlign="center" color="textSecondary" mt={4}>
              Você ainda não resgatou nenhum prêmio.
            </Typography>
          )}

          <GridContainer>
            {rewards.map((reward, index) => (
              <GridCardImage
                key={index}
                title={reward.nome}
                icon={reward.img_premio}
                // No histórico, não clicamos para "comprar", talvez para ver detalhes do voucher
                // Por enquanto deixei sem ação ou pode levar para uma tela de detalhes se tiver
                onClick={() => {}} 
                sx={{
                  padding: "8px 20px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "& .MuiTypography-root": {
                    minHeight: "40px", // Mantendo o alinhamento que ensinei antes
                    display: "-webkit-box",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    textAlign: "center",
                  },
                }}
                // Aqui estou formatando a data para exibir no lugar dos pontos
                // Ex: "20/01/2026"
                points={format(parseISO(reward.data_resgate), "dd/MM/yyyy")}
                
                // Se quiser mostrar "XYZ Pontos" em vez da data, use:
                // points={reward.qtde_pontos_resgate}
              />
            ))}
          </GridContainer>
        </Container>
      )}
    />
  );
}