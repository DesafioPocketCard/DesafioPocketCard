/* eslint-disable no-unused-vars */
import { FocusEventHandler } from 'react';
import { Control, FieldValues } from 'react-hook-form';

export interface IOption {
  [key: string]: any;
}

export interface IFilters {
  page: number;
  text?: string | null;
}

export interface IPaginatedAutocompleteField<T> {
  control: Control<any, any>;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  queryKey: string;
  limit?: number;
  service: (params: any) => Promise<any>;
  refetchService?: any[];
  filterKey?: keyof T;
  listKey?: string;
  optionLabelKey?: string;
  optionCompareKey?: string;
  customOnChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  onChange?: (value: any) => void;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  inputProps?: any;
  AutocompleteProps?: any;
  className?: string;
}
