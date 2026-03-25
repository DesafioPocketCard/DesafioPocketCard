"use client";

import { useContext, useEffect } from "react";
import { NotifierContext } from "@/contexts/NotifierContext";
import { INotifierActionKind } from "@/helpers/Notifier/types";
import { useToast } from "@/components/ui/use-toast";

function GlobalNotifier() {
  const [notifierState, dispatch] = useContext(NotifierContext);
  const { toast } = useToast();

  useEffect(() => {
    if (notifierState.show) {
      toast({
        id: Math.random().toString(),
        variant: notifierState.severity === "error" ? "destructive" : "default",
        title: notifierState.severity === "error" ? "Erro" : "Notificação",
        description: notifierState.message,
      });
      dispatch({ type: INotifierActionKind.HIDE_NOTIFICATION });
    }
  }, [notifierState, dispatch, toast]);

  return null;
}

export default GlobalNotifier;
