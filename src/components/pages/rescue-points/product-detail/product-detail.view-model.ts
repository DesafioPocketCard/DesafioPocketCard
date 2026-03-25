"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { GiftService } from "@/resources/services/gift/gift.service";
import { CartService } from "@/resources/services/cart/cart.service";
import { GIFT_QUERY_KEYS } from "@/resources/services/gift/gift.query-key";
import { APP_ROUTES } from "@/routes/routes";
import { toast } from "sonner";

export function useProductDetailViewModel() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const id = params.id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: GIFT_QUERY_KEYS.detail(id),
    queryFn: () => GiftService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const product = data?.data?.[0];

  const addToCartMutation = useMutation({
    mutationFn: () => CartService.adicionarItem(id, 1),
    onSuccess: () => {
      toast.success("Produto adicionado à sacola!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push(APP_ROUTES.CART);
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao adicionar produto.");
    },
  });

  const goBack = () => router.back();
  const goToCart = () => router.push(APP_ROUTES.CART);

  return {
    product,
    isLoading,
    isError,
    isAdding: addToCartMutation.isPending,
    addToCart: () => addToCartMutation.mutate(),
    goBack,
    goToCart,
  };
}
