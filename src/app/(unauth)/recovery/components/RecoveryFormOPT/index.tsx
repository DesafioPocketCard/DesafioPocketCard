import React, { useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import RecoveryService from "@/services/recovery.service";
import { IStep } from "..";
import { NotifierContext } from "@/contexts/NotifierContext";
import { INotifierActionKind } from "@/helpers/Notifier/types";
import OTPField from "@/components/shared/fields/otp-field/otp-field.view";
import { Button } from "@/components/ui/button";

const recoveryOPTFormSchema = z
  .object({
    token: z.string({
      required_error: "Campo obrigatório",
    }),
  })
  .required();

type IOPTForm = z.infer<typeof recoveryOPTFormSchema>;

export default function RecoveryFormOPT({ setStep, email, setToken }: IStep) {
  const [, notify] = useContext(NotifierContext);
  const router = useRouter();

  const sendRecoveryMutation = useMutation({
    mutationFn: RecoveryService.sendRecoveryEmail,
  });
  const confirmCodeMutation = useMutation({
    mutationFn: RecoveryService.codeValidate,
  });

  const { control, handleSubmit, watch } = useForm<IOPTForm>({
    resolver: zodResolver(recoveryOPTFormSchema),
    defaultValues: {
      token: "",
    },
  });

  async function handleSendEmail() {
    sendRecoveryMutation.mutate(email, {
      onSuccess(res) {
        notify({ type: INotifierActionKind.SHOW_NOTIFICATION, payload: { message: res.message, severity: "success" } });
        setStep(2);
      },
      onError(error) {
        notify({ type: INotifierActionKind.SHOW_NOTIFICATION, payload: { message: error.message, severity: "error" } });
      },
    });
  }

  const token = watch("token");

  const hasFired = useRef(false);

  useEffect(() => {
    if (token.length === 6 && !hasFired.current) {
      hasFired.current = true;
      confirmCodeMutation.mutate(
        {
          email: email,
          token,
        },
        {
          onSuccess(res) {
            notify({ type: INotifierActionKind.SHOW_NOTIFICATION, payload: { message: res.message, severity: "success" } });
            setToken(token);
            setStep(3);
          },
          onError(error) {
            notify({ type: INotifierActionKind.SHOW_NOTIFICATION, payload: { message: error.message, severity: "error" } });
          },
        },
      );
    }
  }, [token, email, confirmCodeMutation]);

  return (
    <form noValidate className="flex flex-col gap-4">
      <OTPField
        control={control}
        name="token"
        length={6}
      />
      <p className="text-sm text-gray-500 text-center">
        Enviamos um código de recuperação para o seu e-mail. Se ele não aparecer
        na sua caixa de entrada, verifique a pasta de spam ou clique em
        Reenviar.
      </p>
      <Button
        type="button"
        onClick={handleSendEmail}
        isLoading={sendRecoveryMutation.isPending}
        size="lg"
        className="mt-4 w-full"
      >
        Reenviar
      </Button>
    </form>
  );
}
