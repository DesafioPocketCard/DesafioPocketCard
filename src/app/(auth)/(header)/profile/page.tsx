"use client";

import React, { useEffect, useState } from "react";
import {
  Informations,
  Insights,
  ProfileInfo,
  ProfileImageContainer,
} from "./styles";
import RadialWrapper from "@/components/Containers/RadialWrapper";

import camera from "@/assets/icons/camera.svg";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import user from "@/assets/icons/user_blank.svg";

import Image from "next/image";
import { Divider, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import { ProfileTag } from "./components";
import { TextField } from "@/components/FormFields";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Button } from "@/components/Buttons";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import ProfileService from "@/services/profile.service";
import RegexOf from "@/config/regex";
import { cleanUpMask, formatWithMask } from "@/utils/mask";
import { useNotifier } from "@/hooks";
import { IProfileForm } from "@/types/Profile";

export default function Notifications() {
  const notify = useNotifier();
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const profileQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => ProfileService.get(),
  });

  const uploadPictureMutation = useMutation({
    mutationFn: (data: FormData) => ProfileService.updatePicture(data),
    onSuccess(res) {
      notify(res.message, "success");
      profileQuery.refetch().then(() => {
        update({
          ...session,
          user: {
            ...session!.user,
            nome: profileQuery.data?.data[0].nome_participante,
            foto_perfil: profileQuery.data?.data[0].nome_arquivo,
          },
        });
      });
    },
    onError() {
      notify(
        "Ocorreu um erro ao atualizar a foto de perfil, por favor tente novamente.",
        "error"
      );
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: IProfileForm) => ProfileService.put(data),
    onSuccess(res) {
      notify(res.message, "success");
      setIsEditing(false);
      profileQuery.refetch().then(() => {
        update({
          ...session,
          user: {
            ...session!.user,
            nome: profileQuery.data?.data[0].nome_participante,
          },
        });
      });
    },
    onError() {
      notify(
        "Ocorreu um erro ao atualizar o perfil, por favor tente novamente.",
        "error"
      );
    },
  });
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset({
      bio: profileQuery.data?.data[0].bio_participante,
      name: profileQuery.data?.data[0].nome_participante,
      email: profileQuery.data?.data[0].email_participante,
      phone: formatWithMask({
        text: profileQuery.data?.data[0].telefone_participante,
        mask: RegexOf.phone,
      }).masked,
      job: profileQuery.data?.data[0].cargo_participante,
    });
  }, [profileQuery.data]);

  const onSubmit = handleSubmit((data) => {
    updateProfileMutation.mutate({
      nome_participante: data.name,
      telefone_participante: cleanUpMask(data.phone),
      bio_participante: data.bio,
    });
  });

  const InsightsSkeleton = (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: "8px" }}
          height={100}
        />
      </Grid>
      <Grid item xs={4}>
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: "8px" }}
          height={100}
        />
      </Grid>
      <Grid item xs={4}>
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: "8px" }}
          height={100}
        />
      </Grid>
    </Grid>
  );

  const handleUploadPicture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg, image/jpg";

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (!file) return;

      // Validação opcional de tipo
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        notify(
          "Formato inválido. Selecione um arquivo PNG, JPG ou JPEG.",
          "warning"
        );
        return;
      }

      const formData = new FormData();
      formData.append("foto_perfil", file);

      uploadPictureMutation.mutate(formData);
    };

    input.click();
  };

  const isNotEditing = !isEditing;

  return (
    <RadialWrapper
      fillSize
      HeaderComponent={(props) => (
        <ProfileImageContainer {...props}>
          {profileQuery.data?.data[0].nome_arquivo ? (
            <Image
              alt="Foto de perfil"
              src={profileQuery.data?.data[0].nome_arquivo}
              unoptimized
              layout="fill"
            />
          ) : (
            <Image src={user} alt="Foto de perfil" layout="fill" />
          )}
          <IconButton onClick={() => router.back()}>
            <Image src={arrowLeft} alt="voltar" width={24} height={24} />
          </IconButton>
          <IconButton
            onClick={handleUploadPicture}
            disabled={uploadPictureMutation.isPending}
          >
            <Image src={camera} alt="câmera" width={24} height={24} />
          </IconButton>
          <Typography component="h1">
            {profileQuery.data?.data[0].nome_participante}
          </Typography>
          <Typography component="span">
            {profileQuery.data?.data[0].cargo_participante}
          </Typography>
        </ProfileImageContainer>
      )}
      BodyComponent={(props) => (
        <ProfileInfo component="section" {...props}>
          <Insights>
            {profileQuery.isLoading ? (
              InsightsSkeleton
            ) : (
              <>
                <ProfileTag
                  title="Metas Atingidas"
                  count={profileQuery.data?.data[0].metas_atingidas || 0}
                />
                <Divider orientation="vertical" />
                <ProfileTag
                  title="Desafios Concluídos"
                  count={profileQuery.data?.data[0].desafios_concluidos || 0}
                />
                <Divider orientation="vertical" />
                <ProfileTag
                  title="Dias Ativos"
                  count={profileQuery.data?.data[0].dias_ativos || 0}
                />
              </>
            )}
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
            <TextField label="E-mail" name="email" control={control} disabled />
            <TextField
              label="Telofone"
              name="phone"
              control={control}
              disabled={isNotEditing}
              mask={RegexOf.phone}
            />
            <TextField
              name="job"
              label="Cargo"
              control={control}
              multiline
              disabled
            />

            <Button
              variant="text"
              onClick={!isEditing ? () => setIsEditing(true) : onSubmit}
            >
              {isEditing ? "Salvar" : "Alterar dados"}
            </Button>
          </Informations>
        </ProfileInfo>
      )}
    />
  );
}
