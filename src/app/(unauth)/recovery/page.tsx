import { Metadata } from "next";
import React from "react";
import RecoveryComponent from "@/components/pages/recovery/recovery.component";

export const metadata: Metadata = {
  title: "Recuperação de Senha",
  description: "Recupere o acesso à sua conta no Desafio Pocket Card.",
};

export default function RecoveryPage() {
  return <RecoveryComponent />;
}
