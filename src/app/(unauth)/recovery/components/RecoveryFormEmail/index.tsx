import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import TextField from "@/components/shared/fields/text-field/text-field.component";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { NotifierContext } from "@/contexts/NotifierContext";
import { INotifierActionKind } from "@/helpers/Notifier/types";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import RecoveryService from "@/services/recovery.service";
import { IStep } from "..";

const recoveryEmailFormSchema = z
  .object({
    email: z
      .string({
        required_error: "O e-mail obrigatório",
      })
      .email({
        message: "E-mail inválido",
      }),
  })
  .required();

type IEmailForm = z.infer<typeof recoveryEmailFormSchema>;

export default function RecoveryFormEmail({ setStep, setEmail }: IStep) {
  const [, notify] = useContext(NotifierContext);
  const router = useRouter();

  const sendRecoveryMutation = useMutation({
    mutationFn: RecoveryService.sendRecoveryEmail,
  });

  const { control, handleSubmit } = useForm<IEmailForm>({
    resolver: zodResolver(recoveryEmailFormSchema),
  });

  async function handleSendEmail(values: IEmailForm) {
    sendRecoveryMutation.mutate(values.email, {
      onSuccess(res) {
        notify({ type: INotifierActionKind.SHOW_NOTIFICATION, payload: { message: res.message, severity: "success" } });
        setEmail(values.email);
        setStep(2);
      },
      onError(error) {
        notify({ type: INotifierActionKind.SHOW_NOTIFICATION, payload: { message: error.message, severity: "error" } });
      },
    });
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleSendEmail)} className="flex flex-col gap-4">
      <TextField
        name="email"
        control={control}
        placeholder="Digite o email"
        leftIcon={<Mail size={20} className="text-primary-500" />}
      />
      <p className="text-sm text-gray-500 text-center">
        Depois de informar seu e-mail, um código de verificação será enviado
        para que você prossiga com a redefinição da senha.
      </p>
      <Button
        type="submit"
        isLoading={sendRecoveryMutation.isPending}
        size="lg"
        className="mt-4 w-full"
      >
        Enviar
      </Button>
    </form>
  );
}
