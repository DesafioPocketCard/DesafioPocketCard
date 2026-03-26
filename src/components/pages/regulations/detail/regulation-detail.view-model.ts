"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { RegulationService } from "@/resources/services/regulation/regulation.service";
import { CampaignService } from "@/resources/services/campaign/campaign.service";
import { CAMPAIGN_QUERY_KEYS } from "@/resources/services/campaign/campaign.query-key";
import { APP_ROUTES } from "@/routes/routes";
import { toast } from "sonner";

export function useRegulationDetailViewModel() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const id = params.id as string;
  const [termsChecked, setTermsChecked] = useState(false);

  const { data: campaignsData } = useQuery({
    queryKey: CAMPAIGN_QUERY_KEYS.list(),
    queryFn: () => CampaignService.get(),
    staleTime: 5 * 60 * 1000,
  });

  const campaign = campaignsData?.data.find((c) => c.id_campanha === id);

  const {
    data: regulationData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["regulation", id],
    queryFn: () => RegulationService.get(id),
    enabled: !!id,
    staleTime: 60 * 60 * 1000,
  });

  const regulation = regulationData?.data?.[0]?.texto_regulamento;

  const acceptMutation = useMutation({
    mutationFn: () => RegulationService.accept(id),
    onSuccess: (res) => {
      toast.success(res.message || "Regulamento aceito!");
      queryClient.invalidateQueries({ queryKey: CAMPAIGN_QUERY_KEYS.all });
      router.push(APP_ROUTES.GOALS(id));
    },
    onError: () => {
      toast.error("Erro ao aceitar o regulamento.");
    },
  });

  const goBack = () => router.back();

  const isAccepted = campaign?.sn_regulamento_aceito === "S";

  return {
    campaign,
    regulation,
    isLoading,
    isError,
    isAccepted,
    isAccepting: acceptMutation.isPending,
    handleAccept: () => acceptMutation.mutate(),
    termsChecked,
    setTermsChecked,
    goBack,
  };
}
