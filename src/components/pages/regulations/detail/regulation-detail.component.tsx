"use client";

import React from "react";
import { useRegulationDetailViewModel } from "./regulation-detail.view-model";
import { RegulationDetailView } from "./regulation-detail.view";

export default function RegulationDetailComponent() {
  const viewModel = useRegulationDetailViewModel();
  return <RegulationDetailView {...viewModel} />;
}
