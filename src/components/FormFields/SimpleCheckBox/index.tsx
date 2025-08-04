import { Controller } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import React, { useId } from "react";
import { ISimpleCheckboxProps } from "./types";
import {
  CheckBoxContainer,
  CheckboxChecked,
  CheckboxUnhecked,
  MUICheckBox,
} from "./styles";

export default function SimpleCheckBox({
  control,
  label,
  name,
  onChange,
  orientation = "row",
  ...props
}: ISimpleCheckboxProps) {
  const checkBoxID = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <CheckBoxContainer orientation={orientation}>
          <Box className="checkbox-box">
            <MUICheckBox
              id={checkBoxID}
              name={name}
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                if (onChange) onChange(e.target.checked);
              }}
              disabled={props.disabled}
              icon={<CheckboxUnhecked />}
              checkedIcon={
                <CheckboxChecked>
                  <Box />
                </CheckboxChecked>
              }
              {...props}
            />
            <Typography component="label" htmlFor={checkBoxID}>
              {label}
            </Typography>
          </Box>
          {fieldState.error && (
            <Typography component="p" color="error">
              {fieldState.error.message}
            </Typography>
          )}
        </CheckBoxContainer>
      )}
    />
  );
}
