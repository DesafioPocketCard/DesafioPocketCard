"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/FormFields";
import { useTheme } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/services";
import { useMutation } from "@tanstack/react-query";
import useNotifier from "@/hooks/useNotifier";
import { FormContainer } from "./styles";
import { LockOutlined, MailOutline } from "@mui/icons-material";
import { Button } from "@/components/Buttons";

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
  const theme = useTheme();
  const notify = useNotifier();
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
          notify(error.message, "error");
        },
      });
    } else {
      notify(
        "Desculpe, mas seu dispositivo é incompatível com essa versão.",
        "error",
      );
    }
  }

  return (
    <FormContainer
      component="form"
      noValidate
      onSubmit={handleSubmit(handleSigIn)}
    >
      <TextField
        name="email"
        control={control}
        placeholder="Digite o email"
        leftIcon={<MailOutline htmlColor={theme.palette.primary[400]} />}
      />
      <TextField
        name="senha"
        control={control}
        password
        placeholder="Digite a senha"
        leftIcon={<LockOutlined htmlColor={theme.palette.primary[400]} />}
      />
      <Button
        variant="contained"
        type="submit"
        loading={sigInMutation.isPending}
      >
        Entrar
      </Button>
    </FormContainer>
  );
}
