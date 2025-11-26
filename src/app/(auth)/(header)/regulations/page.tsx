"use client";

import React from "react";
import { CardList, Divider, HeaderContainer } from "./styles";
import { Box, CircularProgress, Typography } from "@mui/material";
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

export default function Campaigns() {
  const router = useRouter();
  const { control } = useForm();
  const { data, isLoading } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => CampaignService.get(),
  });

  function handleClick(item: ICampaign) {
    router.push(`/regulations/${item.id_campanha}`);
  }

  return (
    <Box mt={4}>
      <HeaderContainer>
        <BackButton onClick={() => router.back()} />
        <Typography component="h1">Regulamentos</Typography>
        <Typography>
          Clique em uma campanha para visualizar o regulamento.
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
        {isLoading && (
          <Box display={"flex"} justifyContent="center" mt={4}>
            <CircularProgress disableShrink />
          </Box>
        )}
        {data?.data.map((item, index) => (
          <GoalsCard
            key={index}
            title={item.nome_campanha}
            expiration={item.data_final}
            points={item.valor_meta}
            photo={item.nome_arquivo}
            onClick={() => handleClick(item)}
            isRegulation
          />
        ))}
      </CardList>
    </Box>
  );
}
