"use client";

import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/routes/routes";

const MOCK_MORE_CHALLENGES = [
  {
    name: "Desafio Mobilidade",
    expiration_date: "2024-09-01",
    points: 35,
    photo:
      "https://images.pexels.com/photos/159201/bicycle-cycling-road-bike-sport-159201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Quiz Sustentabilidade",
    expiration_date: "2024-08-30",
    points: 15,
    photo:
      "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export function useQuestionnaireSuccessViewModel() {
  const router = useRouter();

  const handleChallengeClick = (name: string) => {
    router.push(`/challenges/questionnaire/${name}`);
  };

  const goToHome = () => router.push(APP_ROUTES.HOME);

  return {
    moreChallenges: MOCK_MORE_CHALLENGES,
    handleChallengeClick,
    goToHome,
    score: 20,
    correctCount: 2,
    totalCount: 2,
  };
}
