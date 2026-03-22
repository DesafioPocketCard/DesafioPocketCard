"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { useSigninViewModel } from "../signin.view-model";
import Logo from "@/components/shared/ui/logo/logo.component";

type Props = ReturnType<typeof useSigninViewModel>;

export function LoginForm({
  form,
  onSubmit,
  isLoading,
  className,
  ...props
}: Props & React.ComponentProps<"form">) {
  const { control, formState: { errors } } = form;

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={onSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
            <Logo logoType="horizontal-b" sizeFactor={1.5}/>
           <p className="text-sm text-balance text-muted-foreground font-medium">
            Insira seu e-mail abaixo para entrar na sua conta.
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="nome@exemplo.com"
                autoComplete="email"
                disabled={isLoading}
                className={cn(errors.email && "border-destructive focus-visible:ring-destructive")}
              />
            )}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="senha">Senha</FieldLabel>
          <Controller
            name="senha"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="senha"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isLoading}
                className={cn(errors.senha && "border-destructive focus-visible:ring-destructive")}
              />
            )}
          />
          {errors.senha && <FieldError>{errors.senha.message}</FieldError>}
        </Field>

        <Field>
          <Button type="submit" className="w-full font-bold shadow-sm" isLoading={isLoading} size="lg">
            {isLoading ? "Entrando..." : "Entrar na conta"}
          </Button>
        </Field>

        <FieldSeparator>Ou continue com</FieldSeparator>

        <Field className="flex flex-col gap-2">
          <FieldDescription className="text-center mt-2 text-xs">
            Esqueceu sua senha?{" "}
            <Link href="/recovery" className="font-bold text-gray-900 underline underline-offset-4 hover:text-primary-600 transition-colors">
              Recuperar senha
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
