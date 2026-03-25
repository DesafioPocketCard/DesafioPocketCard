"use client";

import React from "react";
import { useRecoveryViewModel } from "./recovery.view-model";
import { RecoveryView } from "./recovery.view";

export default function RecoveryComponent() {
  const viewModel = useRecoveryViewModel();
  return <RecoveryView {...viewModel} />;
}
