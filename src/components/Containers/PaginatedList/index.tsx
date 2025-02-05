'use client';

import { CircularProgress, Typography } from '@mui/material';
import { useDebounceCallBack } from '@/hooks';
import { IPaginatedListProps } from './types';
import { PaginatedContainer } from './styles';

export default function PaginatedList<T extends Record<string, any>>({
  data,
  page,
  totalPage,
  onPageChange,
  loading = false,
  loadingComponent,
  minHeight = '200px',
  maxHeight = '100%',
  gap,
  renderItem,
  emptyMessage = 'Nenhum item encontrado.',
  endMessage = 'Não há mais itens.',
  className,
}: IPaginatedListProps<T>) {
  const debouncedHandlePage = useDebounceCallBack((e) => {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 2) {
      if (page < totalPage) {
        onPageChange(page + 1);
      }
    }
  }, 500);

  return (
    <PaginatedContainer
      maxHeight={maxHeight}
      minHeight={minHeight}
      gap={gap}
      className={className}
      onScroll={debouncedHandlePage}
    >
      {data.map(renderItem)}
      {!data.length && !loading && <Typography component="span">{emptyMessage}</Typography>}
      {page === totalPage && !!data.length && !loading && (
        <Typography component="span">{endMessage}</Typography>
      )}
      {loading && (loadingComponent ?? <CircularProgress color="primary" />)}
    </PaginatedContainer>
  );
}
