import React from "react";
import { ArrowLeft, MapPin, Navigation } from "lucide-react";
import { useCheckInViewModel } from "./check-in.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";

type Props = ReturnType<typeof useCheckInViewModel>;

export function CheckInView({ handleCheckIn, goBack }: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={goBack}
              className="bg-white/20 text-white rounded-xl"
            >
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Check-in</h1>
          </div>
          <p className="text-sm text-white/80 max-w-[300px]">Visitação e presença em tempo real.</p>
        </div>
      }
    >
      <div className="flex flex-col">
        <div className="bg-white p-8 rounded-[32px] border border-gray-200 flex flex-col gap-8 shadow-sm">
          <div className="text-center">
            <h2 className="text-xl font-extrabold text-gray-900 leading-tight">Fazer Check-in</h2>
            <p className="text-[15px] text-gray-500 mt-2 leading-relaxed px-4">
              Realize o check-in utilizando a sua localização atual para validar
              sua meta.
            </p>
          </div>

          <div className="w-full h-48 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
              <MapPin size={32} className="text-primary-500 animate-bounce" />
            </div>
            <p className="text-sm font-semibold text-gray-400">Buscando sinal de GPS...</p>
          </div>

          <div className="pt-4">
            <Button
              fullWidth
              size="lg"
              onClick={handleCheckIn}
              leftIcon={<Navigation size={20} />}
              className="shadow-xl shadow-primary-200"
            >
              Fazer Check-in Agora
            </Button>
          </div>
        </div>
      </div>
    </RadialWrapper>
  );
}
