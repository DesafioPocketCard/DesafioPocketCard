"use client";

import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  StaticDatePicker,
  StaticDateTimePicker,
  StaticTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { ptBR } from "date-fns/locale";
import { IDateField } from "./types";

export default function DateField({
  control,
  type = "date",
  name,
  label,
  required,
  disabled,
  views,
  orientation,
  minDate,
  maxDate,
  minTime,
  maxTime,
  shouldDisableDate,
  customOnChange,
  onBlur,
  onChange,
  onMonthChange,
  onViewChange,
  onYearChange,
  inputProps,
  dateFieldProps,
}: IDateField) {
  const DateComponent = useMemo(() => {
    const types: any = {
      date: DatePicker,
      "static-date": StaticDatePicker,
      time: TimePicker,
      "static-time": StaticTimePicker,
      "date-time": DateTimePicker,
      "static-date-time": StaticDateTimePicker,
    };

    return types[type];
  }, [type]);

  const customViews = useMemo(() => {
    if (Array.isArray(views)) return views;

    const dateViews = ["year", "month", "day"];
    const timeViews = ["hours", "minutes", "seconds"];
    const allViews = dateViews.concat(timeViews);

    const types: any = {
      date: dateViews,
      "static-date": dateViews,
      time: timeViews,
      "static-time": timeViews,
      "date-time": allViews,
      "static-date-time": allViews,
    };

    return types[type];
  }, [views, type]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <DateComponent
            {...field}
            {...dateFieldProps}
            disabled={disabled}
            variant="outlined"
            displayStaticWrapperAs="desktop"
            orientation={orientation}
            views={customViews}
            minDate={minDate}
            maxDate={maxDate}
            minTime={minTime}
            maxTime={maxTime}
            shouldDisableDate={shouldDisableDate}
            onChange={(value: Date) => {
              if (onChange instanceof Function) {
                onChange(value);
              } else {
                field.onChange(value);
              }

              if (customOnChange instanceof Function) {
                customOnChange(value);
              }
            }}
            onBlur={(value: Date) => {
              if (onBlur instanceof Function) {
                onBlur(value);
              } else {
                field.onBlur();
              }
            }}
            onMonthChange={onMonthChange}
            onViewChange={onViewChange}
            onYearChange={onYearChange}
            slotProps={{
              textField: {
                label,
                error: fieldState.invalid,
                helperText: fieldState.error?.message,
                required,
                fullWidth: true,
                size: "small",
                InputLabelProps: {
                  shrink: true,
                  ...inputProps?.InputLabelProps,
                },
                ...inputProps,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}
