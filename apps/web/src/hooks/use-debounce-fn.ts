import { useCallback, useRef } from "react";

export const useDebounceFn = <TArgs extends unknown[], TReturn>(
  callback: (...args: TArgs) => TReturn,
  delay = 300,
) => {
  const timeout = useRef<number | null>(null);

  return useCallback(
    (...args: TArgs) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};
