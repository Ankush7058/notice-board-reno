import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl sm:text-2xl font-bold hover:text-blue-100 transition">
          📋 Notice Board
        </Link>
        <Link
          href="/notices/new"
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition shadow-sm text-sm sm:text-base"
        >
          + Add Notice
        </Link>
      </div>
    </header>
  );
}