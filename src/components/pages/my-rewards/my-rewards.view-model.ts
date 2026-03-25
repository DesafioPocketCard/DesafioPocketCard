"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MyRewardsService } from "@/resources/services/my-rewards/my-rewards.service";
import { CartService } from "@/resources/services/cart/cart.service";
import { IMyReward } from "@/resources/services/my-rewards/my-rewards.type";
import { APP_ROUTES } from "@/routes/routes";
import { useState } from "react";
import { toast } from "sonner";

export function useMyRewardsViewModel() {
  const router = useRouter();
  const [selectedReward, setSelectedReward] = useState<IMyReward | null>(null);

  const {
    data: rewardsData,
    isLoading: isLoadingRewards,
    isError: isErrorRewards,
    refetch: refetchRewards,
  } = useQuery({
    queryKey: ["my-rewards"],
    queryFn: () => MyRewardsService.getAll(),
    staleTime: 2 * 60 * 1000,
  });

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.get(),
  });

  const rewards = rewardsData?.data || [];
  const itemsInCart = (cartData as any)?.data?.sacola?.itens?.length || 0;
  const userPoints = (cartData as any)?.data?.total_pontos_usuario || 0;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Código copiado!");
  };

  const goBack = () => router.back();
  const goToCart = () => router.push(APP_ROUTES.CART);
  const openDetail = (reward: IMyReward) => setSelectedReward(reward);
  const closeDetail = () => setSelectedReward(null);

  return {
    rewards,
    itemsInCart,
    userPoints,
    isLoadingRewards,
    isErrorRewards,
    selectedReward,
    handleCopy,
    goBack,
    goToCart,
    openDetail,
    closeDetail,
    refetchRewards,
  };
}
