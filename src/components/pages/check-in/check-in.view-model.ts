"use client";

import { useRouter, useParams } from "next/navigation";
import { APP_ROUTES } from "@/routes/routes";

export function useCheckInViewModel() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const handleCheckIn = () => {
    // In a real app, we would use geolocation and a service call here
    router.push("/campains/check-in/success");
  };

  const goBack = () => router.back();

  return {
    handleCheckIn,
    goBack,
  };
}
