import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import NoticeForm from '@/components/NoticeForm';
import { fetchNotice } from '@/lib/api';
import { Notice } from '@/types/notice';

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const numericId = Number(id);
    if (isNaN(numericId)) {
      router.push('/');
      return;
    }
    
    fetchNotice(numericId)
      .then(data => setNotice(data))
      .catch(err => {
        console.error(err);
        router.push('/');
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Notice not found</p>
        <button 
          onClick={() => router.push('/')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Notice | Notice Board</title>
      </Head>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Notice</h1>
        <p className="text-gray-500 text-sm mt-1">Update the notice details below</p>
      </div>
      <NoticeForm notice={notice} isEdit />
    </>
  );
}