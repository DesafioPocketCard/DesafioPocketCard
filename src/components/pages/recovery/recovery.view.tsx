"use client";

import React from "react";
import Image from "next/image";
import { useRecoveryViewModel } from "./recovery.view-model";
import { RecoveryForm } from "./components/recovery-form";
import Logo from "@/components/shared/ui/logo/logo.component";

type Props = ReturnType<typeof useRecoveryViewModel>;

export function RecoveryView(props: Props) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background">
      <div className="flex flex-col gap-4 p-6 md:p-10 animate-in slide-in-from-left-4 duration-700">
        <div className="flex justify-center gap-2 md:justify-start">
           <Logo logoType="horizontal" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <RecoveryForm {...props} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-primary-100 lg:block overflow-hidden">
        <Image
          src="/login-bg.png"
          alt="Recovery Background"
          fill
          className="absolute inset-0 h-full w-full object-cover grayscale-20 opacity-90 transition-all duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 via-primary-900/40 to-transparent" />
        <div className="absolute bottom-16 left-16 text-white z-10 max-w-lg animate-in slide-in-from-bottom-8 duration-1000">
           <div className="size-16 rounded-2xl bg-white/10 backdrop-blur-md mb-8 flex items-center justify-center border border-white/20">
              <div className="size-8 rounded-full bg-success-400 shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
           </div>
           <h2 className="text-5xl font-black mb-6 leading-[1.1] tracking-tighter">
             Segurança em <span className="text-success-300">foco</span> total.
           </h2>
           <p className="text-xl text-white/70 font-medium leading-relaxed">
             Estamos aqui para garantir que você retome o controle com agilidade e total proteção de dados.
           </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 size-64 bg-success-400 rounded-full blur-[120px] opacity-10" />
      </div>
    </div>
  );
}
