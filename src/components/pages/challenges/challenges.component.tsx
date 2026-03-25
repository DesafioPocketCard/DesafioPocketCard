"use client";

import React from "react";
import { useChallengesViewModel } from "./challenges.view-model";
import { ChallengesView } from "./challenges.view";

export default function ChallengesComponent() {
  const viewModel = useChallengesViewModel();
  return <ChallengesView {...viewModel} />;
}
