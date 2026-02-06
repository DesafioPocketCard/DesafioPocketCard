"use client";

import React from "react";
import { CardList, Divider, HeaderContainer } from "./styles";
import { Box, CircularProgress, Typography, Alert } from "@mui/material"; // Importe Alert
import { BackButton, Button } from "@/components/Buttons";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/FormFields";
import Image from "next/image";
import search from "@/assets/icons/search.svg";
import { GoalsCard } from "@/components/Cards";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import CampaignService from "@/services/campaign.service";
import { ICampaign } from "@/types/Campaign";
import { Refresh } from "@mui/icons-material"; // Ícone para tentar de novo

export default function Campaigns() {
  const router = useRouter();
  const { control } = useForm();
  
  // 1. Extrair isError e error para diagnóstico
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => CampaignService.get(),
    retry: 1, // Tenta apenas 1 vez se falhar para não ficar em loop
  });

  function handleClick(item: ICampaign) {
    if (item.sn_regulamento_aceito === "S") {
      router.push(`/campains/goals/${item.id_campanha}`);
      return;
    }
    router.push(`/campains/regulation/${item.id_campanha}`);
  }

  const campaigns = data?.data || [];

  return (
    <Box mt={4}>
      <HeaderContainer>
        <BackButton onClick={() => router.back()} />
        <Typography component="h1">Campanhas</Typography>
        <Typography>
          Escolha a campanha a qual você pretende conquistar metas.
        </Typography>
        <TextField
          placeholder="Busque uma campanha"
          name="search"
          control={control}
          leftIcon={<Image alt="Buscar" src={search} width={24} height={24} />}
        />
        <Button>Buscar</Button>
      </HeaderContainer>
      <Divider />
      
      <CardList component="ul">
        {/* LOADING */}
        {isLoading && (
          <Box display={"flex"} justifyContent="center" mt={4}>
            <CircularProgress disableShrink />
          </Box>
        )}

        {/* CASO DE ERRO (O usuário vai ver isso se a API falhar) */}
        {isError && (
            <Box mt={4} display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Alert severity="error">
                    Não foi possível carregar as campanhas via celular.
                    <br/>
                    {/* Mostra o erro técnico (ex: Network Error, 403, etc) */}
                    Detalhe: {error instanceof Error ? error.message : "Erro desconhecido"}
                </Alert>
                <Button onClick={() => refetch()} startIcon={<Refresh/>}>
                    Tentar Novamente
                </Button>
            </Box>
        )}

        {/* CASO LISTA VAZIA (A API respondeu, mas não tem nada) */}
        {!isLoading && !isError && campaigns.length === 0 && (
             <Box mt={4} textAlign="center">
                <Typography color="textSecondary">
                    Nenhuma campanha disponível para o seu perfil no momento.
                </Typography>
                <Button variant="text" onClick={() => refetch()}>Atualizar</Button>
             </Box>
        )}

        {/* LISTA NORMAL */}
        {!isLoading && !isError && campaigns.map((item: ICampaign, index: number) => (
          <GoalsCard
            key={index}
            title={item.nome_campanha}
            expiration={item.data_final}
            points={item.valor_meta}
            photo={item.nome_arquivo}
            onClick={() => handleClick(item)}
          />
        ))}
      </CardList>
    </Box>
  );
}