"use client";

import React from "react";
import { useCheckInSuccessViewModel } from "./check-in-success.view-model";
import { CheckInSuccessView } from "./check-in-success.view";

export default function CheckInSuccessComponent() {
  const viewModel = useCheckInSuccessViewModel();
  return <CheckInSuccessView {...viewModel} />;
}
