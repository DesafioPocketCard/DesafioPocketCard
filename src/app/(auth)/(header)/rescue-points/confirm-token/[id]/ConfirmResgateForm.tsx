"use client";

import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Typography, useTheme } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import useNotifier from "@/hooks/useNotifier";
import { Button } from "@/components/Buttons";
import { useMutation, useQuery } from "@tanstack/react-query";
import CartService from "@/services/cart.service";
import OTP from "@/components/FormFields/OPTField"; 
import { FormContainer } from "./styles";

// Esquema de validação com Zod
const confirmTokenSchema = z
  .object({
    token: z.string({
      required_error: "O código é obrigatório",
    }).min(6, "O código deve ter 6 dígitos"),
  })
  .required();

type IConfirmForm = z.infer<typeof confirmTokenSchema>;

interface IProps {
  idResgate: number;
}

export default function ConfirmResgateForm({ idResgate }: IProps) {
  const theme = useTheme();
  const notify = useNotifier();
  const router = useRouter();
  const hasFired = useRef(false); // Evita disparos duplos

    const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.get(),
  });

    const resgateMutation = useMutation({
      mutationFn: () => CartService.solicitarResgate(),
      onSuccess: (responseData) => {

          notify("Resgate solicitado com sucesso!", "success");
          router.push(`/rescue-points/confirm-token/${responseData.id_resgate}`);
      },
      onError: (error: any) => {
          notify(error.message || "Erro ao solicitar resgate.", "error");
      }
    });

  // Mutação para confirmar o resgate
  const confirmMutation = useMutation({
    mutationFn: (token: string) => CartService.confirmarResgate(idResgate, token),
    onSuccess: (res) => {
      notify(res.message, "success");
      // Redireciona para a home ou lista de pedidos após sucesso
      router.push("/rescue-points"); 
    },
    onError: (error: any) => {
      notify(error.message || "Erro ao confirmar código", "error");
      hasFired.current = false; // Permite tentar novamente se der erro
      reset({ token: "" }); // Limpa o campo
    },
  });



  const { control, watch, reset, handleSubmit } = useForm<IConfirmForm>({
    resolver: zodResolver(confirmTokenSchema),
    defaultValues: {
      token: "",
    },
  });

  const token = watch("token");

  const isSubmitting = confirmMutation.isPending;

  // Efeito "Mágico": Envia automaticamente ao preencher 6 dígitos
  useEffect(() => {
    if (token && token.length === 6 && !hasFired.current) {
      hasFired.current = true;
      confirmMutation.mutate(token);
    }
  }, [token, confirmMutation]);

  // Função para envio manual (botão)
  const onSubmit = (values: IConfirmForm) => {
      if(!hasFired.current) {
          hasFired.current = true;
          confirmMutation.mutate(values.token);
      }
  };

  return (
    <FormContainer
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h6" color="primary" textAlign="center" fontWeight="bold">
        Código de Segurança
      </Typography>
      
      <Typography variant="body2" textAlign="center" color="textSecondary">
        Insira o código de 6 dígitos que enviamos para o seu e-mail para finalizar o resgate.
      </Typography>

      {/* Reutilizando o componente de OTP do seu projeto */}
      <OTP
        control={control}
        name="token"
        label="" // Label vazio pois já temos o título acima
        length={6}
        separator={" "}
        disabled={isSubmitting}
      />

      {isSubmitting && (
        <Typography 
            variant="caption" 
            align="center" 
            sx={{ display: 'block', mt: 1, fontWeight: 'bold', color: theme.palette.primary.main }}
        >
            Validando código... aguarde.
        </Typography>
      )}

<Button
        type="submit"
        variant="contained"
        loading={isSubmitting}
        disabled={token.length < 6 }
        sx={{ marginTop: 2 }}
      >
        {confirmMutation.isPending ? "Validando..." : "Confirmar Código"}
      </Button>
    </FormContainer>
  );
}