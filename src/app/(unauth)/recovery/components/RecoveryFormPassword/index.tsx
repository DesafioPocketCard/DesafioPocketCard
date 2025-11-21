import React from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/FormFields";
import { Typography, useTheme } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import useNotifier from "@/hooks/useNotifier";
import { FormContainer } from "./styles";
import {  LockOutlined, MailOutline } from "@mui/icons-material";
import { Button } from "@/components/Buttons";
import { useMutation } from "@tanstack/react-query";
import RecoveryService from "@/services/recovery.service";
import { IStep } from "..";
import { PasswordStrengthIndicator } from "@/components/FormFields/StrengthPasswordIndicator";
import { passwordRequirements } from "@/utils/GlobalValidations";

const recoveryPasswordFormSchema = z
  .object({
    new_password: z
    .string()
    .refine(
      (value) => passwordRequirements.every((req) => req.regex.test(value)),
      {
        message: 'A senha não atende aos requisitos mínimos de segurança.',
        path: ['password'],
      }
    ),
  password_confirmation: z.string(),
  })
  .required().refine((data) => data.new_password === data.password_confirmation, {
    message: 'As senhas não coincidem.',
    path: ['password_confirmation'],
  });

type IPasswordForm = z.infer<typeof recoveryPasswordFormSchema>;


export default function RecoveryFormPassword({setStep, email, token}: IStep) {
  const theme = useTheme();
  const notify = useNotifier();
  const router = useRouter();

  const resetPasswordMutation = useMutation({ mutationFn: RecoveryService.passwordReset });

  const { control, handleSubmit, watch } = useForm<IPasswordForm>({
    resolver: zodResolver(recoveryPasswordFormSchema),
  });

  const [new_password] = watch(["new_password"]);

  const onSubmit = handleSubmit((values: IPasswordForm) => {
    resetPasswordMutation.mutate({ email, token, new_password: values.new_password }, {
      onSuccess(res) {
        notify(res.message, "success");
        router.push("/signin");
      },
      onError(error) {
        notify(error.message, "error");
      },
    })
  })

  return (
    <FormContainer noValidate >
       <TextField
          name="new_password"
          control={control}
          password
          placeholder="Digite a nova senha"
          leftIcon={<LockOutlined htmlColor={theme.palette.primary?.["400"] || theme.palette.primary.main} />}
        />
      <PasswordStrengthIndicator password={new_password} />

      <TextField
          name="password_confirmation"
          control={control}
          password
          placeholder="Confirmar senha"
          leftIcon={<LockOutlined htmlColor={theme.palette.primary?.["400"] || theme.palette.primary.main} />}
        />
      <Button
        variant="contained"
        onClick={onSubmit}
        loading={resetPasswordMutation.isPending}
      >
        Salvar
      </Button>
      
    </FormContainer>
  );
}
