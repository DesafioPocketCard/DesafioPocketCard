/* eslint-disable no-unused-vars */
import { Control } from "react-hook-form";

export interface ICheckboxField {
  control: Control<any, any>;
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  options: Object[];
  orientation?: "row" | "column";
  optionLabelKey?: string;
  optionCompareKey?: string;
  optionValueKey: string;
  disableOptions?: (value: Object) => boolean;
  customOnChange?: (value: Object) => void;
  onBlur?: (value: Object) => void;
  onChange?: (value: Object) => void;
}
