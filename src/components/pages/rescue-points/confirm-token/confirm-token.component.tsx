"use client";

import React from "react";
import { useConfirmTokenViewModel } from "./confirm-token.view-model";
import { ConfirmTokenView } from "./confirm-token.view";

export default function ConfirmTokenComponent() {
  const viewModel = useConfirmTokenViewModel();
  return <ConfirmTokenView {...viewModel} />;
}
