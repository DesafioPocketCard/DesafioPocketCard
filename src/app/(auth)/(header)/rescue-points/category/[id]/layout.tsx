import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Categoria",
};

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
