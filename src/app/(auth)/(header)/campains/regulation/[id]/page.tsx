"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Header } from "@/components/Layout";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import React from "react";
import { BoxContainerRegulation, TitleContainer } from "./styles";
import { Container, HeaderContainer } from "./styles";
import { ArrowBackIos } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import SimpleCheckBox from "@/components/FormFields/SimpleCheckBox";
import { Button } from "@/components/Buttons";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import RegulationService from "@/services/regulation.service";
import CampaignService from "@/services/campaign.service";
import { z } from "zod";
import { useNotifier } from "@/hooks";

interface IProps {
  params: {
    id: string;
  };
}

export default function Regulation({ params }: IProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const notify = useNotifier();

  const acceptRegulationMutation = useMutation({
    mutationFn: RegulationService.acceptRegulation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regulation"] });
      router.push(`/campains/goals/${params.id}`);
    },
    onError: () => {
      notify(
        "Ocorreu um erro ao aceitar o regulamento, por favor tente novamente.",
        "error"
      );
    },
  });

  const { data: campaigns } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => CampaignService.get(),
  });

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["regulation"],
    queryFn: () => RegulationService.get(params.id),
  });

  const campaign = campaigns?.data.find(
    (item) => item.id_campanha === params.id
  );

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      accept: null,
    },
  });

  const onSubmit = handleSubmit(({ accept }) => {
    if (accept) {
      acceptRegulationMutation.mutate(params.id);
    }
  });

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
            <Typography component="h1">
              {campaign?.nome_campanha || "Carregando..."}
            </Typography>
            <Typography>
              Meta: {campaign?.valor_meta && Number(campaign?.valor_meta)}{" "}
              pontos
            </Typography>
          </HeaderContainer>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <Container {...props}>
          <Typography component="h1">Regulamento</Typography>
          {isLoading && (
            <Box display={"flex"} justifyContent="center" mt={4}>
              <CircularProgress disableShrink />
            </Box>
          )}

          <BoxContainerRegulation
            dangerouslySetInnerHTML={{
              __html: data?.data[0].texto_regulamento || "",
            }}
          />
          {isFetched && (
            <>
              <SimpleCheckBox
                label="Eu li e aceito os termos"
                control={control}
                name="accept"
              />
              <Button disabled={!watch("accept")} onClick={onSubmit}>
                Prosseguir
              </Button>
            </>
          )}
        </Container>
      )}
    />
  );
}
