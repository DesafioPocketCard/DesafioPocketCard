'use client';

import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import accessObjectByString from '@/utils/accessObjectByString';
import useDebounceCallBack from '@/hooks/useDebounceCallBack';
import { IFilters, IOption, IPaginatedAutocompleteField } from './types';
import ListBox from './ListBox';

export default function PaginatedAutocompleteField<T extends Record<string, any>>({
  control,
  name,
  label,
  placeholder,
  required,
  disabled,
  multiple = false,
  listKey = 'items',
  optionLabelKey = 'label',
  optionCompareKey,
  service,
  refetchService,
  filterKey,
  queryKey,
  limit = 10,
  customOnChange,
  onBlur,
  onChange,
  inputProps,
  AutocompleteProps,
  onFocus,
  className,
}: IPaginatedAutocompleteField<T>) {
  const [options, setOptions] = useState<IOption[]>([]);
  const [enableQuery, setEnableQuery] = useState(false);
  const [filters, setFilters] = useState<IFilters>({
    page: 1,
    text: null,
  });
  const [totalPage, setTotalPage] = useState(0);

  const optionIdentifier = useMemo(
    () => optionCompareKey || optionLabelKey,
    [optionCompareKey, optionLabelKey],
  );

  useEffect(() => {
    setFilters({
      page: 1,
    });
  }, [refetchService, queryKey, service]);

  const serviceQuery = useQuery({
    queryKey: [queryKey, enableQuery, filters, limit, refetchService],
    queryFn: async () => {
      if (filterKey) {
        return service({
          page: filters.page,
          limit,
          [filterKey]: filters.text,
        });
      }

      return service({ page: filters.page, limit });
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !disabled && enableQuery && !!queryKey,
  });

  useEffect(() => {
    if (serviceQuery.isError) {
      setOptions([]);
    } else if (serviceQuery.isSuccess) {
      const items = accessObjectByString(serviceQuery.data, listKey);

      if (items) {
        setTotalPage(serviceQuery.data.totalItems);

        if (filters.page === 1) {
          setOptions(items);
        } else {
          setOptions((options) => [...options, ...items]);
        }
      } else {
        setOptions((options) => [...options, ...serviceQuery.data]);
      }
    }
  }, [serviceQuery.isError, serviceQuery.isSuccess, serviceQuery.data]);

  const debouncedSearch = useDebounceCallBack(({ target }: SyntheticEvent) => {
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      setFilters({ text: target.value, page: 1 });
    }
  }, 500);

  const debouncedScroll = useDebounceCallBack(({ target }: SyntheticEvent) => {
    if (target instanceof HTMLUListElement) {
      const isEndScroll = target.scrollTop + target.clientHeight >= target.scrollHeight - 2;
      const enableToPaginate =
        totalPage > filters.page &&
        !serviceQuery.isFetching &&
        !serviceQuery.error &&
        options.length;

      if (isEndScroll && enableToPaginate) {
        setFilters((filters) => ({
          ...filters,
          page: filters.page + 1,
        }));
      }
    }
  }, 500);

  return (
    <Controller
      control={control}
      name={name as never}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...field}
          {...AutocompleteProps}
          size="small"
          variant="outlined"
          fullWidth
          className={className}
          multiple={multiple}
          disabled={disabled}
          options={options}
          filterOptions={(options) => options}
          getOptionLabel={(option: IOption) => accessObjectByString(option, optionLabelKey)}
          isOptionEqualToValue={(option: IOption, value: IOption) =>
            accessObjectByString(option, optionIdentifier) ===
            accessObjectByString(value, optionIdentifier)
          }
          componentsProps={{
            popper: {
              modifiers: [
                {
                  name: 'flip',
                  enabled: true,
                  options: {
                    altBoundary: true,
                    rootBoundary: 'document',
                    padding: 8,
                  },
                },
                {
                  name: 'preventOverflow',
                  enabled: true,
                  options: {
                    altAxis: true,
                    altBoundary: true,
                    tether: true,
                    rootBoundary: 'document',
                    padding: 8,
                  },
                },
              ],
            },
          }}
          ListboxComponent={ListBox}
          renderInput={(params) => (
            <TextField
              {...inputProps}
              {...params}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              label={label}
              placeholder={placeholder}
              required={required}
              InputLabelProps={{
                shrink: true,
                ...params.InputLabelProps,
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {serviceQuery.isFetching && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              onChange={debouncedSearch}
            />
          )}
          ListboxProps={{
            style: { maxHeight: '200px' },
            onScroll: debouncedScroll,
          }}
          onChange={(_, value) => {
            if (onChange instanceof Function) {
              onChange(value);
            } else {
              field.onChange(value);
            }

            if (customOnChange instanceof Function) {
              customOnChange(value);
            }
          }}
          onBlur={(_: any, value: any) => {
            if (onBlur instanceof Function) {
              onBlur(value);
            } else {
              field.onBlur();
            }
          }}
          onFocus={(event) => {
            setEnableQuery(true);

            if (onFocus instanceof Function) {
              onFocus(event);
            }
          }}
        />
      )}
    />
  );
}
