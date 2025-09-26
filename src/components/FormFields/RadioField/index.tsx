"use client";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import accessObjectByString from "@/utils/accessObjectByString";
import { IRadioField } from "./types";

export default function RadioField({
  control,
  name,
  label,
  required,
  disabled,
  options = [],
  orientation = "row",
  optionLabelKey = "label",
  optionCompareKey,
  optionValueKey,
  disableOptions,
  customOnChange,
  onBlur,
  onChange,
  className,
  ...props
}: IRadioField) {
  const theme = useTheme();

  const optionIdentifier = useMemo(
    () => optionCompareKey || optionLabelKey,
    [optionCompareKey, optionLabelKey],
  );

  const getOptionValue = useCallback(
    (value: any) => {
      if (optionValueKey) {
        return value;
      }

      return options.find(
        (option) => accessObjectByString(option, optionIdentifier) === value,
      );
    },
    [optionValueKey, optionIdentifier, options],
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl
          error={fieldState.invalid}
          disabled={field.disabled}
          className={className}
          onChange={(event) => {
            if (event.target instanceof HTMLInputElement) {
              const value = getOptionValue(event.target.value);

              if (onChange instanceof Function) {
                onChange(value);
              } else {
                field.onChange(value);
              }

              if (customOnChange instanceof Function) {
                customOnChange(value);
              }
            }
          }}
          onBlur={() => {
            if (onBlur instanceof Function) {
              onBlur(field.value);
            } else {
              field.onBlur();
            }
          }}
        >
          <FormLabel
            required={required}
            sx={{
              fontSize: "0.9rem",
              color: theme.palette.primary?.["400"] || theme.palette.primary.main,
            }}
          >
            {label}
          </FormLabel>
          <RadioGroup
            {...field}
            {...props}
            value={
              field.value instanceof Object
                ? accessObjectByString(field.value, optionIdentifier)
                : field.value
            }
            sx={{
              display: "flex",
              flexDirection: orientation,
              flexWrap: "wrap",
              "& .MuiFormControlLabel-label": {
                fontSize: "0.9rem",
                color: fieldState.error
                  ? theme.palette.error.main
                  : theme.palette.base?.["700"] || "#707070",
              },
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={accessObjectByString(option, optionIdentifier)}
                label={accessObjectByString(option, optionLabelKey)}
                control={
                  <Radio
                    value={accessObjectByString(
                      option,
                      optionValueKey ?? optionIdentifier,
                    )}
                    disabled={
                      disableOptions ? disableOptions(option) : disabled
                    }
                  />
                }
              />
            ))}
          </RadioGroup>
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
