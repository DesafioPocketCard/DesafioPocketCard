"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AuthService } from "@/resources/services/auth/auth.service";
import { ISignInData, signinSchema } from "./signin.model";
import { APP_ROUTES } from "@/routes/routes";
import { toast } from "sonner";

export function useSigninViewModel() {
  const router = useRouter();

  const form = useForm<ISignInData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
      router.push(APP_ROUTES.HOME);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao realizar login.");
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
}
