import { MenuItem, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import accessObjectByString from '@/utils/accessObjectByString';
import { ISelectField } from './types';

export default function SelectField({
  control,
  name,
  label,
  placeholder,
  required,
  disabled,
  options = [],
  optionLabelKey = 'label',
  optionValueKey,
  optionCompareKey,
  customOnChange,
  onBlur,
  onChange,
  ...props
}: ISelectField) {
  const optionIdentifier = useMemo(
    () => optionCompareKey || optionLabelKey,
    [optionCompareKey, optionLabelKey],
  );

  function getOptionValue(value: any) {
    if (optionValueKey) {
      return value;
    }

    return options.find((option) => accessObjectByString(option, optionIdentifier) === value);
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          disabled={disabled}
          value={
            field.value instanceof Object
              ? accessObjectByString(field.value, optionIdentifier)
              : field.value
          }
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          select
          label={label}
          fullWidth
          variant="outlined"
          size="small"
          placeholder={placeholder}
          required={required}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => {
            const newValue = getOptionValue(event.target.value);

            if (onChange instanceof Function) {
              onChange(newValue);
            } else {
              field.onChange(newValue);
            }

            if (customOnChange instanceof Function) {
              customOnChange(newValue);
            }
          }}
          onBlur={(event) => {
            const newValue = getOptionValue(event.target.value);

            if (onBlur instanceof Function) {
              onBlur(newValue);
            } else {
              field.onBlur();
            }
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={accessObjectByString(option, optionIdentifier)}
              value={accessObjectByString(option, optionValueKey ?? optionIdentifier)}
            >
              {accessObjectByString(option, optionLabelKey)}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
