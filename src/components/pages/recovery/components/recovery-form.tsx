"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import OTPField from "@/components/shared/fields/otp-field/otp-field.view";
import { useRecoveryViewModel } from "../recovery.view-model";

type Props = ReturnType<typeof useRecoveryViewModel>;

export function RecoveryForm({
  step,
  emailForm,
  otpForm,
  passwordForm,
  onEmailSubmit,
  onOTPSubmit,
  onPasswordSubmit,
  isEmailLoading,
  isOTPLoading,
  isPasswordLoading,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-8">
      {step === 1 && (
        <form onSubmit={onEmailSubmit} className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Recuperar senha</h1>
            <p className="text-sm text-balance text-muted-foreground font-medium">
              Informe seu e-mail cadastrado para receber o código de acesso.
            </p>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Controller
                name="email"
                control={emailForm.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="nome@exemplo.com"
                    disabled={isEmailLoading}
                    className={cn(emailForm.formState.errors.email && "border-destructive focus-visible:ring-destructive")}
                    autoFocus
                  />
                )}
              />
              {emailForm.formState.errors.email && <FieldError>{emailForm.formState.errors.email.message}</FieldError>}
            </Field>

            <Button type="submit" isLoading={isEmailLoading} className="w-full font-bold shadow-sm" size="lg">
              {isEmailLoading ? "Enviando..." : "Enviar código"}
            </Button>
          </FieldGroup>

          <footer className="text-center mt-2">
            <Link href="/signin" className="text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Voltar para o login
            </Link>
          </footer>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={onOTPSubmit} className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Verificação</h1>
            <p className="text-sm text-balance text-muted-foreground font-medium">
              Digite o código de 6 dígitos que enviamos para o seu e-mail.
            </p>
          </div>

          <FieldGroup>
            <Field>
              <OTPField name="otp" control={otpForm.control} disabled={isOTPLoading} />
            </Field>

            <Button type="submit" isLoading={isOTPLoading} className="w-full font-bold shadow-sm" size="lg">
              {isOTPLoading ? "Validando..." : "Validar código"}
            </Button>
          </FieldGroup>

          <footer className="text-center">
             <p className="text-xs text-muted-foreground font-medium">
               Não recebeu o código?{" "}
               <button type="button" onClick={onEmailSubmit} className="text-primary-600 font-bold hover:underline">Reenviar</button>
             </p>
          </footer>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={onPasswordSubmit} className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Nova senha</h1>
            <p className="text-sm text-balance text-muted-foreground font-medium">
              Crie uma nova senha de acesso segura para sua conta.
            </p>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">Nova Senha</FieldLabel>
              <Controller
                name="password"
                control={passwordForm.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    disabled={isPasswordLoading}
                    className={cn(passwordForm.formState.errors.password && "border-destructive focus-visible:ring-destructive")}
                  />
                )}
              />
              {passwordForm.formState.errors.password && <FieldError>{passwordForm.formState.errors.password.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirmar Senha</FieldLabel>
              <Controller
                name="confirmPassword"
                control={passwordForm.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    disabled={isPasswordLoading}
                    className={cn(passwordForm.formState.errors.confirmPassword && "border-destructive focus-visible:ring-destructive")}
                  />
                )}
              />
              {passwordForm.formState.errors.confirmPassword && <FieldError>{passwordForm.formState.errors.confirmPassword.message}</FieldError>}
            </Field>

            <Button type="submit" isLoading={isPasswordLoading} className="w-full font-bold shadow-sm" size="lg">
              {isPasswordLoading ? "Redefinindo..." : "Redefinir senha"}
            </Button>
          </FieldGroup>
        </form>
      )}
    </div>
  );
}
