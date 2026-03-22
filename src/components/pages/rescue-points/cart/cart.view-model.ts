"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CartService } from "@/resources/services/cart/cart.service";
import { APP_ROUTES } from "@/routes/routes";
import { toast } from "sonner";

export function useCartViewModel() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.get(),
    staleTime: 2 * 60 * 1000,
  });

  const cartData = data?.data;
  const saldoUsuario = (data as any)?.data?.total_pontos_usuario || 0;
  const items = (cartData as any)?.sacola?.itens || [];
  const totalCart = (cartData as any)?.sacola?.total_pontos_sacola || 0;

  const removeMutation = useMutation({
    mutationFn: (id: string) => CartService.remove(id),
    onSuccess: () => {
      toast.success("Produto removido!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao remover.");
    },
  });

  const resgateMutation = useMutation({
    mutationFn: () => CartService.solicitarResgate(),
    onSuccess: (resData) => {
      toast.success("Resgate solicitado!");
      router.push(APP_ROUTES.CONFIRM_TOKEN(String(resData.data.id_resgate)));
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao solicitar resgate.");
    },
  });

  const handleRemove = (id: string) => removeMutation.mutate(id);
  const handleCheckout = () => resgateMutation.mutate();
  const goBack = () => router.back();
  const goToStore = () => router.push(APP_ROUTES.RESCUE_POINTS);

  return {
    items,
    totalCart,
    saldoUsuario,
    isLoading,
    isError,
    isRemoving: removeMutation.isPending,
    isProcessing: resgateMutation.isPending,
    handleRemove,
    handleCheckout,
    goBack,
    goToStore,
    refetch,
  };
}
