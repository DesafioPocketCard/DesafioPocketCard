"use client";

import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Circle, CircleContainer, Wrapper } from "./styles";
import { ILoadingProps } from "./types";

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
    <Wrapper>
      <CircleContainer size={size}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Circle
            key={`circle-${index}`}
            className={`circle-${index} ${index <= active ? "visible" : ""}`}
          />
        ))}
      </CircleContainer>
    </Wrapper>
  );
}
