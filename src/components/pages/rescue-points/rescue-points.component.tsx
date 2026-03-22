"use client";

import React from "react";
import { useRescuePointsViewModel } from "./rescue-points.view-model";
import { RescuePointsView } from "./rescue-points.view";

export default function RescuePointsComponent() {
  const viewModel = useRescuePointsViewModel();
  return <RescuePointsView {...viewModel} />;
}
