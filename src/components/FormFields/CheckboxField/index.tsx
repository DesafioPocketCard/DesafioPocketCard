'use client';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  useTheme,
} from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import accessObjectByString from '@/utils/accessObjectByString';
import { ICheckboxField } from './types';

export default function CheckboxField({
  control,
  name,
  label,
  required,
  disabled,
  options = [],
  orientation = 'row',
  optionLabelKey = 'label',
  optionCompareKey,
  optionValueKey,
  disableOptions,
  customOnChange,
  onBlur,
  onChange,
  ...props
}: ICheckboxField) {
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

      return options.find((option) => accessObjectByString(option, optionIdentifier) === value);
    },
    [optionValueKey, optionIdentifier, options],
  );

  const handleChange = useCallback(
    (value: Object, field: any) => {
      let optionsValue = [value];

      if (Array.isArray(field.value)) {
        optionsValue = [...field.value, ...optionsValue];

        const optionToRemove = field.value.find((option: Object) => {
          if (optionValueKey) {
            return value === option;
          }

          return (
            accessObjectByString(option, optionIdentifier) ===
            accessObjectByString(value, optionIdentifier)
          );
        });

        if (optionToRemove) {
          optionsValue = field.value.filter((option: Object) => {
            if (optionValueKey) {
              return value !== option;
            }

            return (
              accessObjectByString(option, optionIdentifier) !==
              accessObjectByString(value, optionIdentifier)
            );
          });
        }
      }

      if (onChange instanceof Function) {
        onChange(optionsValue);
      } else {
        field.onChange(optionsValue);
      }

      if (customOnChange instanceof Function) {
        customOnChange(optionsValue);
      }
    },
    [onChange, customOnChange, optionValueKey, optionIdentifier],
  );

  const verifySelectedOptions = useCallback(
    (item: Object, fieldValue: any) =>
      fieldValue?.some((option: Object) => {
        if (optionValueKey) {
          return accessObjectByString(item, optionValueKey) === option;
        }

        return (
          accessObjectByString(option, optionIdentifier) ===
          accessObjectByString(item, optionIdentifier)
        );
      }),
    [optionIdentifier, optionValueKey],
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl
          error={fieldState.invalid}
          disabled={disabled}
          onChange={(event) => {
            if (event.target instanceof HTMLInputElement) {
              handleChange(getOptionValue(event.target.value), field);
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
              fontSize: '0.9rem',
              color: theme.palette.primary.light,
            }}
          >
            {label}
          </FormLabel>
          <FormGroup
            {...field}
            {...props}
            sx={{
              display: 'flex',
              flexDirection: orientation,
              flexWrap: 'wrap',
              '& .MuiFormControlLabel-label': {
                fontSize: '0.9rem',
                color: fieldState.error ? theme.palette.error.main : theme.palette.primary.light,
              },
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={accessObjectByString(option, optionIdentifier)}
                label={accessObjectByString(option, optionLabelKey)}
                control={
                  <Checkbox
                    value={accessObjectByString(option, optionValueKey ?? optionIdentifier)}
                    checked={verifySelectedOptions(option, field.value)}
                    disabled={disableOptions ? disableOptions(option) : disabled}
                  />
                }
              />
            ))}
          </FormGroup>
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
