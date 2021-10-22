import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface APIConfig extends AxiosRequestConfig {
  key?: string;
  maxRetry?: number;
  sectionKey?: string;
  showErrorMessage?: boolean;
  urlParams?: Record<string, string | number>;
  staticParams?: Record<string, string | number>;
}

export interface APIResponse<D = any> extends AxiosResponse<D> {
  config: APIConfig;
}

export interface APIError<D = any> extends AxiosError<D> {
  config: APIConfig;
  response?: APIResponse<D>;
}

export function isAPIResponse(
  result: APIResponse | APIError | undefined,
): result is APIResponse {
  return (result as APIResponse)?.data !== undefined;
}
