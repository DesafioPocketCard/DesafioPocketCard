"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CampaignService } from "@/resources/services/campaign/campaign.service";
import { CAMPAIGN_QUERY_KEYS } from "@/resources/services/campaign/campaign.query-key";
import { APP_ROUTES } from "@/routes/routes";
import { ICampaign } from "@/resources/services/campaign/campaign.type";

export function useCampaignsViewModel() {
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: CAMPAIGN_QUERY_KEYS.list(),
    queryFn: () => CampaignService.get(),
    staleTime: 5 * 60 * 1000,
  });

  const campaigns = data?.data || [];

  const handleCampaignClick = (campaign: ICampaign) => {
    if (campaign.sn_regulamento_aceito === "S") {
      router.push(APP_ROUTES.GOALS(campaign.id_campanha));
    } else {
      router.push(APP_ROUTES.REGULATION(campaign.id_campanha));
    }
  };

  const goBack = () => router.back();

  return {
    campaigns,
    isLoading,
    isError,
    refetch,
    handleCampaignClick,
    goBack,
  };
}
