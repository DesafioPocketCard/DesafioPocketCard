"use client";

import React from "react";
import { useProfileEditViewModel } from "@/components/pages/profile/profile-edit.view-model";
import { ProfileEditView } from "@/components/pages/profile/profile-edit.view";

export default function ProfileEditComponent() {
  const viewModel = useProfileEditViewModel();
  return <ProfileEditView {...viewModel} />;
}
