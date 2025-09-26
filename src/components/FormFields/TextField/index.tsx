"use client";

import React from "react";
import { formatWithMask } from "@/utils/mask";
import {
  IconButton,
  InputAdornment,
  TextField as MUITextField,
  useTheme,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { ITextField } from "./types";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

export default function TextField({
  control,
  name,
  label,
  mask,
  password,
  leftIcon,
  rightIcon,
  required,
  disabled,
  customOnChange,
  onBlur,
  onChange,
  ...props
}: ITextField) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  let icon: any = null;

  if (rightIcon) {
    icon = <InputAdornment position="end">{rightIcon}</InputAdornment>;
  } else if (password) {
    icon = (
      <IconButton onClick={togglePassword}>
        {showPassword ? (
          <VisibilityOutlined htmlColor={theme.palette.primary?.["400"] || theme.palette.primary.main} />
        ) : (
          <VisibilityOffOutlined htmlColor={theme.palette.primary?.["400"] || theme.palette.primary.main} />
        )}
      </IconButton>
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <MUITextField
          {...field}
          type={!showPassword && password ? "password" : "text"}
          {...props}
          disabled={disabled}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          label={label}
          fullWidth
          value={props.value || field.value || ""}
          variant="outlined"
          required={required}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: leftIcon ? (
              <InputAdornment position="start">{leftIcon}</InputAdornment>
            ) : null,
            endAdornment: icon,
          }}
          onChange={(event) => {
            let newValue = event.target.value;

            if (mask) {
              newValue = formatWithMask({
                mask,
                text: newValue,
              }).masked;
            }

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
            const newValue = event.target.value;

            if (onBlur instanceof Function) {
              onBlur(newValue);
            } else {
              field.onBlur();
            }
          }}
        />
      )}
    />
  );
}
