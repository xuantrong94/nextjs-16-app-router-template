import { env } from '@/config/env';

/* eslint-disable no-undef */
type FetchOptions = RequestInit & {
  params?: Record<string, string | number>;
  // Next.js mở rộng RequestInit, nên đôi khi TS chưa nhận diện được các field mới
  // nếu em dùng phiên bản cũ, nhưng thường nó đã có sẵn trong global.
};

const BASE_URL = env.NEXT_PUBLIC_API_URL;

export const http = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { params, headers: customHeaders, ...customConfig } = options;

  // Xử lý Query Parameters
  const searchParams = new URLSearchParams(params as any).toString();
  const url = `${BASE_URL}${endpoint}${searchParams ? `?${searchParams}` : ''}`;

  // 3. FIX LỖI GÁN HEADERS:
  // Em đang spread cả `customConfig` vào `headers`, dẫn đến lỗi TS2322
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders, // Chỉ spread headers thôi, không spread toàn bộ config
  };

  const config: RequestInit = {
    ...customConfig,
    headers,
  };

  // 4. Gọi fetch (Lúc này fetch sẽ dùng global RequestInit)
  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
  }
  const data = await response.json();
  return data as T;
};
