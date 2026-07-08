import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Notice } from '@/types/notice';
import { fetchNotices, deleteNotice } from '@/lib/api';
import NoticeCard from '@/components/NoticeCard';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadNotices = async () => {
    try {
      const data = await fetchNotices();
      setNotices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteNotice(deleteId);
      setNotices(prev => prev.filter(n => n.id !== deleteId));
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteId(null);
    }
  };

  const urgentCount = notices.filter(n => n.priority === 'Urgent').length;
  const categories = [...new Set(notices.map(n => n.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Notice Board</title>
      </Head>
      
      {notices.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Total Notices</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{notices.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-red-500 uppercase font-semibold tracking-wider">Urgent Notices</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{urgentCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hidden sm:block">
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Categories</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{categories.length}</p>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Notices</h1>
      
 {notices.length === 0 ? (
  <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <p className="text-lg font-medium text-gray-900 mb-1">No notices yet</p>
    <p className="text-sm text-gray-500 mb-4">Click &quot;Add Notice&quot; to create your first notice</p>
  </div>
) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map(notice => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Notice"
        message="Are you sure you want to delete this notice? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}