/* eslint-disable no-unused-vars */
import React from "react";
import { Control } from "react-hook-form";

export interface IAutocompleteField {
  control: Control<any, any>;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  multiple?: boolean;
  options?: any[];
  optionLabelKey?: string;
  optionCompareKey?: string;
  customOnChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  onChange?: (value: any) => void;
  inputProps?: any;
  AutocompleteProps?: any;
}
