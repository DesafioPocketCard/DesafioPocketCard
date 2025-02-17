import type { Metadata } from "next";
import "@/global/styles/global.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { fonts, theme } from "@/config";
import React from "react";
import { QueryClientProvider } from "@/contexts/QueryClientContext";
import { SessionProvider } from "@/contexts/SessionProvider";
import { Notifier } from "@/helpers";
import { NotifierProvider } from "@/contexts/NotifierContext";
import Loading from "@/helpers/Loading";
import { LoadingProvider } from "@/contexts/LoadingContext";

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
  return (
    <html lang="pt-BR" className={fonts}>
      <body>
        <SessionProvider>
          <QueryClientProvider>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <LoadingProvider>
                  <Loading />
                  <NotifierProvider>
                    <Notifier />
                    {children}
                  </NotifierProvider>
                </LoadingProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
