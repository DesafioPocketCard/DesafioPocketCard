"use client";

import useLoading from "@/hooks/useLoading";
import { useEffect } from "react";

function Loading() {
  const loading = useLoading();

  useEffect(() => {
    loading(true);

    return () => loading(false);
  }, []);

  return null;
}

export default Loading;
