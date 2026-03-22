"use client";

import React from "react";
import { ArrowLeft, RefreshCw, Search, Inbox } from "lucide-react";
import { useCampaignsViewModel } from "./campaigns.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import CampaignCard from "@/components/shared/cards/campaign-card/campaign-card.component";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = ReturnType<typeof useCampaignsViewModel>;

export function CampaignsView({
  campaigns,
  isLoading,
  isError,
  refetch,
  handleCampaignClick,
  goBack,
}: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-6 sm:gap-8 animate-in delay-100">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={goBack} 
              className="bg-white/10 hover:bg-white/20 text-white rounded-2xl size-12"
            >
              <ArrowLeft size={24} />
            </Button>
            <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center text-white/40">
               <span className="text-xs font-black uppercase tracking-tighter">{campaigns?.length || 0}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black text-white tracking-tight sm:text-5xl">Campanhas</h1>
            <p className="text-base text-white/70 font-medium max-w-[320px] leading-relaxed">
              Escolha seu próximo desafio e conquiste metas incríveis.
            </p>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-8 min-h-[400px]">
        {isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-6 animate-pulse">
            <div className="relative">
              <RefreshCw className="animate-spin text-primary-200" size={64} strokeWidth={1} />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="size-6 bg-primary rounded-full" />
              </div>
            </div>
            <p className="text-lg font-black text-gray-400 tracking-tight uppercase text-xs">Atualizando campanhas…</p>
          </div>
        )}

        {isError && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-6 text-center max-w-sm mx-auto">
            <div className="size-20 rounded-3xl bg-destructive/5 flex items-center justify-center text-destructive mb-2">
               <RefreshCw size={40} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase text-sm">Ops! Algo deu errado</h3>
              <p className="text-sm font-medium text-muted-foreground">Não conseguimos conectar ao servidor para buscar suas campanhas.</p>
            </div>
            <Button 
              onClick={() => refetch()} 
              variant="outline"
              className="mt-4 font-black uppercase tracking-widest text-[10px]"
              leftIcon={<RefreshCw size={14} />}
            >
              Tentar novamente
            </Button>
          </div>
        )}

        {!isLoading && !isError && campaigns.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-6 text-center max-w-sm mx-auto">
            <div className="size-24 rounded-full bg-gray-50 flex items-center justify-center text-gray-200">
               <Inbox size={64} strokeWidth={1} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-black text-gray-900 tracking-tight lowercase first-letter:uppercase">Nenhuma campanha por enquanto</h3>
              <p className="text-sm font-medium text-muted-foreground">Fique atento! Novas campanhas podem surgir em breve.</p>
            </div>
          </div>
        )}

        {!isLoading && !isError && campaigns.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {campaigns.map((campaign, idx) => (
              <div 
                key={campaign.id_campanha} 
                style={{ animationDelay: `${idx * 100}ms` }} 
                className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
              >
                <CampaignCard
                  title={campaign.nome_campanha}
                  expiration={campaign.data_final}
                  points={campaign.valor_meta}
                  photo={campaign.nome_arquivo}
                  onClick={() => handleCampaignClick(campaign)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </RadialWrapper>
  );
}
