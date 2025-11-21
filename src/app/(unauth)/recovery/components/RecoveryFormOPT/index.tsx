import React, { useEffect, useRef } from "react";
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
import OTP from "@/components/FormFields/OPTField";

const recoveryOPTFormSchema = z
  .object({
    token: z.string({
      required_error: "Campo obrigatório",
    }),
  })
  .required();

type IOPTForm = z.infer<typeof recoveryOPTFormSchema>;


export default function RecoveryFormOPT({setStep, email,setToken}: IStep) {
  const theme = useTheme();
  const notify = useNotifier();
  const router = useRouter();

  const sendRecoveryMutation = useMutation({ mutationFn: RecoveryService.sendRecoveryEmail });
  const confirmCodeMutation = useMutation({ mutationFn: RecoveryService.codeValidate });

  const { control, handleSubmit, watch } = useForm<IOPTForm>({
    resolver: zodResolver(recoveryOPTFormSchema),
    defaultValues: {
      token: "",
    }
  });

   async function handleSendEmail() {
      sendRecoveryMutation.mutate(email, {
        onSuccess(res) {
          notify(res.message, "success");
          setStep(2);
        },
        onError(error) {
          notify(error.message, "error");
        },
      })
  }

  const token = watch("token");

  const hasFired = useRef(false);

  useEffect(() => {
    if (token.length === 6 && !hasFired.current) {
      hasFired.current = true;
      confirmCodeMutation.mutate({
        email: email,
        token,
      }, {
        onSuccess(res) {
          notify(res.message, "success");
          setToken(token);
          setStep(3);
        },
        onError(error) {
          notify(error.message, "error");
        },
      });
    }
  }, [token, email, confirmCodeMutation]);


  return (
    <FormContainer noValidate>
      <OTP
        control={control}
        name="token"
        label="Código de verificação:"
        length={6}
        separator={" "}
      />
      <Typography variant="caption" color={theme.palette.secondary?.["400"]}>
        Enviamos um código de recuperação para o seu e-mail. Se ele não aparecer na sua caixa de entrada, verifique a pasta de spam ou clique em Reenviar.
      </Typography>
      <Button
        variant="contained"
        onClick={handleSendEmail}
        loading={sendRecoveryMutation.isPending}
      >
        Reenviar
      </Button>
      
    </FormContainer>
  );
}
