import Link from 'next/link';
import { Notice } from '@/types/notice';

interface NoticeCardProps {
  notice: Notice;
  onDelete: (id: string) => void;
}

export default function NoticeCard({ notice, onDelete }: NoticeCardProps) {
  const isUrgent = notice.priority === 'Urgent';

  const categoryColors: Record<string, string> = {
    Exam: 'bg-purple-100 text-purple-800 border-purple-200',
    Event: 'bg-green-100 text-green-800 border-green-200',
    General: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const formattedDate = new Date(notice.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-l-4 ${isUrgent ? 'border-red-500' : 'border-blue-500'} flex flex-col`}>
      {notice.image && (
        <div className="h-48 overflow-hidden bg-gray-100">
          <img
            src={notice.image}
            alt={notice.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[notice.category] || 'bg-gray-100 text-gray-700'}`}>
            {notice.category}
          </span>
          {isUrgent && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              URGENT
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {notice.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {notice.body}
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formattedDate}
        </div>

        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <Link
            href={`/notices/${notice.id}`}
            className="flex-1 text-center px-4 py-2.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-semibold"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(notice.id)}
            className="flex-1 px-4 py-2.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}