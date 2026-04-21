import type { ReactNode } from "react";

interface InfiniteScrollListProps<T> {
    data: T[];
    renderItem: (item: T, index: number) => ReactNode;
    keyExtractor: (item: T, index: number) => string;
    onEndReached?: () => void;
    onEndReachedThreshold?: number;
    ListHeaderComponent?: ReactNode;
    ListFooterComponent?: ReactNode;
    ListEmptyComponent?: ReactNode;
    ItemSeparatorComponent?: (props: {
        highlighted: boolean;
        leadingItem: T;
    }) => ReactNode;
    className?: string;
    contentContainerClassName?: string;
    horizontal?: boolean;
}

export type { InfiniteScrollListProps };
