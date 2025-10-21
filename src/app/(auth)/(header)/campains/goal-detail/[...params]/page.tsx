"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Header } from "@/components/Layout";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { MainCard, ProgressBar, Title, TitleContainer } from "./styles";
import { Container, HeaderContainer } from "./styles";
import { ArrowBackIos, LocationOnOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { GridContainer } from "../../goals/[id]/styles";
import { GridCard } from "@/components/Cards";
import { Button } from "@/components/Buttons";
import { useQuery } from "@tanstack/react-query";
import GoalService from "@/services/goal.service";

interface IProps {
  params: { params: string[] };
}

export default function GoalsDetail({ params }: IProps) {
  const router = useRouter();
  const theme = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ["goals", params.params[1]],
    queryFn: () => GoalService.get(params.params[1]),
  });

  const goal = data?.data.find(
    (item) => item.id_campanha_meta === params.params[0]
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
              {goal?.descricao_meta || "Carregando..."}
            </Typography>
            <Typography>
              Meta: {goal?.valor_meta} {goal?.descricao_meta_app}
            </Typography>
          </HeaderContainer>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <Container {...props}>
          <MainCard container>
            <Grid item xs={12}>
              <Typography component="h4">
                Desempenho: <span>{goal?.qtd_realizada}</span>
              </Typography>
            </Grid>
          </MainCard>
          <MainCard container>
            <Grid item xs={6} component="div">
              <Typography component="h1">
                {goal?.perc_realizado || 0}%
              </Typography>
              <Typography component="p">Concluído</Typography>
              <ProgressBar percentage={Number(goal?.perc_realizado) || 0}>
                <Box className="container" />
                <Box className="progress" />
              </ProgressBar>
            </Grid>
            <Grid item xs={6} component="div">
              <Typography component="h1">
                {goal?.qtd_pontos && Number(goal?.qtd_pontos)}
              </Typography>
              <Typography component="p">Pontos</Typography>
              {/* <Button
                disabled
                startIcon={
                  <LocationOnOutlined htmlColor="white" fontSize="small" />
                }
                component="button"
                onClick={() =>
                  router.push(
                    `/campains/check-in/${params.params[0]}/${params.params[1]}`
                  )
                }
              >
                check-in
              </Button> */}
            </Grid>
          </MainCard>

          <Title>Outras metas em andamento</Title>

          {isLoading && (
            <Box display={"flex"} justifyContent="center" mt={4}>
              <CircularProgress disableShrink />
            </Box>
          )}
          <GridContainer>
            {data?.data
              .filter((item) => item.id_campanha_meta !== params.params[0])
              .map((goal, index) => (
                <Box key={index}>
                  <GridCard
                    title={goal.descricao_meta}
                    icon={goal.nome_arquivo}
                    onClick={() =>
                      router.push(
                        `/campains/goal-detail/${goal.id_campanha_meta}/${params.params[1]}`
                      )
                    }
                    disabled={goal.qtd_realizada === goal.valor_meta}
                    progress={Number(goal.perc_realizado)}
                    sx={{
                      padding: "8px 20px",
                      borderBottom:
                        "1px dashed " + theme.palette.secondary?.["300"] ||
                        "#959595",
                      borderRight:
                        index % 2 === 0
                          ? "1px dashed " + theme.palette.secondary?.["300"] ||
                            "#959595"
                          : "none",
                      borderTop:
                        index <= 1
                          ? "1px dashed " + theme.palette.secondary?.["300"] ||
                            "#959595"
                          : "none",
                    }}
                  />
                </Box>
              ))}
          </GridContainer>
        </Container>
      )}
    />
  );
}
