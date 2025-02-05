"use client";

import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Header } from "@/components/Layout";
import { IconButton, Typography } from "@mui/material";
import React from "react";
import { TitleContainer } from "./styles";
import { Container, HeaderContainer } from "./styles";
import { ArrowBackIos } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import SimpleCheckBox from "@/components/FormFields/SimpleCheckBox";
import { Button } from "@/components/Buttons";
import { useRouter } from "next/navigation";

interface IProps {
  params: {
    id: string;
  };
}

export default function Regulation({ params }: IProps) {
  const router = useRouter();

  const { control } = useForm();

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
            <Typography component="h1">Visitas ao Stand</Typography>
            <Typography>Meta: 200 visitas</Typography>
          </HeaderContainer>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <Container {...props}>
          <Typography component="h1">Regulamento</Typography>

          <Typography component="h2">Descrição da missão</Typography>
          <Typography component="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt perferendis animi
            quisquam labore, quibusdam itaque nisi possimus voluptate tenetur, ab voluptatibus
            corrupti rem iste quod quasi autem! Natus, corporis alias. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Soluta repellat rem id! Nam quisquam non obcaecati dolorem
            quis? At, pariatur molestias! Cumque quisquam corporis ut ipsa blanditiis vitae minus
            enim?
          </Typography>
          <Typography component="h2">Objetivos</Typography>
          <Typography component="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt perferendis animi
            quisquam labore, quibusdam itaque nisi possimus voluptate tenetur, ab voluptatibus
            corrupti rem iste quod quasi autem! Natus, corporis alias. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Soluta repellat rem id! Nam quisquam non obcaecati dolorem
            quis? At, pariatur molestias! Cumque quisquam corporis ut ipsa blanditiis vitae minus
            enim?
          </Typography>
          <Typography component="li">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere harum corporis quae iste
            cupiditate corrupti deleniti, earum voluptatem exercitationem amet placeat numquam
            minus, quisquam animi veniam delectus, porro illo ratione.
          </Typography>
          <Typography component="li">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere harum corporis quae iste
            cupiditate corrupti deleniti, earum voluptatem exercitationem amet placeat numquam
            minus, quisquam animi veniam delectus, porro illo ratione.
          </Typography>
          <SimpleCheckBox label="Eu li e aceito os termos" control={control} name="accept" />
          <Button onClick={() => router.push(`/campains/goals/${params.id}`)}>Prosseguir</Button>
        </Container>
      )}
    />
  );
}
