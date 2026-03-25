"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-svh px-6 text-center animate-in fade-in duration-500 bg-white">
      <div className="flex flex-col items-center gap-6 max-w-[400px]">
        <div className="w-20 h-20 rounded-3xl bg-destructive/10 text-destructive flex items-center justify-center shadow-sm">
          <AlertCircle size={40} />
        </div>
        
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Ops...</h1>
          <p className="text-base font-medium text-muted-foreground leading-relaxed">
            Algo inesperado aconteceu. Mas não se preocupe, estamos prontos para tentar novamente!
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Button 
            size="lg" 
            onClick={reset}
            className="w-full font-bold shadow-md"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = "/"}
            className="w-full font-bold text-muted-foreground"
          >
            Voltar para o Início
          </Button>
        </div>
      </div>
    </div>
  );
}
