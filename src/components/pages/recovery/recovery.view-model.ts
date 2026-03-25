"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  RecoveryStep,
  IRecoveryEmailData,
  recoveryEmailSchema,
  IRecoveryOTPData,
  recoveryOTPSchema,
  IRecoveryPasswordData,
  recoveryPasswordSchema,
} from "./recovery.model";
import { AuthService } from "@/resources/services/auth/auth.service";

export function useRecoveryViewModel() {
  const router = useRouter();
  const [step, setStep] = useState<RecoveryStep>(1);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const emailForm = useForm<IRecoveryEmailData>({
    resolver: zodResolver(recoveryEmailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<IRecoveryOTPData>({
    resolver: zodResolver(recoveryOTPSchema),
    defaultValues: { otp: "" },
  });

  const passwordForm = useForm<IRecoveryPasswordData>({
    resolver: zodResolver(recoveryPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const sendEmailMutation = useMutation({
    mutationFn: AuthService.requestRecovery, // Assuming these exist in AuthService
    onSuccess: (data: any) => {
      setEmail(emailForm.getValues("email"));
      setStep(2);
      toast.success("Código enviado para seu e-mail");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao solicitar recuperação");
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: AuthService.verifyOTP,
    onSuccess: (data: any) => {
      setToken(data.token);
      setStep(3);
      toast.success("Código verificado com sucesso");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Código inválido");
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: AuthService.resetPassword,
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");
      router.push("/signin");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao alterar senha");
    },
  });

  const onEmailSubmit = emailForm.handleSubmit((data) => {
    sendEmailMutation.mutate(data.email);
  });

  const onOTPSubmit = otpForm.handleSubmit((data) => {
    verifyOTPMutation.mutate({ email, code: data.otp });
  });

  const onPasswordSubmit = passwordForm.handleSubmit((data) => {
    resetPasswordMutation.mutate({ 
      email, 
      token, 
      password: data.password 
    });
  });

  return {
    step,
    email,
    emailForm,
    otpForm,
    passwordForm,
    onEmailSubmit,
    onOTPSubmit,
    onPasswordSubmit,
    isEmailLoading: sendEmailMutation.isPending,
    isOTPLoading: verifyOTPMutation.isPending,
    isPasswordLoading: resetPasswordMutation.isPending,
    goBack: () => step > 1 ? setStep((step - 1) as RecoveryStep) : router.back(),
  };
}
