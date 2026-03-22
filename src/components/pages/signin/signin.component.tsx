"use client";

import React from "react";
import { useSigninViewModel } from "./signin.view-model";
import { SigninView } from "./signin.view";

export default function SigninComponent() {
  const viewModel = useSigninViewModel();
  return <SigninView {...viewModel} />;
}
