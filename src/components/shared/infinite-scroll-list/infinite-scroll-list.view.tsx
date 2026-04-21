import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { useInfiniteScrollListViewModel } from "./infinite-scroll-list.view-model";

type InfiniteScrollListViewProps<T> = ReturnType<
  typeof useInfiniteScrollListViewModel<T>
>;

export function InfiniteScrollListView<T>(
  props: InfiniteScrollListViewProps<T>
) {
  const {
    data,
    renderItem,
    keyExtractor,
    ListHeaderComponent,
    ListFooterComponent,
    ListEmptyComponent,
    ItemSeparatorComponent,
    className,
    contentContainerClassName,
    horizontal,
    observerTarget,
  } = props;

  if (!data?.length && ListEmptyComponent) {
    return <>{ListEmptyComponent}</>;
  }

  return (
    <div
      className={cn(
        "flex",
        horizontal ? "flex-row overflow-x-auto" : "flex-col overflow-y-auto",
        className
      )}
    >
      <div
        className={cn(
          "flex",
          horizontal ? "flex-row" : "flex-col",
          contentContainerClassName
        )}
      >
        {ListHeaderComponent}

        {data.map((item, index) => {
          const key = keyExtractor(item, index);
          const isLast = index === data.length - 1;

          return (
            <Fragment key={key}>
              {renderItem(item, index)}
              {!isLast && ItemSeparatorComponent && (
                <ItemSeparatorComponent
                  highlighted={false}
                  leadingItem={item}
                />
              )}
            </Fragment>
          );
        })}

        {ListFooterComponent}

        {/* Sentinel for infinite scroll */}
        <div ref={observerTarget} className="h-4 w-full shrink-0" />
      </div>
    </div>
  );
}
