"use client";

import React from "react";
import { useGoalDetailViewModel } from "./goal-detail.view-model";
import { GoalDetailView } from "./goal-detail.view";

export default function GoalDetailComponent() {
  const viewModel = useGoalDetailViewModel();
  return <GoalDetailView {...viewModel} />;
}
