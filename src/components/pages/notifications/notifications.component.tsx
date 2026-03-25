"use client";

import React from "react";
import { useNotificationsViewModel } from "./notifications.view-model";
import { NotificationsView } from "./notifications.view";

export default function NotificationsComponent() {
  const viewModel = useNotificationsViewModel();
  return <NotificationsView {...viewModel} />;
}
