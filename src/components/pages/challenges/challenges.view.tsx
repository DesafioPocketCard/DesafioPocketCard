import React from "react";
import { ArrowLeft, Search, Lightbulb } from "lucide-react";
import { useChallengesViewModel } from "./challenges.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import { ChallengeCard } from "@/components/shared/cards/challenge-card/challenge-card.view";
import Button from "@/components/shared/buttons/button/button.component";

type Props = ReturnType<typeof useChallengesViewModel>;

export function ChallengesView({ challenges, searchTerm, setSearchTerm, handleChallengeClick, goBack }: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goBack} className="bg-white/20 text-white rounded-xl">
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Desafios</h1>
          </div>
          <p className="text-sm text-white/80 max-w-[300px]">
            Participe dos desafios exclusivos e acumule mais pontos.
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="relative flex items-center">
          <Search size={20} className="absolute left-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar desafio..."
            className="w-full py-[14px] px-4 pl-12 bg-white border border-gray-200 rounded-2xl text-[15px] transition-all shadow-sm focus:outline-none focus:border-primary-400 focus:shadow-[0_0_0_4px_var(--color-primary-50)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {challenges.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-400 text-center">
            <Lightbulb size={48} className="text-gray-200" />
            <p>Nenhum desafio encontrado.</p>
          </div>
        )}

        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5">
          {challenges.map((challenge) => (
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
    </RadialWrapper>
  );
}
