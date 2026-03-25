import React from "react";
import { ArrowLeft, Search, RefreshCw, FileText } from "lucide-react";
import { useRegulationsListViewModel } from "./regulations-list.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import CampaignCard from "@/components/shared/cards/campaign-card/campaign-card.component";
import Button from "@/components/shared/buttons/button/button.component";

type Props = ReturnType<typeof useRegulationsListViewModel>;

export function RegulationsListView({ campaigns, isLoading, isError, searchTerm, setSearchTerm, refetch, handleCampaignClick, goBack }: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goBack} className="bg-white/20 text-white rounded-xl">
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Regulamentos</h1>
          </div>
          <p className="text-sm text-white/80 max-w-[320px]">
            Escolha uma campanha para visualizar o regulamento detalhado.
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="relative flex items-center">
          <Search size={20} className="absolute left-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar campanha..."
            className="w-full py-[14px] px-4 pl-12 bg-white border border-gray-200 rounded-2xl text-[15px] transition-all shadow-sm focus:outline-none focus:border-primary-400 focus:shadow-[0_0_0_4px_var(--color-primary-50)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500">
            <RefreshCw className="animate-spin text-primary-500" size={40} />
            <p>Carregando campanhas...</p>
          </div>
        )}
        {isError && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center text-gray-500">
            <p>Não foi possível carregar os dados.</p>
            <Button onClick={() => refetch()} size="sm">Tentar novamente</Button>
          </div>
        )}
        {!isLoading && campaigns.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-400 text-center">
            <FileText size={48} className="text-gray-300" />
            <p>Nenhum regulamento encontrado.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id_campanha}
              title={campaign.nome_campanha}
              expiration={campaign.data_final}
              points={campaign.valor_meta}
              photo={campaign.nome_arquivo}
              onClick={() => handleCampaignClick(campaign)}
              isRegulation={true}
            />
          ))}
        </div>
      </div>
    </RadialWrapper>
  );
}
