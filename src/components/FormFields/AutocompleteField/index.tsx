'use client';

import { Autocomplete, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import accessObjectByString from '@/utils/accessObjectByString';
import { IAutocompleteField } from './types';

export default function AutocompleteField({
  control,
  name,
  label,
  placeholder,
  required,
  disabled,
  multiple = false,
  options = [],
  optionLabelKey = 'label',
  optionCompareKey,
  customOnChange,
  onBlur,
  onChange,
  inputProps,
  AutocompleteProps,
}: IAutocompleteField) {
  const optionIdentifier = useMemo(
    () => optionCompareKey || optionLabelKey,
    [optionCompareKey, optionLabelKey],
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...field}
          {...AutocompleteProps}
          size="small"
          variant="outlined"
          fullWidth
          disabled={disabled}
          multiple={multiple}
          options={options}
          getOptionLabel={(option: Object) => accessObjectByString(option, optionLabelKey)}
          isOptionEqualToValue={(option: Object, value) =>
            accessObjectByString(option, optionIdentifier) ===
            accessObjectByString(value, optionIdentifier)
          }
          componentsProps={{
            popper: {
              modifiers: [
                {
                  name: 'flip',
                  enabled: true,
                  options: {
                    altBoundary: true,
                    rootBoundary: 'document',
                    padding: 8,
                  },
                },
                {
                  name: 'preventOverflow',
                  enabled: true,
                  options: {
                    altAxis: true,
                    altBoundary: true,
                    tether: true,
                    rootBoundary: 'document',
                    padding: 8,
                  },
                },
              ],
            },
          }}
          renderInput={(params) => (
            <TextField
              {...inputProps}
              {...params}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              label={label}
              placeholder={placeholder}
              required={required}
              InputLabelProps={{
                shrink: true,
                ...params.InputLabelProps,
              }}
            />
          )}
          onChange={(_, value) => {
            if (onChange instanceof Function) {
              onChange(value);
            } else {
              field.onChange(value);
            }

            if (customOnChange instanceof Function) {
              customOnChange(value);
            }
          }}
          onBlur={(_: any, value: any) => {
            if (onBlur instanceof Function) {
              onBlur(value);
            } else {
              field.onBlur();
            }
          }}
        />
      )}
    />
  );
}
