"use client";

import { useHomeViewModel } from "./home.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import {  Target, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

type Props = ReturnType<typeof useHomeViewModel>;

export function HomeView({
  user,
  isLoading,
  navigateToCampaigns,
}: Props) {
  if (isLoading) return null;

  return (
    <RadialWrapper
      fillSize
      header={
        <div className="py-2 sm:py-10 flex flex-col gap-4 animate-in">
          <div className="flex items-center gap-2 px-1 py-0.5 rounded-full bg-white/10 w-fit backdrop-blur-md">
             <span className="text-[10px] text-white/80 font-black uppercase tracking-widest pr-2">👋 Olá, bem-vindo!</span>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium text-white/80">Olá,</p>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight text-white drop-shadow-sm">
              {user?.nome.split(" ")[0]}
            </h1>
            <p className="text-sm font-medium text-white/60 mt-2 flex items-center gap-2">
               <span className="size-1.5 rounded-full bg-success-400 animate-pulse" />
               Sua jornada começa aqui.
            </p>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-10 sm:gap-12 animate-in duration-700">
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Comece agora</h2>
            <div className="h-px flex-1 bg-border/40 mx-4 hidden sm:block" />
          </div>

          <button
            onClick={navigateToCampaigns}
            className="group relative w-full text-left transition-all active:scale-[0.98] outline-none"
          >
            {/* <div className="absolute -inset-0.5 bg-linear-to-r from-primary-500 to-primary-300 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" /> */}
            <Card className="relative py-2 overflow-hidden border border-border/50 hover:border-primary/20 bg-white p-1 transition-all rounded-xl shadow-sm hover:shadow-xl">
               <div className="flex items-center gap-5 p-4">
                  <div className="relative size-16 rounded-xl bg-linear-to-br from-primary-50 to-primary-100/50 flex items-center justify-center text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner border border-primary-200/50">
                    <Target size={32} strokeWidth={2.5} />
                    <div className="absolute -top-1 -right-1 size-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg animate-bounce group-hover:animate-none">
                      !
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                       <h3 className="text-xl font-black text-gray-900 tracking-tight">Campanhas</h3>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Conclua seus desafios e suba de nível.</p>
                  </div>
                  <div className="size-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(97,67,179,0.4)]">
                    <ChevronRight size={20} strokeWidth={3} />
                  </div>
               </div>
               
               {/* Shimmer effect overlay */}
               <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
               
            </Card>
          </button>

        </div>
      </div>
    </RadialWrapper>
  );
}
