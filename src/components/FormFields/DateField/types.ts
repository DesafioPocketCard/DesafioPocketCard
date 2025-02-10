/* eslint-disable no-unused-vars */
import { TextFieldProps } from "@mui/material";
import { DateFieldProps } from "@mui/x-date-pickers";
import { Control } from "react-hook-form";

export interface IDateField {
  control: Control<any, any>;
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  customOnChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  onChange?: (value: any) => void;
  type?:
    | "date"
    | "static-date"
    | "time"
    | "static-time"
    | "date-time"
    | "static-date-time";
  views?: string[];
  orientation?: "row" | "column";
  minDate?: Date;
  maxDate?: Date;
  minTime?: Date;
  maxTime?: Date;
  shouldDisableDate?: (date: Date) => boolean;
  onMonthChange?: () => void;
  onViewChange?: () => void;
  onYearChange?: () => void;
  inputProps?: TextFieldProps;
  dateFieldProps?: DateFieldProps<any>;
}
