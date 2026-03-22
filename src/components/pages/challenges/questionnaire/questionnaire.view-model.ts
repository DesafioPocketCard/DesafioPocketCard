"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "Qual o principal benefício da Casa do Poço?",
    answers: [
      { id: 1, label: "Redução de custos operacionais" },
      { id: 2, label: "Aumento na velocidade de entrega" },
      { id: 3, label: "Melhoria na qualidade de vida local" },
      { id: 4, label: "Expansão para novos mercados" },
    ],
    videoURL: "https://player.vimeo.com/video/1049448346",
  },
  {
    id: 2,
    question: "Quantas unidades foram inauguradas este ano?",
    answers: [
      { id: 1, label: "Mais de 10 unidades" },
      { id: 2, label: "Cerca de 50 unidades" },
      { id: 3, label: "Apenas 2 unidades" },
      { id: 4, label: "Nenhuma unidade ainda" },
    ],
    videoURL: "https://player.vimeo.com/video/1049448346",
  },
];

export function useQuestionnaireViewModel() {
  const router = useRouter();
  const params = useParams();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<
    string | number | undefined
  >();

  const currentQuestion = MOCK_QUESTIONS[currentStep];
  const isLastStep = currentStep === MOCK_QUESTIONS.length - 1;

  const handleNext = () => {
    if (!selectedAnswer) return;

    if (isLastStep) {
      router.push("/challenges/questionnaire/success");
    } else {
      setCurrentStep((prev) => prev + 1);
      setSelectedAnswer(undefined);
    }
  };

  const goBack = () => router.back();

  return {
    currentQuestion,
    currentStep,
    totalSteps: MOCK_QUESTIONS.length,
    selectedAnswer,
    setSelectedAnswer,
    handleNext,
    goBack,
    isLastStep,
  };
}
