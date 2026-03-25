"use client";

import React from "react";
import { useCampaignsViewModel } from "./campaigns.view-model";
import { CampaignsView } from "./campaigns.view";

export default function CampaignsComponent() {
  const viewModel = useCampaignsViewModel();
  return <CampaignsView {...viewModel} />;
}
