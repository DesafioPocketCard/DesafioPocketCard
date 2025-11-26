"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Header } from "@/components/Layout";
import { Box, CircularProgress, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import { BoxContainerRegulation, TitleContainer } from "./styles";
import { Container, HeaderContainer } from "./styles";
import { ArrowBackIos } from "@mui/icons-material";
import { Button } from "@/components/Buttons";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import RegulationService from "@/services/regulation.service";
import CampaignService from "@/services/campaign.service";
import { useNotifier } from "@/hooks";

interface IProps {
  params: {
    id: string;
  };
}

export default function Regulation({ params }: IProps) {
  const router = useRouter();
  const theme = useTheme();
  const { data: campaigns } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => CampaignService.get(),
  });

  const { data, isLoading, } = useQuery({
    queryKey: ["regulation"],
    queryFn: () => RegulationService.get(params.id),
  });

  const campaign = campaigns?.data.find(
    (item) => item.id_campanha === params.id
  );

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
            style={{
              lineHeight: "28px",
              fontFamily: theme.fonts?.["pf-body"]?.fontFamily || "inherit",
            }}
            dangerouslySetInnerHTML={{
              __html: data?.data[0].texto_regulamento || "",
            }}
          />
          
          <Button variant="outlined" onClick={router.back}>
            Voltar
          </Button>
        </Container>
      )}
    />
  );
}
