import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import NoticeCard from "../../components/NoticeCard";
import ConfirmDialog from "../../components/ConfirmDialog";
import { Notice } from "../../types/notice";

export default function NoticeBoardPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notices");
        return res.json();
      })
      .then((data) => setNotices(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;
    try {
      const res = await fetch(`/api/notices/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete notice");
      setNotices((prev) => prev.filter((n) => n.id !== deleteId));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteId(null);
    }
  };

  const urgentCount = notices.filter(
    (item) => item.priority === "Urgent"
  ).length;

  const uniqueCategories = [...new Set(notices.map((n) => n.category))].length;

  return (
    <>
      <Head>
        <title>Notice Board</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-fuchsia-200/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-200/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <Header />

          <section className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-sm font-medium text-slate-500">Total Notices</p>
              <h2 className="mt-3 text-4xl font-bold text-slate-900">{notices.length}</h2>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-sm font-medium text-slate-500">Urgent Notices</p>
              <h2 className="mt-3 text-4xl font-bold text-red-500">{urgentCount}</h2>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-sm font-medium text-slate-500">Categories</p>
              <h2 className="mt-3 text-4xl font-bold text-violet-600">{uniqueCategories}</h2>
            </div>
          </section>

          <section className="mt-12">
            {loading ? (
              <div className="flex h-80 items-center justify-center">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>
              </div>
            ) : notices.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center shadow-sm">
                <h2 className="text-3xl font-bold text-slate-900">No Notices Yet</h2>
                <p className="mt-3 text-slate-500">Click on Add Notice to create your first announcement.</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {notices.map((notice) => (
                  <NoticeCard
                    key={notice.id}
                    notice={notice}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Notice"
        message="Are you sure you want to delete this notice? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}