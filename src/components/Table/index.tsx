import React from 'react';
import { theme } from '@/config';
import {
  Paper,
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  Typography,
  Box,
  TableBody,
  TableCell,
  Tooltip,
  IconButton,
  TablePagination,
} from '@mui/material';
import Loading from '@/helpers/Loading';
import accessObjectByString from '@/utils/accessObjectByString';
import { QuestionMark } from '@mui/icons-material';
import { format, parseISO } from 'date-fns';
import { ITableProps } from './types';
import { StyledTableCell, StyledTableRow } from './styles';

export default function Table<T>({
  title,
  data,
  columns,
  size,
  actions,
  hideActions,
  hidePagination = false,
  loading,
  pagination,
  emptyMessage,
  onChangePage,
  handleRowStatus = () => undefined,
}: ITableProps<T>) {
  return (
    <Box position="relative" borderRadius="12px" overflow="hidden" sx={{ width: '100%' }}>
      <Loading isLoading={loading} size="sm" />
      <Typography variant="h5" component="h2" fontWeight="bold" mb={2}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <MuiTable size={size} aria-label="customized-table">
          <TableHead sx={{ background: theme.palette.primary.main }}>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  variant="head"
                  key={column?.field}
                  align={column.alignHead ? column.alignHead : 'left'}
                >
                  <Typography fontWeight="bold" color="primary.light">
                    {column.label}
                  </Typography>
                </StyledTableCell>
              ))}
              {!!actions?.length && (
                <StyledTableCell variant="head" align="center">
                  <Typography fontWeight="bold" color="primary.light">
                    Ações
                  </Typography>
                </StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!data?.length && !loading ? (
              <StyledTableRow key="TableRow-empty">
                <StyledTableCell colSpan={columns.length + 1} key="emptyMessage" align="center">
                  <Typography component="span" color="primary">
                    {emptyMessage || 'Nenhum dado encontrado'}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              data?.map((row, rowIndex) => (
                <StyledTableRow key={`TableRow-${rowIndex}`} className={handleRowStatus(row)}>
                  {columns.map((column) => {
                    switch (column.type) {
                      case 'string':
                        return (
                          <TableCell
                            key={column.field}
                            align={column.alignRow ? column.alignRow : 'left'}
                          >
                            {column.format
                              ? column.format(
                                  accessObjectByString(row as Record<string, any>, column.field),
                                  row,
                                )
                              : accessObjectByString(row as Record<string, any>, column.field)}
                          </TableCell>
                        );
                      case 'select':
                        return (
                          <TableCell
                            key={column.field}
                            align={column.alignRow ? column.alignRow : 'left'}
                          >
                            {column.format
                              ? column.format(
                                  accessObjectByString(row as Record<string, any>, column.field),
                                  row,
                                )
                              : accessObjectByString(row as Record<string, any>, column.field)}
                          </TableCell>
                        );
                      case 'number':
                        return (
                          <TableCell
                            key={column.field}
                            align={column.alignRow ? column.alignRow : 'left'}
                          >
                            {column.format
                              ? column.format(
                                  accessObjectByString(row as Record<string, any>, column.field),
                                  row,
                                )
                              : accessObjectByString(row as Record<string, any>, column.field)}
                          </TableCell>
                        );
                      case 'date':
                        return (
                          <TableCell
                            key={column.field}
                            align={column.alignRow ? column.alignRow : 'left'}
                          >
                            {column.format
                              ? column.format(
                                  accessObjectByString(row as Record<string, any>, column.field),
                                  row,
                                )
                              : null}
                            {accessObjectByString(
                              row as Record<string, any>,
                              column.field,
                            ) instanceof Date
                              ? format(
                                  accessObjectByString(row as Record<string, any>, column.field),
                                  'dd/MM/yyyy',
                                )
                              : (() => {
                                  const dateValue = accessObjectByString(
                                    row as Record<string, any>,
                                    column.field,
                                  );
                                  if (dateValue) {
                                    return format(parseISO(dateValue), 'dd/MM/yyyy');
                                  }
                                  return 'Não informado';
                                })()}
                          </TableCell>
                        );
                      case 'date-hour':
                        return (
                          <TableCell
                            key={column.field}
                            align={column.alignRow ? column.alignRow : 'left'}
                          >
                            {column.format
                              ? column.format(
                                  accessObjectByString(row as Record<string, any>, column.field),
                                  row,
                                )
                              : null}
                            {accessObjectByString(
                              row as Record<string, any>,
                              column.field,
                            ) instanceof Date
                              ? format(
                                  accessObjectByString(row as Record<string, any>, column.field),
                                  'dd/MM/yyyy HH:mm',
                                )
                              : (() => {
                                  const dateValue = accessObjectByString(
                                    row as Record<string, any>,
                                    column.field,
                                  );
                                  if (dateValue) {
                                    return format(parseISO(dateValue), 'dd/MM/yyyy HH:mm');
                                  }
                                  return 'Não informado';
                                })()}
                          </TableCell>
                        );
                      case 'boolean':
                        return (
                          <TableCell
                            key={column.field}
                            align={column.alignRow ? column.alignRow : 'left'}
                          >
                            {column.format
                              ? column.format(
                                  accessObjectByString(row as Record<string, any>, column.field),
                                  row,
                                )
                              : accessObjectByString(row as Record<string, any>, column.field)
                                ? 'Sim'
                                : 'Não'}
                          </TableCell>
                        );
                      default:
                        return null;
                    }
                  })}
                  {!hideActions && (
                    <TableCell align="center">
                      {actions?.map((action, index) => (
                        <Tooltip title={action.label || 'Ação'} key={`action-${index}`}>
                          <Box component="span">
                            <IconButton
                              color="primary"
                              disabled={action.disabled && action.disabled(row, rowIndex)}
                              onClick={() => action.onClick(row, rowIndex)}
                            >
                              {action.icon ? action.icon : <QuestionMark />}
                            </IconButton>
                          </Box>
                        </Tooltip>
                      ))}
                    </TableCell>
                  )}
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {!hidePagination && pagination && onChangePage && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <TablePagination
            count={pagination?.totalItems || 0}
            component="div"
            page={pagination.currentPage ? pagination.currentPage - 1 : 0}
            onPageChange={(_, newPage) => {
              onChangePage({
                ...pagination,
                currentPage: newPage + 1,
              });
            }}
            rowsPerPage={pagination.limit || 0}
            rowsPerPageOptions={[5, 10, 20, 75]}
            onRowsPerPageChange={({ target }) => {
              onChangePage({
                ...pagination,
                limit: parseInt(target.value, 10),
                currentPage: 1,
              });
            }}
            labelRowsPerPage={
              pagination.labelRowsPerPage ? pagination.labelRowsPerPage : 'Itens por página'
            }
            labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count}`}
          />
        </Box>
      )}
    </Box>
  );
}
