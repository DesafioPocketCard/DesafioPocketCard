'use client';

import { FormControl, FormControlLabel, FormHelperText, Switch, useTheme } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ISwitchField } from './types';

export default function SwitchField({
  control,
  name,
  label,
  disabled,
  customOnChange,
  onBlur,
  onChange,
  switchProps,
  ...props
}: ISwitchField) {
  const theme = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl error={fieldState.invalid}>
          <FormControlLabel
            {...field}
            {...props}
            checked={field.value}
            label={label}
            disabled={disabled}
            control={<Switch  {...switchProps}/>}
            sx={{
              fontSize: '0.9rem',
             // eslint-disable-next-line no-nested-ternary
             color: fieldState.error ? theme.palette.error.main : disabled ? theme.palette.primary.light : theme.palette.primary.main,
            }}
            onChange={(event) => {
              if (event.target instanceof HTMLInputElement) {
                const value = event.target.checked;

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
            onBlur={(event) => {
              if (event.target instanceof HTMLInputElement) {
                const value = event.target.checked;

                if (onBlur instanceof Function) {
                  onBlur(value);
                } else {
                  field.onBlur();
                }
              }
            }}
          />
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
