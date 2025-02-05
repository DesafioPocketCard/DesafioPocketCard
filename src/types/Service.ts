interface IPaginationModel<T> {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  limit: number;
  items: T[];
}

interface IPaginationParams {
  page?: number;
  limit?: number;
}

export type { IPaginationModel, IPaginationParams };
