"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/routes/routes";

export function useHomeViewModel() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const user = session?.user;
  const isLoading = status === "loading";

  const handleSignOut = () => {
    signOut();
  };

  const navigateToCampaigns = () => {
    router.push(APP_ROUTES.CAMPAIGNS);
  };

  return {
    user,
    isLoading,
    handleSignOut,
    navigateToCampaigns,
  };
}
