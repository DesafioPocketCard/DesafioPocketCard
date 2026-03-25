"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Gift, ChevronRight } from "lucide-react";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";
import { APP_ROUTES } from "@/routes/routes";

interface IProps {
  params: {
    id: string;
  };
}

export default function Success({ params }: IProps) {
  void params;
  const router = useRouter();

  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(APP_ROUTES.RESCUE_POINTS)}
              className="bg-white/20 text-white rounded-xl"
            >
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Resgate</h1>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 rounded-[28px] bg-success-50 text-success-600 flex items-center justify-center border border-success-200 shadow-sm">
            <CheckCircle2 size={44} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-black text-gray-900">Parabéns!</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Seu resgate foi solicitado. Aguarde o prazo de até 48h para
              processarmos o pedido.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          <Button
            onClick={() => router.push(APP_ROUTES.RESCUE_POINTS)}
            size="lg"
            leftIcon={<Gift size={20} />}
            className="shadow-xl"
          >
            Continuar resgatando
          </Button>
          <Button
            onClick={() => router.push(APP_ROUTES.HOME)}
            variant="outline"
            size="lg"
            rightIcon={<ChevronRight size={18} />}
          >
            Voltar ao início
          </Button>
        </div>
      </div>
    </RadialWrapper>
  );
}
