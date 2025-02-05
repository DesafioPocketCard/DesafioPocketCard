/* eslint-disable no-unused-vars */
import { SwitchProps } from "@mui/material";
import { Control } from "react-hook-form"

export interface ISwitchField {
    control: Control<any, boolean>;
    name: string;
    label: string;
    disabled?: boolean;
    options?: string[];
    customOnChange?: (value: boolean) => void;
    onBlur?: (value: boolean) => void;
    onChange?: (value: boolean) => void;
    switchProps?: SwitchProps
}