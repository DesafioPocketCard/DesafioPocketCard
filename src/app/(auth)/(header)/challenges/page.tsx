"use client";

import React from "react";
import { CardList, Divider, HeaderContainer } from "./styles";
import { Typography } from "@mui/material";
import { BackButton, Button } from "@/components/Buttons";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/FormFields";
import Image from "next/image";
import search from "@/assets/icons/search.svg";
import { ChallengeCard } from "@/components/Cards";
import { useRouter } from "next/navigation";

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

export default function Challenges() {
  const router = useRouter();
  const { control } = useForm();

  return (
    <>
      <HeaderContainer mt={4}>
        <BackButton onClick={() => router.back()} />
        <Typography component="h1">Desafios</Typography>
        <Typography>
          Responda aos desafios, acumule pontos e troque por prêmios.
        </Typography>
        <TextField
          placeholder="Busque um desafio"
          name="search"
          control={control}
          leftIcon={<Image alt="Buscar" src={search} width={24} height={24} />}
        />
        <Button>Buscar</Button>
      </HeaderContainer>
      <Divider />
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
    </>
  );
}
