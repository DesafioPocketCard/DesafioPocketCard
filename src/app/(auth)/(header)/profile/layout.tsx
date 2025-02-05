import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Perfil",
};

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
