import React from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/FormFields";
import { Typography, useTheme } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import useNotifier from "@/hooks/useNotifier";
import { FormContainer } from "./styles";
import {  MailOutline } from "@mui/icons-material";
import { Button } from "@/components/Buttons";
import { useMutation } from "@tanstack/react-query";
import RecoveryService from "@/services/recovery.service";
import { IStep } from "..";

const recoveryEmailFormSchema = z
  .object({
    email: z.string({
      required_error: "O e-mail obrigatório",
    }).email({
      message: "E-mail inválido",
    }),
  })
  .required();

type IEmailForm = z.infer<typeof recoveryEmailFormSchema>;


export default function RecoveryFormEmail({setStep, setEmail}: IStep) {
  const theme = useTheme();
  const notify = useNotifier();
  const router = useRouter();

  const sendRecoveryMutation = useMutation({ mutationFn: RecoveryService.sendRecoveryEmail });

  const { control, handleSubmit } = useForm<IEmailForm>({
    resolver: zodResolver(recoveryEmailFormSchema),
  });

  async function handleSendEmail(values: IEmailForm) {
      sendRecoveryMutation.mutate(values.email, {
        onSuccess(res) {
          notify(res.message, "success");
          setEmail(values.email);
          setStep(2);
        },
        onError(error) {
          notify(error.message, "error");
        },
      })
  }

  return (
    <FormContainer
      component="form"
      noValidate
      onSubmit={handleSubmit(handleSendEmail)}
    >
      <TextField
        name="email"
        control={control}
        placeholder="Digite o email"
        leftIcon={<MailOutline htmlColor={theme.palette.primary?.["400"] || theme.palette.primary.main} />}
      />
      <Typography variant="caption" color={theme.palette.secondary?.["400"]}>
        Depois de informar seu e-mail, um código de verificação será enviado para que você prossiga com a redefinição da senha.
      </Typography>
      <Button
        variant="contained"
        type="submit"
        loading={sendRecoveryMutation.isPending}
      >
        Enviar
      </Button>
      
    </FormContainer>
  );
}
