import { z } from "zod";

export const recoveryEmailSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

export const recoveryOTPSchema = z.object({
  otp: z.string().length(6, "Digite o código de 6 dígitos"),
});

export const recoveryPasswordSchema = z
  .object({
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type IRecoveryEmailData = z.infer<typeof recoveryEmailSchema>;
export type IRecoveryOTPData = z.infer<typeof recoveryOTPSchema>;
export type IRecoveryPasswordData = z.infer<typeof recoveryPasswordSchema>;

export type RecoveryStep = 1 | 2 | 3;
