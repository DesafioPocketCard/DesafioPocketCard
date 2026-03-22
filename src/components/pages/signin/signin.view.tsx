"use client";

import React from "react";
import Image from "next/image";
import { useSigninViewModel } from "./signin.view-model";
import { LoginForm } from "./components/login-form";
import LogoComponent from "@/components/shared/ui/logo/logo.component";

type Props = ReturnType<typeof useSigninViewModel>;

export function SigninView(props: Props) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background">
      <div className="flex flex-col gap-4 p-6 md:p-10 animate-in slide-in-from-left-4 duration-700">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm {...props} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-primary-100 lg:block overflow-hidden">
        <Image
          src="/login-bg.png"
          alt="Login Background"
          fill
          className="absolute inset-0 h-full w-full object-cover grayscale-20 opacity-90 transition-all duration-1000 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 via-primary-900/40 to-transparent" />
        <div className="absolute bottom-16 left-16 text-white z-10 max-w-lg animate-in slide-in-from-bottom-8 duration-1000">
           <div className="rounded-md w-25 h-25 bg-white/10 backdrop-blur-md mb-8 flex items-center justify-center border border-white/20">
               <LogoComponent logoType="180x180" sizeFactor={0.45} />
           </div>
           <h2 className="text-5xl font-black mb-6 leading-[1.1] tracking-tighter">
             Transforme metas em <span className="text-primary-300">conquistas</span> memoráveis.
           </h2>
           <p className="text-xl text-white/70 font-medium leading-relaxed">
             Acompanhe sua performance, supere desafios e seja recompensado pelo seu talento.
           </p>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-10 right-10 size-64 bg-primary rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-10 left-10 size-64 bg-success-400 rounded-full blur-[120px] opacity-10" />
      </div>
    </div>
  );
}
