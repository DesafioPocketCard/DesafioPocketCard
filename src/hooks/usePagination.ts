import { useState } from "react";

interface PaginationInfo {
  totalItems: number;
  limit: number;
  totalPages: number;
  currentPage: number;
  items: any[];
}

interface UsePaginationProps {
  initialData: any[];
  itemsPerPage: number;
}

interface UsePaginationResult {
  paginationInfo: PaginationInfo;
  // eslint-disable-next-line no-unused-vars
  handlePageChange: (pageNumber: number) => void;
}

export default function usePagination({
  initialData,
  itemsPerPage = 5,
}: UsePaginationProps): UsePaginationResult {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages: number = Math.ceil(initialData.length / itemsPerPage);

  const paginatedData = (): any[] => {
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    return initialData.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const paginationInfo: PaginationInfo = {
    totalItems: initialData.length,
    limit: itemsPerPage,
    totalPages,
    currentPage,
    items: paginatedData(),
  };

  return { paginationInfo, handlePageChange };
}
