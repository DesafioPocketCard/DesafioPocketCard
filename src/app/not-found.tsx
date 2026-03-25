"use client";

import Link from "next/link";
import { Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh px-6 text-center animate-in fade-in duration-500 bg-white">
      <div className="flex flex-col items-center gap-6 max-w-[400px]">
        <div className="relative">
          <div className="text-9xl font-black text-primary-100 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-primary-100 flex items-center justify-center text-primary-600 shadow-xl">
               <Search size={32} />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">Página não encontrada</h1>
          <p className="text-base font-medium text-muted-foreground leading-relaxed">
            O conteúdo que você está procurando não existe ou foi movido para outro lugar.
          </p>
        </div>

        <Link href="/" className="w-full" passHref>
          <Button 
            size="lg" 
            className="w-full font-bold shadow-md"
          >
            <Home className="mr-2 h-4 w-4" />
            Voltar para o Início
          </Button>
        </Link>
      </div>
    </div>
  );
}
