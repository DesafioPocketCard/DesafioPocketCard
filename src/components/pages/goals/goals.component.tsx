"use client";

import React from "react";
import { useGoalsViewModel } from "./goals.view-model";
import { GoalsView } from "./goals.view";

export default function GoalsComponent() {
  const viewModel = useGoalsViewModel();
  return <GoalsView {...viewModel} />;
}
