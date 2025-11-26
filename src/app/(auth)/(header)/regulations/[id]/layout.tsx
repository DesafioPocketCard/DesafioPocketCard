import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Regulamento",
};

export default function RegulationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
