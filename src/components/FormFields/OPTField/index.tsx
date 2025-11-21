"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import { Input as BaseInput } from "@mui/base/Input";
import { Box, styled } from "@mui/system";
import { Typography } from "@mui/material";

interface OTPProps {
  control: any;
  name: string;
  length: number;
  separator?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function OTP({
  control,
  name,
  length,
  separator = <span>-</span>,
  label,
  disabled,
  required
}: OTPProps) {
  const inputRefs = React.useRef<HTMLInputElement[]>(
    new Array(length).fill(null)
  );

  const focusInput = (targetIndex: number) => {
    const target = inputRefs.current[targetIndex];
    target?.focus();
  };

  const selectInput = (targetIndex: number) => {
    const target = inputRefs.current[targetIndex];
    target?.select();
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState }) => {
        const { value = "", onChange } = field;

        const updateValue = (fn: (prev: string) => string) => {
          const newVal = fn(value);
          onChange(newVal);
        };

        const handleKeyDown = (
          event: React.KeyboardEvent<HTMLInputElement>,
          index: number
        ) => {
          switch (event.key) {
            case "ArrowLeft":
              event.preventDefault();
              if (index > 0) {
                focusInput(index - 1);
                selectInput(index - 1);
              }
              break;
            case "ArrowRight":
              event.preventDefault();
              if (index < length - 1) {
                focusInput(index + 1);
                selectInput(index + 1);
              }
              break;
            case "Delete":
            case "Backspace":
              event.preventDefault();
              updateValue((prev) =>
                prev.slice(0, index) + prev.slice(index + 1)
              );
              if (event.key === "Backspace" && index > 0) {
                focusInput(index - 1);
                selectInput(index - 1);
              }
              break;
          }
        };

        const handleChange = (
          event: React.ChangeEvent<HTMLInputElement>,
          index: number
        ) => {
          const currentValue = event.target.value;
          const lastChar = currentValue[currentValue.length - 1];

          let indexToEnter = index;

          while (
            inputRefs.current[indexToEnter]?.value &&
            indexToEnter < index
          ) {
            indexToEnter++;
          }

          updateValue((prev) => {
            const arr = prev.split("");
            arr[indexToEnter] = lastChar;
            return arr.join("");
          });

          if (lastChar && index < length - 1) {
            focusInput(index + 1);
          }
        };

        const handlePaste = (
          event: React.ClipboardEvent<HTMLInputElement>,
          index: number
        ) => {
          event.preventDefault();
          const data = event.clipboardData.getData("text/plain");
          const sanitized = data.substring(0, length);

          updateValue((prev) => {
            const arr = prev.split("");
            for (let i = index; i < length; i++) {
              arr[i] = sanitized[i - index] || "";
            }
            return arr.join("");
          });
        };

        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {label && (
              <Typography variant="body2" color="text.secondary">{label}</Typography>
            )}

            <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center", justifyContent: "center" }}>
              {Array.from({ length }).map((_, i) => (
                <React.Fragment key={i}>
                  <BaseInput
                    disabled={disabled}
                    slots={{ input: InputElement }}
                    slotProps={{
                      input: {
                        ref: (el: any) => (inputRefs.current[i] = el),
                        value: value[i] ?? "",
                        onChange: (e: any) => handleChange(e, i),
                        onKeyDown: (e: any) => handleKeyDown(e, i),
                        onPaste: (e: any) => handlePaste(e, i),
                        onClick: () => selectInput(i)
                      }
                    }}
                  />

                  {i < length - 1 ? separator : null}
                </React.Fragment>
              ))}
            </Box>

            {fieldState.error?.message && (
              <span style={{ color: "#d32f2f", fontSize: 12 }}>
                {fieldState.error.message}
              </span>
            )}
          </Box>
        );
      }}
    />
  );
}

const InputElement = styled("input")(
  ({ theme }) => `
  width: 40px;
  line-height: 1.5;
  padding: 8px 0;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.secondary?.["800"]};
  background: ${theme.palette.primary?.["50"]};
  border: 1px solid ${theme.palette.secondary?.["100"]};
  &:hover {
    border-color: ${theme.palette.primary?.["400"]};
  }
  &:focus {
    border-color: ${theme.palette.primary?.["400"]};
    box-shadow: 0 0 0 1px ${
      theme.palette.primary?.["400"]
    };
  }
  &:focus-visible {
    outline: 0;
  }
`
);
