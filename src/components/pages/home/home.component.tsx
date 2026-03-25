"use client";

import React from "react";
import { useHomeViewModel } from "./home.view-model";
import { HomeView } from "./home.view";

export default function HomeComponent() {
  const viewModel = useHomeViewModel();
  return <HomeView {...viewModel} />;
}
