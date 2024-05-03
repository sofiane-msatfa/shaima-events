type Function<TArgs extends unknown[], TReturn> = (...args: TArgs) => TReturn;

type AsyncFunction<TArgs extends unknown[], TReturn> = (
  ...args: TArgs
) => Promise<TReturn>;

type FunctionResult<TReturn> =
  | { success: true; result: TReturn }
  | { success: false; error: unknown };

export function catchAsyncError<TArgs extends unknown[], TReturn>(
  fn: AsyncFunction<TArgs, TReturn>,
) {
  return async (...args: TArgs): Promise<FunctionResult<TReturn>> => {
    try {
      const result = await fn(...args);
      return { success: true, result };
    } catch (error) {
      return { success: false, error };
    }
  };
}

export function catchError<TArgs extends unknown[], TReturn>(
  fn: Function<TArgs, TReturn>,
) {
  return (...args: TArgs): FunctionResult<TReturn> => {
    try {
      const result = fn(...args);
      return { success: true, result };
    } catch (error) {
      return { success: false, error };
    }
  };
}
