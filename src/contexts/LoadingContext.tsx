/* eslint-disable react/jsx-no-constructed-context-values */

"use client";

import { Dispatch, ReactNode, createContext, useState } from "react";

interface ILoadingProviderProps {
  children: ReactNode;
}

type ILoading = [boolean, Dispatch<boolean>];

const LoadingContext = createContext<ILoading>([false, (value) => value]);

function LoadingProvider({ children }: ILoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={[isLoading, setIsLoading]}>
      {children}
    </LoadingContext.Provider>
  );
}

export { LoadingContext, LoadingProvider };
