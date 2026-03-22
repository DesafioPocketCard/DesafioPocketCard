"use client";

import { useQuery } from "@tanstack/react-query";
import { NotificationService } from "@/resources/services/notification/notification.service";

export function useNotificationsViewModel() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => NotificationService.getAll(),
    staleTime: 60 * 1000,
  });

  const notificationGroups = data?.data?.data || [];
  const totalNotifications = data?.data?.total || 0;

  return {
    notificationGroups,
    totalNotifications,
    isLoading,
    isError,
    refetch,
  };
}
