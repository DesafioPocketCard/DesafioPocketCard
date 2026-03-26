"use client";

import React from "react";
import { FieldValues } from "react-hook-form";
import { ITextareaFieldViewModel } from "./textarea-field.view-model";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export function TextareaFieldView<TFieldValues extends FieldValues>({
  field,
  error,
  label,
  placeholder,
  rows = 4,
  className,
  disabled,
}: ITextareaFieldViewModel<TFieldValues>) {
  const { value, ...restField } = field;

  return (
    <Field className={className}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <textarea
        {...restField}
        value={value ?? ""}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "flex w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-base ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y min-h-[100px]",
          error && "border-destructive focus-visible:ring-destructive",
          !error && "hover:border-primary-200 focus:border-primary",
        )}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
