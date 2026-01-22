import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Resgate de prêmios",
    template: "Pocketcard | %s",
  },
};
export default function RescuePointsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
