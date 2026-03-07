// eslint-disable-next-line no-undef
export interface RequestOptions extends RequestInit {
  timeout?: number;
  retry?: number;
  tags?: string[];
  revalidate?: number | false;
}

export interface AppError {
  code: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

export interface FetchConfig {
  baseUrl?: string;
  defaultTimeout: number;
  defaultRetry: number;
}
