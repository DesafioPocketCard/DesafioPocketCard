import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Campanhas",
};

export default function CampaignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
