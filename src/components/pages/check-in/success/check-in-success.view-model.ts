"use client";

import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/routes/routes";

export function useCheckInSuccessViewModel() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push(APP_ROUTES.HOME);
  };

  const goToCampaigns = () => {
    router.push(APP_ROUTES.CAMPAIGNS);
  };

  return {
    handleGoHome,
    goToCampaigns,
  };
}
