"use client";

import React from "react";
import { IButtonProps } from "./types";
import { Loading, StyledButton } from "./styles";

export default function Button({
  loading,
  loadingMessage = "Enviando...",
  disabled,
  children,
  variant = "contained",
  ...props
}: IButtonProps) {
  return (
    <StyledButton variant={variant} disabled={disabled || loading} {...props}>
      {loading ? loadingMessage : children}
      {loading && <Loading size={20} />}
    </StyledButton>
  );
}
