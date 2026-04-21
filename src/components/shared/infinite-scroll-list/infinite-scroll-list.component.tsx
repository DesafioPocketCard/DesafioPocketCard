"use client";

import type { InfiniteScrollListProps } from "./infinite-scroll-list.model";
import { useInfiniteScrollListViewModel } from "./infinite-scroll-list.view-model";
import { InfiniteScrollListView } from "./infinite-scroll-list.view";

export function InfiniteScrollList<T>(props: InfiniteScrollListProps<T>) {
  const viewModel = useInfiniteScrollListViewModel(props);
  return <InfiniteScrollListView {...viewModel} />;
}
