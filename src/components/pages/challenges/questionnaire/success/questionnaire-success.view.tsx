import React from "react";
import { CheckCircle2, Trophy, Home } from "lucide-react";
import { useQuestionnaireSuccessViewModel } from "./questionnaire-success.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";
import { ChallengeCard } from "@/components/shared/cards/challenge-card/challenge-card.view";
import { motion } from "framer-motion";

type Props = ReturnType<typeof useQuestionnaireSuccessViewModel>;

export function QuestionnaireSuccessView({
  moreChallenges,
  handleChallengeClick,
  goToHome,
  score,
  correctCount,
  totalCount,
}: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col items-center gap-6 text-center py-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-white text-success-500 rounded-[28px] flex items-center justify-center shadow-lg"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-black text-white leading-tight">Desafio Concluído!</h1>
            <div className="bg-white/10 px-6 py-2 rounded-full border border-white/20 flex items-center justify-center gap-2 text-white">
              <Trophy size={20} className="text-yellow-400" />
              <span className="text-base font-semibold">
                Você ganhou <strong className="font-black text-yellow-300">{score} pontos</strong>
              </span>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 flex flex-col items-center gap-6 shadow-sm">
          <p className="text-center text-[15px] text-gray-600 leading-relaxed font-medium">
            Parabéns! Você acertou{" "}
            <strong className="text-gray-900">
              {correctCount} de {totalCount}
            </strong>{" "}
            questões e os pontos já foram adicionados à sua carteira.
          </p>
          <Button
            onClick={goToHome}
            variant="ghost"
            leftIcon={<Home size={18} />}
            size="sm"
            className="text-primary-600 font-bold"
          >
            Ir para o início
          </Button>
        </div>

        <div className="h-px bg-gray-100 w-full" />

        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-black text-gray-800 px-1">Continue Acumulando</h3>
          <div className="flex flex-col gap-4">
            {moreChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.name}
                title={challenge.name}
                expiration={challenge.expiration_date}
                points={challenge.points}
                photo={challenge.photo}
                onClick={() => handleChallengeClick(challenge.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </RadialWrapper>
  );
}
