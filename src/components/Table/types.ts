/* eslint-disable no-unused-vars */
import { TableProps } from "@mui/material";
import React from "react";

interface IPagination {
  totalPages?: number;
  currentPage?: number;
  totalItems?: number;
  limit?: number;
  labelRowsPerPage?: string;
}

export interface ITableColumn<T, K extends keyof T> {
  field: string;
  label: string;
  type: "string" | "number" | "boolean" | "date" | "select" | "date-hour";
  format?: (value: T[K], row: T) => string | React.ReactNode;
  alignHead?: "left" | "center" | "right";
  alignRow?: "left" | "center" | "right";
  mask?: RegExp;
  options?: { label: string; value: any }[];
}

export interface ITableActions<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T, index: number) => void;
  disabled?: (row: T, index: number) => boolean;
}

export type RowStatus =
  | "error"
  | "disabled"
  | "active"
  | "info"
  | "warning"
  | "attention"
  | "canceled"
  | "delivered"
  | "info"
  | undefined;

export interface ITableProps<T> {
  title?: string;
  data: T[];
  size?: TableProps["size"];
  columns: Array<ITableColumn<T, keyof T>>;
  actions?: ITableActions<T>[];
  hideActions?: boolean;
  hidePagination?: boolean;
  loading?: boolean;
  pagination?: IPagination;
  emptyMessage?: string;
  onChangePage?: (pagination: IPagination) => void;
  handleRowStatus?: (row: T) => RowStatus;
}
