import React from 'react';
import { Box, Button, FormHelperText, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { CloudUpload } from '@mui/icons-material';
import { IFileField } from './types';

export default function FileField({
  control,
  name,
  label,
  acceptedFileTypes = [],
  hiddeFileName = false,
  multiple,
  customIcon,
  onChange,
  customOnChange,
  ...props
}: IFileField) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field, fieldState }) => (
        <Box>
          <TextField
            {...props}
            id={name}
            type="file"
            inputProps={{
              accept: acceptedFileTypes.join(', '),
              multiple,
            }}
            sx={{
              display: 'none',
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { files } = event.target;

              if (files) {
                const value = multiple ? files : files[0];

                if (onChange instanceof Function) {
                  onChange(value);
                } else {
                  field.onChange(value);
                }

                if (customOnChange instanceof Function) {
                  customOnChange(value);
                }
              }
            }}
          />
          <Box component="label" htmlFor={name} sx={{ borderRadius: '50%' }}>
            <Button
              component="span"
              sx={{
                height: '48px',
                userSelect: 'none',
                width: '100%',
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
              color={fieldState.invalid ? 'error' : 'primary'}
              variant={field.value ? 'contained' : 'outlined'}
            >
              {customIcon || <CloudUpload />}
              <Box component="span">{label}</Box>
            </Button>
          </Box>
          <FormHelperText error={fieldState.invalid}>{fieldState.error?.message}</FormHelperText>
          {field.value && !hiddeFileName && (
            <div>
              {multiple ? (
                <Box display="flex" flexDirection="column">
                  {Array.from(field.value).map((file: any) => (
                    <Typography
                      key={file.name}
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        paddingTop: '4px',
                      }}
                    >
                      {file.name}
                    </Typography>
                  ))}
                </Box>
              ) : (
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    paddingTop: '4px',
                  }}
                >
                  {field.value.name}
                </Typography>
              )}
            </div>
          )}
        </Box>
      )}
    />
  );
}
