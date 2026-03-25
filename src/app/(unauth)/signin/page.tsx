import { Metadata } from "next";
import React from "react";
import SigninComponent from "@/components/pages/signin/signin.component";

export const metadata: Metadata = {
  title: "Acessar Conta",
  description:
    "Faça login no Desafio Pocket Card para acompanhar suas metas e recompensas.",
};

export default function Signin() {
  return <SigninComponent />;
}
