import Head from 'next/head';
import NoticeForm from '@/components/NoticeForm';

export default function NewNotice() {
  return (
    <>
      <Head>
        <title>Add New Notice | Notice Board</title>
      </Head>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Notice</h1>
        <p className="text-gray-500 text-sm mt-1">Create a new notice for the board</p>
      </div>
      <NoticeForm />
    </>
  );
}