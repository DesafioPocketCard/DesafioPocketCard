"use client";

import React from "react";
import { useHeaderViewModel } from "./header.view-model";
import { HeaderView } from "./header.view";

export default function HeaderComponent() {
  const viewModel = useHeaderViewModel();
  return <HeaderView {...viewModel} />;
}
