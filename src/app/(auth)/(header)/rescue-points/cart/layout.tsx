import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Produtos na sacola",
};
export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
