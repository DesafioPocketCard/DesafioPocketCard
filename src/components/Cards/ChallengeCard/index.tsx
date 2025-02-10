"use client";

import React from "react";
import { CardContainer } from "./styles";
import Image from "next/image";
import { IChallengeCardProps } from "./types";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/Buttons";

export default function ChallengeCard({
  title,
  expiration,
  points,
  photo,
  onClick,
}: IChallengeCardProps) {
  return (
    <CardContainer component="li">
      <Image
        alt="Desafio"
        src={photo}
        unoptimized
        width={100}
        height={100}
      ></Image>
      <Typography component="span">{title}</Typography>
      <Typography component="span">
        Expira em:{" "}
        {format(parseISO(expiration), "dd 'de' MMMM", {
          locale: ptBR,
        })}
      </Typography>
      <Typography component="span">Pontos: {points}pts</Typography>
      <Button
        sx={{
          height: "30px",
        }}
        onClick={onClick}
      >
        Responder
      </Button>
    </CardContainer>
  );
}
