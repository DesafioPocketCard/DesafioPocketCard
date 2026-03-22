import React from "react";
import { ChevronRight } from "lucide-react";
import { IGoal } from "@/resources/services/goal/goal.type";

interface Props {
  goal: IGoal;
  onClick: () => void;
}

export function GoalItem({ goal, onClick }: Props) {
  const percentage = parseFloat(goal.perc_realizado || "0");

  return (
    <div
      className="flex items-center gap-4 p-5 bg-white rounded-[20px] border border-gray-200 cursor-pointer transition-all hover:border-primary-200 hover:shadow-sm active:scale-[0.98]"
      onClick={onClick}
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

      <div className="flex-1 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h4 className="text-[15px] font-bold text-gray-800 leading-tight">{goal.descricao_meta}</h4>
          <p className="text-xs font-medium text-gray-500">
            {goal.qtd_realizada} de {goal.valor_meta} realizados
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <span className="text-xs font-bold text-primary-600 whitespace-nowrap">{goal.perc_realizado}%</span>
        </div>
      </div>

      <ChevronRight size={20} className="text-gray-300" />
    </div>
  );
}
