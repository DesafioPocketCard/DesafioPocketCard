import React from "react";
import type { Metadata } from "next";
import ProfileEditComponent from "@/components/pages/profile/profile-edit.component";

export const metadata: Metadata = {
  title: "Editar Perfil",
};

export default function ProfileEditPage() {
  return <ProfileEditComponent />;
}
