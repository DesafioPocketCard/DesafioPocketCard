import React from "react";
import PageWrapper from "@/components/shared/layout/page-wrapper/page-wrapper.view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Área Logada",
    template: "PocketCard | %s",
  },
};

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageWrapper>{children}</PageWrapper>;
}
