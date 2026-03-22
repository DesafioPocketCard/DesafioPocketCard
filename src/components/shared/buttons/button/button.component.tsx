import React from "react";
import { ButtonProps } from "./button.model";
import { useButtonViewModel } from "./button.view-model";
import { ButtonView } from "./button.view";

export default function ButtonComponent(props: ButtonProps) {
  const viewModel = useButtonViewModel(props);
  return <ButtonView {...viewModel} />;
}
