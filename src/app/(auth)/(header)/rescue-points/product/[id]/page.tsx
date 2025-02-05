"use client";

import React from "react";
import { ProfileInfo, ProfileImageContainer } from "./styles";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import photo from "@/assets/images/apple_watch.png";
import shoppingbag from "@/assets/icons/shopping-bag.svg";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import Image from "next/image";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Buttons";

type Props = {
  params: {
    id: string;
  };
};

export default function Product({ params: { id } }: Props) {
  const router = useRouter();

  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <ProfileImageContainer {...props}>
          <Image src={photo} alt="Foto de perfil" layout="fill" />
          <IconButton onClick={() => router.back()}>
            <Image src={arrowLeft} alt="voltar" width={24} height={24} />
          </IconButton>
          <IconButton onClick={() => router.push(`/rescue-points/cart`)}>
            <Image src={shoppingbag} alt="shoppingbag" width={24} height={24} />
          </IconButton>
        </ProfileImageContainer>
      )}
      BodyComponent={(props) => (
        <ProfileInfo component="section" {...props}>
          <Typography component="h1">
            Apple Watch Se Gps - Caixa Meia-noite Alum. 40Mm
          </Typography>
          <Typography className="description">
            Apple Watch Se Gps - Caixa Meia-noite De Alumínio 40 Mm - Pulseira
            Esportiva Meia-noite - Padrão é o celular ideal para aqueles que
            gostam de criar e compartilhar conteúdos, inspirando outras pessoas
            através de suas histórias.
            <Box>
              <Typography component="li">
                Cras cursus sem nec diam gravida maximus.
              </Typography>
              <Typography component="li">
                Duis luctus enim ut porttitor auctor.
              </Typography>
              <Typography component="li">
                Aliquam hendrerit lectus id consectetur bibendum.
              </Typography>
              <Typography component="li">
                Morbi eu tortor ornare, congue lorem ac.
              </Typography>
            </Box>
          </Typography>
          <Typography className="rescue-points">Resgate: 30 pontos</Typography>
          <Button onClick={() => router.push("/rescue-points/cart")}>
            Adicionar à sacola
          </Button>
        </ProfileInfo>
      )}
    />
  );
}
