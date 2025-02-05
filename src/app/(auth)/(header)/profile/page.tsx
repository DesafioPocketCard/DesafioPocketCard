"use client";

import React, { useState } from "react";
import {
  Informations,
  Insights,
  ProfileInfo,
  ProfileImageContainer,
} from "./styles";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import photo from "@/assets/images/woman-photo.jpg";
import camera from "@/assets/icons/camera.svg";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import Image from "next/image";
import { Divider, IconButton, Typography } from "@mui/material";
import { ProfileTag } from "./components";
import { TextField } from "@/components/FormFields";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Button } from "@/components/Buttons";
import { useRouter } from "next/navigation";

export default function Notifications() {
  const session = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const { control } = useForm({
    defaultValues: {
      bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis rerum impedit similique veniam pariatur voluptatibus sint officia fugit ullam libero assumenda commodi nam iure, odio iste eveniet molestias, recusandae eligendi!",
      name: session.data?.user.nome,
      email: session.data?.user.email,
    },
  });

  const isNotEditing = !isEditing;

  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <ProfileImageContainer {...props}>
          <Image src={photo} alt="Foto de perfil" layout="fill" />
          <IconButton onClick={() => router.back()}>
            <Image src={arrowLeft} alt="voltar" width={24} height={24} />
          </IconButton>
          <IconButton>
            <Image src={camera} alt="câmera" width={24} height={24} />
          </IconButton>
          <Typography component="h1">{session.data?.user.nome}</Typography>
          <Typography component="span">Corretora de imóveis</Typography>
        </ProfileImageContainer>
      )}
      BodyComponent={(props) => (
        <ProfileInfo component="section" {...props}>
          <Insights>
            <ProfileTag title="Metas Atingidas" count={28} />
            <Divider orientation="vertical" />
            <ProfileTag title="Desafios Concluídos" count={12} />
            <Divider orientation="vertical" />
            <ProfileTag title="Dias Ativos" count={43} />
          </Insights>
          <Divider />
          <Informations>
            <Typography component="h2">Bio</Typography>
            <TextField
              name="bio"
              control={control}
              multiline
              disabled={isNotEditing}
            />
            <TextField
              label="Nome"
              name="name"
              control={control}
              disabled={isNotEditing}
            />
            <TextField
              label="E-mail"
              name="email"
              control={control}
              disabled={isNotEditing}
            />
            <TextField
              label="Telofone"
              name="cell_phone"
              control={control}
              disabled={isNotEditing}
            />
            <Button
              variant="text"
              onClick={() => setIsEditing((isEditing) => !isEditing)}
            >
              {isEditing ? "Salvar" : "Alterar dados"}
            </Button>
          </Informations>
        </ProfileInfo>
      )}
    />
  );
}
