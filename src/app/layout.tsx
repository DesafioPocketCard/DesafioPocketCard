import type { Metadata } from "next";
import "@/global/styles/global.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { fonts } from "@/config";
import React from "react";
import { QueryClientProvider } from "@/contexts/QueryClientContext";
import { SessionProvider } from "@/contexts/SessionProvider";
import { Notifier } from "@/helpers";
import { NotifierProvider } from "@/contexts/NotifierContext";
import Loading from "@/helpers/Loading";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DynamicThemeProvider from "@/contexts/DynamicThemeProvider";
import ThemeInitializer from "@/components/ThemeInitializer";
import TenantTester from "@/components/Debug/TenantTester";
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
  // Obter o tenant do servidor para sincronização
  const serverTenant = getServerTenant();

  return (
    <html lang="pt-BR" className={fonts}>
      <body>
        <SessionProvider>
          <QueryClientProvider>
            <AppRouterCacheProvider>
              <DynamicThemeProvider>
                <ThemeInitializer serverTenant={serverTenant} />
                <LoadingProvider>
                  <Loading />
                  <NotifierProvider>
                    <Notifier />
                    {children}
                    <TenantTester />
                    <SpeedInsights />
                  </NotifierProvider>
                </LoadingProvider>
              </DynamicThemeProvider>
            </AppRouterCacheProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
