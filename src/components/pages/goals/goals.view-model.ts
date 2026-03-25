"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { GoalService } from "@/resources/services/goal/goal.service";
import { GOAL_QUERY_KEYS } from "@/resources/services/goal/goal.query-key";
import { CampaignService } from "@/resources/services/campaign/campaign.service";
import { CAMPAIGN_QUERY_KEYS } from "@/resources/services/campaign/campaign.query-key";
import { APP_ROUTES } from "@/routes/routes";
import { IGoal } from "@/resources/services/goal/goal.type";

export function useGoalsViewModel() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.id as string;

  // Fetching all campaigns to find the current one (simplification since there's no single campaign detail endpoint in the initial code)
  const { data: campaignsData } = useQuery({
    queryKey: CAMPAIGN_QUERY_KEYS.list(),
    queryFn: () => CampaignService.get(),
    staleTime: 5 * 60 * 1000,
  });

  const campaign = campaignsData?.data.find(
    (c) => c.id_campanha === campaignId,
  );

  const {
    data: goalsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: GOAL_QUERY_KEYS.list(campaignId),
    queryFn: () => GoalService.get(campaignId),
    staleTime: 3 * 60 * 1000,
  });

  const goals = goalsData?.data || [];

  const handleGoalClick = (goal: IGoal) => {
    router.push(APP_ROUTES.GOAL_DETAIL(goal.id_campanha_meta, campaignId));
  };

  const goBack = () => router.back();

  return {
    campaign,
    goals,
    isLoading,
    isError,
    refetch,
    handleGoalClick,
    goBack,
  };
}
