/* eslint-disable no-unused-vars */
import { Control } from "react-hook-form";

export interface ISelectField {
    control: Control<any, any>;
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    options: any[];
    optionLabelKey?: string;
    optionValueKey?: string;
    optionCompareKey?: string;
    customOnChange?: (value: any) => void;
    onBlur?: (value: any) => void;
    onChange?: (value: any) => void;

}