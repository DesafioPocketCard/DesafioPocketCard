import React from "react";
import { CheckCircle2, Home, Flag } from "lucide-react";
import { useCheckInSuccessViewModel } from "./check-in-success.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";
import { motion } from "framer-motion";

type Props = ReturnType<typeof useCheckInSuccessViewModel>;

export function CheckInSuccessView({ handleGoHome, goToCampaigns }: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col items-center gap-6 text-center py-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="w-24 h-24 rounded-[32px] bg-white text-primary-600 flex items-center justify-center shadow-xl"
          >
            <CheckCircle2 size={64} />
          </motion.div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black text-white leading-tight">Check-in Realizado!</h1>
            <p className="text-base text-white/80 font-medium">
              Sua visita foi validada com sucesso.
            </p>
          </div>
        </div>
      }
    >
      <div className="flex flex-col">
        <div className="bg-white p-10 rounded-[40px] border border-gray-200 flex flex-col items-center gap-8 shadow-sm">
          <div className="flex flex-col items-center gap-1 bg-primary-50 px-8 py-5 rounded-3xl border border-primary-100 shadow-inner">
            <span className="text-4xl font-black text-primary-600">+10</span>
            <span className="text-xs font-bold text-primary-800/60 uppercase tracking-widest">pontos acumulados</span>
          </div>

          <div className="text-center px-4">
            <p className="text-[17px] text-gray-600 leading-relaxed font-medium">
              Parabéns por mais um passo rumo à sua meta! Continue acompanhando
              seu desempenho nas campanhas ativas.
            </p>
          </div>

          <div className="w-full flex flex-col gap-3 pt-4">
            <Button
              fullWidth
              size="lg"
              onClick={handleGoHome}
              leftIcon={<Home size={20} />}
              className="shadow-xl shadow-primary-200"
            >
              Voltar ao Início
            </Button>
            <Button
              fullWidth
              variant="ghost"
              onClick={goToCampaigns}
              leftIcon={<Flag size={20} />}
              className="text-primary-600"
            >
              Minhas Campanhas
            </Button>
          </div>
        </div>
      </div>
    </RadialWrapper>
  );
}
