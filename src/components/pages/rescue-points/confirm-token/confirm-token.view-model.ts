"use client";

import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CartService } from "@/resources/services/cart/cart.service";
import { APP_ROUTES } from "@/routes/routes";
import { toast } from "sonner";

const confirmTokenSchema = z.object({
  token: z.string().min(6, "Digite os 6 dígitos"),
});

type FormData = z.infer<typeof confirmTokenSchema>;

export function useConfirmTokenViewModel() {
  const router = useRouter();
  const params = useParams();
  const idResgate = Number(params.id);

  const [criticalError, setCriticalError] = useState<string | null>(null);

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(confirmTokenSchema),
    defaultValues: { token: "" },
  });

  const tokenValue = watch("token");

  const confirmMutation = useMutation({
    mutationFn: (token: string) =>
      CartService.confirmarResgate(idResgate, token),
    onSuccess: (res) => {
      toast.success(res.message || "Resgate confirmado com sucesso!");
      router.push(APP_ROUTES.MY_REWARDS);
    },
    onError: (error: any) => {
      const msg = error.message || "Erro de validação";
      const isCritical =
        msg.toLowerCase().includes("devolvidos") ||
        msg.toLowerCase().includes("falha no resgate");

      if (isCritical) {
        setCriticalError(msg);
      } else {
        toast.error(msg);
        setValue("token", "");
      }
    },
  });

  useEffect(() => {
    if (tokenValue.length === 6) {
      confirmMutation.mutate(tokenValue);
    }
  }, [tokenValue]);

  const onSubmit = (data: FormData) => {
    confirmMutation.mutate(data.token);
  };

  const handleCloseCriticalError = () => {
    setCriticalError(null);
    router.push(APP_ROUTES.CART);
  };

  const goBack = () => router.back();

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading: confirmMutation.isPending,
    criticalError,
    handleCloseCriticalError,
    tokenValue,
    goBack,
  };
}
