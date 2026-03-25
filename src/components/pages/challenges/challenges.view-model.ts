"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const MOCK_CHALLENGES = [
  {
    name: "Desafio Casa do Poço",
    expiration_date: "2024-08-20",
    points: 20,
    photo:
      "https://images.pexels.com/photos/290275/pexels-photo-290275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
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

export function useChallengesViewModel() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChallenges = MOCK_CHALLENGES.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleChallengeClick = (name: string) => {
    router.push(`/challenges/questionnaire/${name}`);
  };

  const goBack = () => router.back();

  return {
    challenges: filteredChallenges,
    searchTerm,
    setSearchTerm,
    handleChallengeClick,
    goBack,
  };
}
