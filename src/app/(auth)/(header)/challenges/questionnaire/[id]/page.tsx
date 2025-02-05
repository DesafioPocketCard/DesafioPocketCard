"use client";

import React from "react";
import RadialWrapper from "@/components/Containers/RadialWrapper";
import { Header } from "@/components/Layout";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Container, HeaderContainer, TitleContainer } from "./styles";
import CardSelect from "@/components/Cards/CardSelect";
import { BackButton, Button } from "@/components/Buttons";
import { useNotifier } from "@/hooks";

interface IProps {
  params: {
    id: string;
  };
}

export default function Questionnaire({ params }: IProps) {
  const router = useRouter();
  const notifier = useNotifier();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const questions = [
    {
      id: 1,
      question:
        "Assita o video abaixo e responda quantas unidades consectet adipiscing?",
      answers: [
        { id: 1, answer: "Lorem ipsum dolor sit amet", correct: false },
        { id: 2, answer: "Lorem ipsum dolor sit amet", correct: true },
        { id: 3, answer: "Lorem ipsum dolor sit amet", correct: false },
        { id: 4, answer: "Lorem ipsum dolor sit amet", correct: false },
      ],
      videoURL: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    },
    {
      id: 2,
      question:
        "Lorem ipsum dolor sit amet, consecte adipiscing elit. Ut vehicula, ligula vitae molestie lobortis, nisi tellus sollicitudin dolor, nec elemen?",
      answers: [
        { id: 1, answer: "Lorem ipsum dolor sit amet", correct: true },
        { id: 2, answer: "Lorem ipsum dolor sit amet", correct: false },
        { id: 3, answer: "Lorem ipsum dolor sit amet", correct: false },
        { id: 4, answer: "Lorem ipsum dolor sit amet", correct: false },
      ],
      videoURL: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    },
  ];

  const handleClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      router.push("/challenges/questionnaire/success");
    }
  };

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
              Teste de conhecimento Casa do Poço
            </Typography>
            <Typography>Vale: 20 pontos</Typography>
          </HeaderContainer>
        </TitleContainer>
      )}
      BodyComponent={(props) => (
        <Container {...props}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%", // 16:9 aspect ratio
              overflow: "hidden",
              borderRadius: 2, // Optional: Add rounded corners
              boxShadow: 2, // Optional: Add a shadow
            }}
          >
            <iframe
              src="https://player.vimeo.com/video/1049448346?h=fb6cd77dc5&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
              width="1920"
              height="1080"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              title="Estorno da Venda"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            ></iframe>
          </Box>
          <CardSelect
            title={
              <Typography>
                <Typography
                  component="span"
                  fontWeight="bold"
                >{`${currentQuestion + 1}) `}</Typography>
                {questions[currentQuestion].question}
              </Typography>
            }
            options={questions[currentQuestion].answers}
            optionLabelKey="answer"
            optionValueKey="id"
            onChange={(op) => console.log(op)}
          />
          <Button onClick={handleClick}>
            {currentQuestion < questions.length - 1 ? "Próximo" : "Finalizar"}
          </Button>
        </Container>
      )}
    />
  );
}
