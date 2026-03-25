"use client";

import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/contexts/LoadingContext";
import { ILoadingProps } from "./types";
import { cn } from "@/lib/utils";

export default function Loading({ isLoading, size = "lg" }: ILoadingProps) {
  const [isLoadingByContext] = useContext(LoadingContext);
  const [active, setActive] = useState(-1);
  const loading = (isLoadingByContext && !isLoading) || isLoading;

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setActive((active) => (active < 4 ? active + 1 : -1));
      }, 200);

      return () => clearInterval(interval);
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={cn(
          "relative flex items-center justify-center",
          size === "sm" && "size-10",
          size === "md" && "size-16",
          size === "lg" && "size-20",
        )}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`circle-${index}`}
            className={cn(
              "absolute rounded-full bg-primary-500 transition-all duration-200",
              size === "sm" && "size-2",
              size === "md" && "size-3",
              size === "lg" && "size-4",
              index <= active ? "opacity-100 scale-100" : "opacity-0 scale-0",
              index === 0 && "top-0 left-0",
              index === 1 && "top-0 right-0",
              index === 2 && "bottom-0 left-0",
              index === 3 && "bottom-0 right-0",
            )}
          />
        ))}
      </div>
    </div>
  );
}
