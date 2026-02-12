import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        {/* Spinner animation */}
        <Loader2 className='mx-auto h-12 w-12 animate-spin text-blue-600' />

        {/* Loading text */}
        <p className='mt-4 text-gray-600'>Đang tải...</p>
      </div>
    </div>
  );
}
