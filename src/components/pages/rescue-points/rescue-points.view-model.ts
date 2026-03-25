"use client";

import { useQuery, useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GiftService } from "@/resources/services/gift/gift.service";
import { GIFT_QUERY_KEYS } from "@/resources/services/gift/gift.query-key";
import { APP_ROUTES } from "@/routes/routes";

export function useRescuePointsViewModel() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [categoriesQuery, featuredQuery] = useQueries({
    queries: [
      {
        queryKey: GIFT_QUERY_KEYS.categories(),
        queryFn: () => GiftService.getCategories(),
        staleTime: 60 * 60 * 1000,
      },
      {
        queryKey: GIFT_QUERY_KEYS.featured(),
        queryFn: () => GiftService.getHigh(),
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  const { data: giftsData, isLoading: isLoadingGifts } = useQuery({
    queryKey: GIFT_QUERY_KEYS.list(selectedCategory || undefined),
    queryFn: () => GiftService.get(selectedCategory || ""),
    enabled: !!selectedCategory,
    staleTime: 5 * 60 * 1000,
  });

  const categories = categoriesQuery.data?.data || [];
  const featuredGifts = featuredQuery.data?.data || [];
  const gifts = giftsData?.data || [];

  const handleProductClick = (productId: string) => {
    router.push(APP_ROUTES.PRODUCT_DETAIL(productId));
  };

  const goToCart = () => router.push(APP_ROUTES.CART);
  const goBack = () => router.back();

  return {
    categories,
    featuredGifts,
    gifts,
    selectedCategory,
    setSelectedCategory,
    isLoading:
      categoriesQuery.isLoading || featuredQuery.isLoading || isLoadingGifts,
    handleProductClick,
    goToCart,
    goBack,
  };
}
