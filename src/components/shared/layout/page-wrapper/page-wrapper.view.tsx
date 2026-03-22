import React, { ReactNode } from "react";
import Header from "@/components/shared/layout/header/header.component";


interface Props {
  children: ReactNode;
  showHeader?: boolean;
}

export default function PageWrapper({ children, showHeader = true }: Props) {
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      {showHeader && <Header />}
      <main className="flex-1 pb-8 lg:max-w-[1200px] lg:mx-auto lg:w-full">{children}</main>
    </div>
  );
}
