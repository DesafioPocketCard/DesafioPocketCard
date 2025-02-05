import { PageWrapper } from "@/components/Layout/Wrappers";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Pocketcard",
    template: "Pocketcard | %s",
  },
  description: "Um app cheio de desafios para você!",
};

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
