import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// Mock the env module before importing api-client
jest.mock('@/config/env', () => ({
  env: {
    NEXT_PUBLIC_API_URL: 'https://api.test.com',
  },
}));

import { http } from './api-client';

describe('http client', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('nên fetch dữ liệu thành công và parse JSON', async () => {
    const mockData = { id: 1, name: 'Kyle' };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await http('/test');

    expect(result).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.any(Object)
    );
  });

  it('nên throw error khi status code không phải 2xx', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });

    await expect(http('/secret')).rejects.toThrow('Unauthorized');
  });

  it('nên build query params chính xác', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    await http('/products', { params: { category: 'tech', page: 1 } });

    // Kiểm tra URL có chứa query string không
    const lastCallUrl = fetchMock.mock.calls[0][0];
    expect(lastCallUrl).toContain('category=tech');
    expect(lastCallUrl).toContain('page=1');
  });
});
