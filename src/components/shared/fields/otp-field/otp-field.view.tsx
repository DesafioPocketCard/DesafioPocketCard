"use client";

import React, { useRef } from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  length?: number;
  disabled?: boolean;
}

export default function OTPField<T extends FieldValues>({
  name,
  control,
  length = 6,
  disabled,
}: Props<T>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!val) return;
    const lastChar = val[val.length - 1];
    if (!/^\d$/.test(lastChar)) return;
    const newValue = value.split("");
    newValue[index] = lastChar;
    const finalValue = newValue.join("").slice(0, length);
    onChange(finalValue);
    if (index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pastedData) return;
    onChange(pastedData);
    inputsRef.current[Math.min(pastedData.length, length - 1)]?.focus();
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="flex gap-3 justify-center" onPaste={handlePaste}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ""}
            onChange={(e) => handleInput(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            disabled={disabled}
            className={cn(
              "w-[45px] h-[55px] text-center text-2xl font-bold",
              "border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900 transition-all",
              "focus:outline-none focus:border-primary-500 focus:bg-white focus:shadow-[0_0_0_4px_var(--color-primary-50)]",
              error && "border-red-400",
              "max-[480px]:w-[38px] max-[480px]:h-[48px] max-[480px]:text-xl"
            )}
          />
        ))}
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error.message}</p>}
    </div>
  );
}
