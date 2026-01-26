"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { 
    Typography, 
    useTheme, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions 
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import useNotifier from "@/hooks/useNotifier";
import { Button } from "@/components/Buttons";
import { useMutation } from "@tanstack/react-query";
import CartService from "@/services/cart.service";
import OTP from "@/components/FormFields/OPTField"; 
import { FormContainer } from "./styles";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
  const hasFired = useRef(false);

  // Estado para controlar o Popup de Erro Crítico
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });

  const confirmMutation = useMutation({
    mutationFn: (token: string) => CartService.confirmarResgate(idResgate, token),
    onSuccess: (res) => {
      notify(res.message, "success");
      router.push("/my-rewards"); 
    },
    onError: (error: any) => {
      const msg = error.message || "Erro desconhecido";
      
      // Verifica se é o erro de transação que devolve itens
      const isCriticalError = msg.toLowerCase().includes("devolvidos") || 
                              msg.toLowerCase().includes("falha no resgate");

      if (isCriticalError) {
          // ABRE O MODAL e espera o usuário clicar
          setErrorModal({ 
              open: true, 
              message: msg 
          });
      } else {
          // Erro simples (código errado), apenas avisa no Toast
          notify(msg, "error");
          hasFired.current = false; 
          reset({ token: "" }); 
      }
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

  useEffect(() => {
    if (token && token.length === 6 && !hasFired.current) {
      hasFired.current = true;
      confirmMutation.mutate(token);
    }
  }, [token, confirmMutation]);

  const onSubmit = (values: IConfirmForm) => {
      if(!hasFired.current) {
          hasFired.current = true;
          confirmMutation.mutate(values.token);
      }
  };

  // Ação ao clicar no botão do Modal
  const handleCloseCriticalError = () => {
      setErrorModal({ open: false, message: "" });
      // Redireciona para o carrinho para tentar de novo
      router.push("/rescue-points/cart");
  };

  return (
    <>
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

          <OTP
            control={control}
            name="token"
            label=""
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
                Validando transação... aguarde um momento.
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={token.length < 6 || isSubmitting}
            sx={{ marginTop: 2 }}
          >
            {isSubmitting ? "Processando..." : "Confirmar Código"}
          </Button>
        </FormContainer>

        {/* --- MODAL DE ERRO CRÍTICO --- */}
        <Dialog
            open={errorModal.open}
            onClose={handleCloseCriticalError} // Fecha e redireciona mesmo se clicar fora
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.error.main }}>
                <ErrorOutlineIcon />
                Falha na Transação
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ color: 'text.primary' }}>
                    {errorModal.message}
                </DialogContentText>
                <DialogContentText sx={{ mt: 2, fontSize: '0.9rem' }}>
                    Não se preocupe, seus pontos foram estornados e os itens voltaram para o seu carrinho. Por favor, tente novamente mais tarde.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button 
                    onClick={handleCloseCriticalError} 
                    variant="contained" 
                    color="primary" 
                    autoFocus
                    fullWidth
                >
                    Voltar para o Carrinho
                </Button>
            </DialogActions>
        </Dialog>
    </>
  );
}