"use client";

import React from "react";
import { useProfileViewModel } from "./profile.view-model";
import { ProfileView } from "./profile.view";

export default function ProfileComponent() {
  const viewModel = useProfileViewModel();
  return <ProfileView {...viewModel} />;
}
