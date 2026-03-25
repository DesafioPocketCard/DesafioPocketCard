"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { GoalService } from "@/resources/services/goal/goal.service";
import { GOAL_QUERY_KEYS } from "@/resources/services/goal/goal.query-key";
import { APP_ROUTES } from "@/routes/routes";

export function useGoalDetailViewModel() {
  const router = useRouter();
  const params = useParams();

  // params.params[0] is goalId, params.params[1] is campaignId
  const goalId = (params.params as string[])?.[0];
  const campaignId = (params.params as string[])?.[1];

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: GOAL_QUERY_KEYS.list(campaignId),
    queryFn: () => GoalService.get(campaignId),
    enabled: !!campaignId,
    staleTime: 5 * 60 * 1000,
  });

  const goals = data?.data || [];
  const currentGoal = goals.find((g) => g.id_campanha_meta === goalId);
  const otherGoals = goals.filter((g) => g.id_campanha_meta !== goalId);

  const handleGoalClick = (id: string) => {
    router.push(APP_ROUTES.GOAL_DETAIL(id, campaignId));
  };

  const goBack = () => router.back();

  return {
    currentGoal,
    otherGoals,
    isLoading,
    isError,
    handleGoalClick,
    goBack,
    refetch,
  };
}
