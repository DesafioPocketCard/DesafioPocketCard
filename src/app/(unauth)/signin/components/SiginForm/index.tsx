"use client";

import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import TextField from "@/components/shared/fields/text-field/text-field.component";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { NotifierContext } from "@/contexts/NotifierContext";
import { INotifierActionKind } from "@/helpers/Notifier/types";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const siginFormSchema = z
  .object({
    email: z.string({
      required_error: "O e-mail obrigatório",
    }),
    senha: z.string({
      required_error: "A senha é obrigatória",
    }),
  })
  .required();

type ISiginFormSchema = z.infer<typeof siginFormSchema>;

const isMobileDevice = (): boolean => {
  const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;
  const mobileRegex =
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent);
};

export default function SiginForm() {
  const [, notify] = useContext(NotifierContext);
  const router = useRouter();

  const { sigIn, getToken } = useAuth();

  const sigInMutation = useMutation({ mutationFn: sigIn });

  const { control, handleSubmit } = useForm<ISiginFormSchema>({
    resolver: zodResolver(siginFormSchema),
  });

  async function handleSigIn(values: ISiginFormSchema) {
    if (isMobileDevice()) {
      sigInMutation.mutate(values, {
        onSuccess() {
          router.push("/");
        },
        onError(error) {
          notify({ type: INotifierActionKind.SHOW_NOTIFICATION, payload: { message: error.message, severity: "error" } });
        },
      });
    } else {
      notify({
        type: INotifierActionKind.SHOW_NOTIFICATION,
        payload: {
          message: "Desculpe, mas seu dispositivo é incompatível com essa versão.",
          severity: "error",
        },
      });
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleSigIn)} className="flex flex-col gap-4">
      <TextField
        name="email"
        control={control}
        placeholder="Digite o email"
        leftIcon={<Mail size={20} className="text-primary-500" />}
      />
      <TextField
        name="senha"
        control={control}
        type="password"
        placeholder="Digite a senha"
        leftIcon={<Lock size={20} className="text-primary-500" />}
      />
      <Button
        type="submit"
        isLoading={sigInMutation.isPending}
        size="lg"
        className="mt-4 w-full"
      >
        Entrar
      </Button>
    </form>
  );
}
