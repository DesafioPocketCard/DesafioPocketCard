import { ReactNode } from "react";

interface IPaginatedListProps<T> {
  maxHeight?: string;
  minHeight?: string;
  gap?: string;
  loading?: boolean;
  loadingComponent?: ReactNode;
  onPageChange(page: number): void;
  page: number;
  totalPage: number;
  data: T[];
  renderItem(item: T, key: number): ReactNode;
  emptyMessage?: string;
  endMessage?: string;
  className?: string;
}

export type { IPaginatedListProps };
