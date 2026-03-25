import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import RecoveryService from "@/services/recovery.service";
import { IStep } from "..";
import { NotifierContext } from "@/contexts/NotifierContext";
import { INotifierActionKind } from "@/helpers/Notifier/types";
import TextField from "@/components/shared/fields/text-field/text-field.component";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PasswordStrengthIndicator } from "@/components/shared/fields/password-strength-indicator/password-strength-indicator.view";
import { passwordRequirements } from "@/utils/GlobalValidations";

const recoveryPasswordFormSchema = z
  .object({
    new_password: z
      .string()
      .refine(
        (value) => passwordRequirements.every((req) => req.regex.test(value)),
        {
          message: "A senha não atende aos requisitos mínimos de segurança.",
          path: ["password"],
        },
      ),
    password_confirmation: z.string(),
  })
  .required()
  .refine((data) => data.new_password === data.password_confirmation, {
    message: "As senhas não coincidem.",
    path: ["password_confirmation"],
  });

type IPasswordForm = z.infer<typeof recoveryPasswordFormSchema>;

export default function RecoveryFormPassword({ setStep, email, token }: IStep) {
  const [, notify] = useContext(NotifierContext);
  const router = useRouter();

  const resetPasswordMutation = useMutation({
    mutationFn: RecoveryService.passwordReset,
  });

  const { control, handleSubmit, watch } = useForm<IPasswordForm>({
    resolver: zodResolver(recoveryPasswordFormSchema),
  });

  const [new_password] = watch(["new_password"]);

  const onSubmit = handleSubmit((values: IPasswordForm) => {
    resetPasswordMutation.mutate(
      { email, token, new_password: values.new_password },
      {
        onSuccess(res) {
          notify({ type: INotifierActionKind.SHOW_NOTIFICATION, payload: { message: res.message, severity: "success" } });
          router.push("/signin");
        },
        onError(error) {
          notify({ type: INotifierActionKind.SHOW_NOTIFICATION, payload: { message: error.message, severity: "error" } });
        },
      },
    );
  });

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <TextField
        name="new_password"
        control={control}
        type="password"
        placeholder="Digite a nova senha"
        leftIcon={<Lock size={20} className="text-primary-500" />}
      />
      <PasswordStrengthIndicator password={new_password} />

      <TextField
        name="password_confirmation"
        control={control}
        type="password"
        placeholder="Confirmar senha"
        leftIcon={<Lock size={20} className="text-primary-500" />}
      />
      <Button
        type="submit"
        onClick={onSubmit}
        isLoading={resetPasswordMutation.isPending}
        size="lg"
        className="mt-4 w-full"
      >
        Salvar
      </Button>
    </form>
  );
}
