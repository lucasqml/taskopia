type LoadingQuery = { isLoading: true, data: undefined, error: undefined };
type SuccessQuery<T> = { isLoading: false, data: T, error: null };
type ErrorQuery = { isLoading: false, data: undefined, error: Error };

export type QueryOf<T> = LoadingQuery | SuccessQuery<T> | ErrorQuery;