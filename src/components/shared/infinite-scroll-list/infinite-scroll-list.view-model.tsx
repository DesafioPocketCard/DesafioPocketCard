import { useEffect, useRef } from "react";
import type { InfiniteScrollListProps } from "./infinite-scroll-list.model";

export function useInfiniteScrollListViewModel<T>(
  props: InfiniteScrollListProps<T>
) {
  const { onEndReached, onEndReachedThreshold = 0.5 } = props;
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onEndReached?.();
        }
      },
      { threshold: onEndReachedThreshold }
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [onEndReached, onEndReachedThreshold]);

  return {
    ...props,
    observerTarget,
  };
}
