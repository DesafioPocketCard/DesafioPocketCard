"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CampaignService } from "@/resources/services/campaign/campaign.service";
import { CAMPAIGN_QUERY_KEYS } from "@/resources/services/campaign/campaign.query-key";
import { APP_ROUTES } from "@/routes/routes";
import { ICampaign } from "@/resources/services/campaign/campaign.type";
import { useState } from "react";

export function useRegulationsListViewModel() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: CAMPAIGN_QUERY_KEYS.list(),
    queryFn: () => CampaignService.get(),
    staleTime: 5 * 60 * 1000,
  });

  const campaigns = data?.data || [];

  const filteredCampaigns = campaigns.filter((c) =>
    c.nome_campanha.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCampaignClick = (campaign: ICampaign) => {
    router.push(APP_ROUTES.REGULATION(campaign.id_campanha));
  };

  const goBack = () => router.back();

  return {
    campaigns: filteredCampaigns,
    isLoading,
    isError,
    searchTerm,
    setSearchTerm,
    refetch,
    handleCampaignClick,
    goBack,
  };
}
