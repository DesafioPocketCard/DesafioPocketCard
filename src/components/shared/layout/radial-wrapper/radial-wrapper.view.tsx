"use client";


import { cn } from "@/lib/utils";
import { RadialWrapperProps } from "./radial-wrapper.model";

export function RadialWrapperView({
  header,
  headerClassName,
  headerBackgroundImage,
  headerAspectRatio,
  children,
  fillSize,
}: RadialWrapperProps) {
  const hasHeader = !!header;

  const headerStyle = headerBackgroundImage
    ? {
        backgroundImage: `url(${headerBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        aspectRatio: headerAspectRatio || "16 / 9",
      }
    : {};

  return (
    <div
      className={cn(
        "flex flex-col min-h-svh bg-background",
        hasHeader &&
          !headerBackgroundImage &&
          "bg-linear-to-br from-primary-900 via-primary-600 to-primary-300",
        fillSize && "w-full",
      )}
    >
      {hasHeader && (
        <header
          className={cn(
            "relative flex flex-col justify-between p-4 sm:p-6",
            headerClassName,
            headerBackgroundImage && "p-0",
          )}
          style={headerStyle}
        >
          {header}
        </header>
      )}
      <main
        className={cn(
          "flex-1 bg-background relative z-10 h-full",
          hasHeader && "shadow-2xl overflow-hidden",
          "w-full max-w-7xl mx-auto sm:px-3 lg:px-8",
          hasHeader ? "p-3 sm:p-10" : "p-0",
        )}
      >
        {children}
      </main>
    </div>
  );
}
