import React from "react";
import { ArrowLeft, Trophy, TrendingUp, RefreshCw } from "lucide-react";
import { useGoalDetailViewModel } from "./goal-detail.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";

type Props = ReturnType<typeof useGoalDetailViewModel>;

export function GoalDetailView({ currentGoal, otherGoals, isLoading, isError, handleGoalClick, goBack, refetch }: Props) {
  const percentage = Number(currentGoal?.perc_realizado) || 0;

  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goBack} className="bg-white/20 text-white rounded-xl">
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Detalhe da Meta</h1>
          </div>
          {currentGoal && (
            <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              {currentGoal.nome_arquivo ? (
                <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-white rounded-xl shadow-lg ring-4 ring-white/10">
                  <img
                    src={currentGoal.nome_arquivo}
                    alt={currentGoal.descricao_meta}
                    className="w-12 h-12 object-contain rounded-2xl"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-white/20 rounded-xl shadow-lg ring-4 ring-white/10">
                  <Trophy className="text-white" size={24} />
                </div>
              )}
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <h2 className="text-lg font-bold text-white leading-snug truncate">{currentGoal.descricao_meta}</h2>
                <p className="text-sm font-medium text-white/80">
                  Meta: {currentGoal.valor_meta} {currentGoal.unidade_medida || currentGoal.descricao_meta_app}
                </p>
              </div>
            </div>
          )}
        </div>
      }
    >
      <div className="flex flex-col">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="animate-spin text-primary-500" size={40} />
          </div>
        )}
        {isError && (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-gray-500">
            <p>Erro ao carregar detalhes da meta.</p>
            <Button onClick={() => refetch()} size="sm">Tentar novamente</Button>
          </div>
        )}

        {currentGoal && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-[20px] border border-gray-100 flex flex-col gap-2 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400 tracking-wide">
                  <TrendingUp size={18} className="text-blue-500" />
                  <span>Realizado</span>
                </div>
                <div className="text-2xl font-extrabold text-gray-900">{currentGoal.qtd_realizada}</div>
              </div>
              <div className="bg-white p-5 rounded-[20px] border border-gray-100 flex flex-col gap-2 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400 tracking-wide">
                  <Trophy size={18} className="text-yellow-500" />
                  <span>Pontos</span>
                </div>
                <div className="text-2xl font-extrabold text-gray-900">{currentGoal.qtd_pontos || 0}</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col gap-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-bold text-gray-700">Status da Meta</span>
                <span className="text-lg font-extrabold text-primary-600">{percentage}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              <p className="text-[13px] text-gray-500 text-center">
                {percentage >= 100 ? "Você atingiu sua meta! Parabéns!" : `Faltam ${(100 - percentage).toFixed(0)}% para concluir.`}
              </p>
            </div>

            {otherGoals.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-bold text-gray-700 pl-2">Outras metas da campanha</h3>
                <div className="flex flex-col gap-3">
                  {otherGoals.map((goal) => (
                    <button
                      key={goal.id_campanha_meta}
                      className="bg-white p-5 rounded-2xl border border-gray-200 flex gap-4 text-left transition-all hover:bg-gray-50 active:scale-[0.98] cursor-pointer"
                      onClick={() => handleGoalClick(goal.id_campanha_meta)}
                    >
                        {goal.nome_arquivo ? (
                          <img
                            src={goal.nome_arquivo}
                            alt={goal.descricao_meta}
                            className="w-16 h-16 object-contain"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-full" />
                        )}
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-700">{goal.descricao_meta}</span>
                          <span className="text-xs font-bold text-primary-600">{goal.qtd_pontos} pts</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-400 rounded-full"
                            style={{ width: `${Math.min(Number(goal.perc_realizado), 100)}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </RadialWrapper>
  );
}
