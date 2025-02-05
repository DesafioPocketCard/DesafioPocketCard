"use client";

import React from "react";
import { CardList, Divider, HeaderContainer } from "./styles";
import { Box, Typography } from "@mui/material";
import { BackButton, Button } from "@/components/Buttons";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/FormFields";
import Image from "next/image";
import search from "@/assets/icons/search.svg";
import { GoalsCard } from "@/components/Cards";
import { useRouter } from "next/navigation";

const challenges = [
  {
    name: "Aumentando as visitas",
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

export default function Campaigns() {
  const router = useRouter();
  const { control } = useForm();

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
        {challenges.map(({ name, expiration_date, points, photo }) => (
          <GoalsCard
            key={name}
            title={name}
            expiration={expiration_date}
            points={points}
            photo={photo}
            onClick={() => router.push(`/campains/regulation/${name}`)}
          />
        ))}
      </CardList>
    </Box>
  );
}
