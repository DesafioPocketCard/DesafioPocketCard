import { PageWrapper } from "@/components/Layout/Wrappers";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Metas",
};

export default function GoalsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
