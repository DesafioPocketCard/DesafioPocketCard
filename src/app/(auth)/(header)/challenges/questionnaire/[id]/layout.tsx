import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Questionário",
};

export default function QuestionnaireLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
