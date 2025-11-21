import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Recuperar Senha",
};

export default function RecoveryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
