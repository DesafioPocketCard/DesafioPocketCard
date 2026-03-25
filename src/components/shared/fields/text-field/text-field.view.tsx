"use client";

import React from "react";
import { FieldValues } from "react-hook-form";
import { ITextFieldViewModel } from "./text-field.view-model";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export function TextFieldView<TFieldValues extends FieldValues>({
  field,
  error,
  label,
  placeholder,
  type = "text",
  leftIcon,
  rightIcon,
  className,
  disabled,
}: ITextFieldViewModel<TFieldValues>) {
  return (
    <Field className={className}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <Input
        {...field}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        error={!!error}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
