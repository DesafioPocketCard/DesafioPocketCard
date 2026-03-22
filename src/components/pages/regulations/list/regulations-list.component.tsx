"use client";

import React from "react";
import { useRegulationsListViewModel } from "./regulations-list.view-model";
import { RegulationsListView } from "./regulations-list.view";

export default function RegulationsListComponent() {
  const viewModel = useRegulationsListViewModel();
  return <RegulationsListView {...viewModel} />;
}
