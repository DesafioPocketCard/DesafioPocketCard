"use client";

import React from "react";
import { useButtonViewModel } from "./button.view-model";
import { Button } from "@/components/ui/button";

type Props = ReturnType<typeof useButtonViewModel>;

export function ButtonView({
  children,
  variant,
  size,
  isLoading,
  isButtonDisabled,
  fullWidth,
  leftIcon,
  rightIcon,
  className,
  as,
  ...props
}: Props) {
  // Map old variants to new ones
  const variantMap: Record<string, any> = {
    primary: "default",
    secondary: "secondary",
    outline: "outline",
    ghost: "ghost",
    danger: "destructive",
  };

  // Map old sizes to new ones
  const sizeMap: Record<string, any> = {
    sm: "sm",
    md: "default",
    lg: "lg",
    icon: "icon",
  };

  return (
    <Button
      variant={variantMap[variant] || "default"}
      size={sizeMap[size] || "default"}
      isLoading={isLoading}
      disabled={isButtonDisabled}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      className={fullWidth ? "w-full " + className : className}
      asChild={as === "a" || as === "link"} // Simplistic check, Button handles with asChild + Slot
      {...props}
    >
      {children}
    </Button>
  );
}
