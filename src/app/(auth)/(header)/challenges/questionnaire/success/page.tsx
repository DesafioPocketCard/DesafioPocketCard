"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Header } from "@/components/Layout";
import { Divider, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import { ChallengeCard } from "@/components/Cards";
import Image from "next/image";
import novocoins from "@/assets/images/20novocoins.png";
import { Container, HeaderContainer, Title, TitleContainer } from "./styles";
import { CardList } from "../../styles";

interface IProps {
  params: {
    id: string;
  };
}

export default function Success({ params }: IProps) {
  const router = useRouter();

  const challenges = [
    {
      name: "Desafio Casa do Poço",
      expiration_date: "2024-08-20",
      points: 20,
      photo:
        "https://images.pexels.com/photos/290275/pexels-photo-290275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Desafio Casa do Poço",
      expiration_date: "2024-08-20",
      points: 20,
      photo:
        "https://images.pexels.com/photos/290275/pexels-photo-290275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Desafio Casa do Poço",
      expiration_date: "2024-08-20",
      points: 20,
      photo:
        "https://images.pexels.com/photos/290275/pexels-photo-290275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Desafio Casa do Poço",
      expiration_date: "2024-08-20",
      points: 20,
      photo:
        "https://images.pexels.com/photos/290275/pexels-photo-290275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Desafio Casa do Poço",
      expiration_date: "2024-08-20",
      points: 20,
      photo:
        "https://images.pexels.com/photos/290275/pexels-photo-290275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Desafio Casa do Poço",
      expiration_date: "2024-08-20",
      points: 20,
      photo:
        "https://images.pexels.com/photos/290275/pexels-photo-290275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Desafio Casa do Poço",
      expiration_date: "2024-08-20",
      points: 20,
      photo:
        "https://images.pexels.com/photos/290275/pexels-photo-290275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <TitleContainer {...props}>
          <Header />
          <HeaderContainer>
            <Typography component="h1">Você ganhou:</Typography>
            <Image
              alt="novocoins"
              src={novocoins.src}
              width={204}
              height={144}
            />
            <Typography>20 novocoins</Typography>
          </HeaderContainer>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <Container {...props}>
          <Title>
            <Typography>
              Você acertou 2 das 2 questões e acumulou mais 20 pontos para sua
              carteira digital.
            </Typography>
            <Divider />
            <Typography component="h1">Mais Desafios</Typography>
          </Title>

          <CardList component="ul">
            {challenges.map(({ name, expiration_date, points, photo }) => (
              <ChallengeCard
                key={name}
                title={name}
                expiration={expiration_date}
                points={points}
                photo={photo}
                onClick={() => router.push(`/challenges/questionnaire/${name}`)}
              />
            ))}
          </CardList>
        </Container>
      )}
    />
  );
}
