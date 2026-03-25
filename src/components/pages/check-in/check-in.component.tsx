"use client";

import React from "react";
import { useCheckInViewModel } from "./check-in.view-model";
import { CheckInView } from "./check-in.view";

export default function CheckInComponent() {
  const viewModel = useCheckInViewModel();
  return <CheckInView {...viewModel} />;
}
