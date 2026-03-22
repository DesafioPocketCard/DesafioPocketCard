"use client";

import React from "react";
import { useMyRewardsViewModel } from "./my-rewards.view-model";
import { MyRewardsView } from "./my-rewards.view";

export default function MyRewardsComponent() {
  const viewModel = useMyRewardsViewModel();
  return <MyRewardsView {...viewModel} />;
}
