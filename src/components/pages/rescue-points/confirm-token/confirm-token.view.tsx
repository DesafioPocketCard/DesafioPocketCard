import React from "react";
import { ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { useConfirmTokenViewModel } from "./confirm-token.view-model";
import RadialWrapper from "@/components/shared/layout/radial-wrapper/radial-wrapper.component";
import Button from "@/components/shared/buttons/button/button.component";
import OTPField from "@/components/shared/fields/otp-field/otp-field.view";
import { motion, AnimatePresence } from "framer-motion";

type Props = ReturnType<typeof useConfirmTokenViewModel>;

export function ConfirmTokenView({ control, handleSubmit, onSubmit, isLoading, criticalError, handleCloseCriticalError, goBack }: Props) {
  return (
    <RadialWrapper
      header={
        <div className="flex flex-col gap-6 items-center">
          <div className="w-full flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goBack} className="bg-white/20 text-white rounded-xl">
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold text-white">Confirmação</h1>
          </div>
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2)]">
            <ShieldCheck size={40} />
          </div>
        </div>
      }
    >
      <div className="flex flex-col">
        <div className="bg-white p-10 rounded-[32px] border border-gray-200 flex flex-col gap-8 shadow-sm">
          <div className="text-center">
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">Código de Segurança</h2>
            <p className="text-[15px] text-gray-500 leading-relaxed">
              Insira o código de 6 dígitos enviado para o seu e-mail para autorizar o resgate.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <OTPField name="token" control={control} disabled={isLoading} />
            {isLoading && (
              <p className="text-center text-sm font-semibold text-primary-600 animate-pulse">Validando transação...</p>
            )}
            <Button type="submit" isLoading={isLoading} fullWidth size="lg">Confirmar Resgate</Button>
          </form>
        </div>

        <AnimatePresence>
          {criticalError && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-xs z-100"
              />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] bg-white rounded-3xl p-8 z-101 flex flex-col gap-6 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <AlertCircle size={32} className="text-red-500" />
                  <h3 className="text-xl font-extrabold text-gray-900">Falha na Transação</h3>
                </div>
                <div className="text-center flex flex-col gap-3">
                  <p className="text-gray-700 text-[15px] leading-relaxed">{criticalError}</p>
                  <p className="text-[13px] text-gray-500">Seus pontos foram estornados e os itens voltaram para a sacola. Tente novamente em instantes.</p>
                </div>
                <Button onClick={handleCloseCriticalError} fullWidth>Voltar para a Sacola</Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </RadialWrapper>
  );
}
