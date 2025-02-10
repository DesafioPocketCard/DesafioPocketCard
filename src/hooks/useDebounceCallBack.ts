/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useRef } from "react";

export default function useDebounceCallBack<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 500,
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function debouncedFn(...args: Parameters<T>) {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFn;
}
