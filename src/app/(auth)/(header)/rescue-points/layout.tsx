import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Resgate de Pontos",
};
export default function RescuePointsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
