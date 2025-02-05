import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Detalhes do Produto",
};

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
