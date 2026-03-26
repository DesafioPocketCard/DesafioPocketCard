import React from "react";
import { ArrowLeft, RefreshCw, Target, Award, TrendingUp } from "lucide-react";
import { useGoalsViewModel } from "./goals.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";
import { GoalItem } from "./components/goal-item/goal-item.view";

type Props = ReturnType<typeof useGoalsViewModel>;

export function GoalsView({ campaign, goals, isLoading, isError, refetch, handleGoalClick, goBack }: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goBack} className="bg-white/20 text-white rounded-xl">
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Minhas Metas</h1>
          </div>
          {campaign && (
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-white/90">{campaign.nome_campanha}</p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full w-fit text-xs font-semibold text-white border border-white/20">
                  <Target size={14} />
                  <span>{goals.length} metas</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full w-fit text-xs font-semibold text-white border border-white/20">
                  <Award size={14} />
                  <span>Meta: {campaign.valor_meta} pts</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full w-fit text-xs font-semibold text-white border border-white/20">
                  <TrendingUp size={14} />
                  <span>{campaign.perc_realizado}% realizado</span>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
            <RefreshCw className="animate-spin text-primary-500" size={40} />
            <p>Carregando suas metas...</p>
          </div>
        )}
        {isError && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center text-gray-500">
            <p>Não foi possível carregar as metas desta campanha.</p>
            <Button onClick={() => refetch()} leftIcon={<RefreshCw size={18} />}>Tentar novamente</Button>
          </div>
        )}
        {!isLoading && !isError && goals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-400 text-center">
            <Target size={48} className="text-gray-300" />
            <p>Nenhuma meta encontrada para esta campanha.</p>
          </div>
        )}
        <div className="flex flex-col gap-4">
          {goals.map((goal) => (
            <GoalItem key={goal.id_campanha_meta} goal={goal} onClick={() => handleGoalClick(goal)} />
          ))}
        </div>
      </div>
    </RadialWrapper>
  );
}
