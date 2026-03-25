import React from "react";
import { cn } from "@/lib/utils";
import { passwordRequirements } from "@/utils/GlobalValidations";

interface PasswordStrengthIndicatorProps {
  password?: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const strength = passwordRequirements.filter((req) =>
    req.regex.test(password || ""),
  ).length;

  const getStrengthColor = (index: number) => {
    if (!password) return "bg-gray-200";
    if (strength <= index) return "bg-gray-200";

    if (strength <= 2) return "bg-red-500";
    if (strength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="flex gap-1 mt-2">
      {passwordRequirements.map((_, index) => (
        <div
          key={index}
          className={cn("h-2 flex-1 rounded-full", getStrengthColor(index))}
        />
      ))}
    </div>
  );
}