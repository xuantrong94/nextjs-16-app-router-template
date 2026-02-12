'use client';

import { useEffect } from 'react';
import { TriangleAlert } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className='flex min-h-screen items-center justify-center px-4'>
      <div className='max-w-md text-center'>
        <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
          <TriangleAlert className='h-8 w-8 text-red-600' />
        </div>

        {/* Tiêu đề */}
        <h2 className='mb-2 text-2xl font-bold text-gray-900'>
          Đã xảy ra lỗi!
        </h2>

        {/* Mô tả lỗi */}
        <p className='mb-6 text-gray-600'>
          {error.message || 'Có gì đó không ổn. Vui lòng thử lại.'}
        </p>

        {/* Nút thử lại */}
        <button
          onClick={reset}
          className='rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
        >
          Thử lại
        </button>

        {/* Digest (nếu có) */}
        {error.digest && (
          <p className='mt-4 text-sm text-gray-400'>Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
