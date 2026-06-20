import type { Metadata } from "next";
import "@/global/styles/global.css";
import fonts from "@/config/theme/fonts";
import React from "react";
import { QueryClientProvider } from "@/contexts/QueryClientContext";
import { SessionProvider } from "@/contexts/SessionProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { getServerTenant } from "@/utils/theme-server";

export const metadata: Metadata = {
  title: {
    default: "PocketCard",
    template: "PocketCard | %s",
  },
  description: "Seja bem vindo ao Desafio PocketCard, um produto da Novocred.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serverTenant = await getServerTenant();

  return (
    <html lang="pt-BR" className={fonts} data-tenant={serverTenant}>
      <body>
        <SessionProvider>
          <QueryClientProvider>
            {children}
            <Toaster position="bottom-center" richColors />
            <SpeedInsights />
            <Analytics />
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
