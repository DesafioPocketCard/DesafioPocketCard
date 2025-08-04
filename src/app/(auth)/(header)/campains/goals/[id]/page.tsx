"use client";

import React from "react";
import {
  Description,
  Divider,
  GridContainer,
  HeaderContainer,
  ProgressBar,
  ProgressLabel,
} from "./styles";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { BackButton } from "@/components/Buttons";
import { useRouter } from "next/navigation";
import { GridCard } from "@/components/Cards";
import { useQuery } from "@tanstack/react-query";
import GoalService from "@/services/goal.service";
import CampaignService from "@/services/campaign.service";
import { useSession } from "next-auth/react";

interface IProps {
  params: {
    id: string;
  };
}

export default function Goals({ params }: IProps) {
  const router = useRouter();
  const theme = useTheme();
  const session = useSession();

  const { data: campaigns } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => CampaignService.get(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["goals", params.id],
    queryFn: () => GoalService.get(params.id),
  });

  const campaign = campaigns?.data.find(
    (item) => item.id_campanha === params.id
  );

  return (
    <Box>
      <HeaderContainer>
        <BackButton onClick={() => router.back()} />
        <Box>
          <Typography component="h1">
            Olá,{" "}
            <Typography component="span">{session.data?.user.nome}</Typography>.
          </Typography>
          <Typography>{session.data?.user.email}</Typography>
        </Box>
      </HeaderContainer>
      <Divider />
      <ProgressLabel>Metas atingidas</ProgressLabel>
      <ProgressBar percentage={Number(campaign?.perc_realizado)}>
        <Box>
          <Box className="container" />
          <Box className="progress" />
        </Box>
        <Typography component="h1">{campaign?.perc_realizado}%</Typography>
      </ProgressBar>

      <Description>
        Veja abaixo quais as missões disponíveis que devem ser realizadas para
        crescimento do seu sucesso.
      </Description>
      {isLoading && (
        <Box display={"flex"} justifyContent="center" mt={4}>
          <CircularProgress disableShrink />
        </Box>
      )}
      <GridContainer>
        {data?.data.map((goal, index) => (
          <Box key={index}>
            <GridCard
              title={goal.descricao_meta}
              icon={goal.nome_arquivo}
              onClick={() =>
                router.push(
                  `/campains/goal-detail/${goal.id_campanha_meta}/${params.id}`
                )
              }
              disabled={goal.qtd_realizada === goal.valor_meta}
              progress={Number(goal.perc_realizado)}
              sx={{
                padding: "8px 20px",
                borderBottom: "1px dashed " + theme.palette.secondary[300],
                borderRight:
                  index % 2 === 0
                    ? "1px dashed " + theme.palette.secondary[300]
                    : "none",
                borderTop:
                  index <= 1
                    ? "1px dashed " + theme.palette.secondary[300]
                    : "none",
              }}
            />
          </Box>
        ))}
      </GridContainer>
    </Box>
  );
}
