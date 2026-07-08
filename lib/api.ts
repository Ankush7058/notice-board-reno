import { Notice } from '@/types/notice';

const API_BASE = '/api/notices';

export async function fetchNotices(): Promise<Notice[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch notices');
  return res.json();
}

export async function fetchNotice(id: number): Promise<Notice> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch notice');
  return res.json();
}

export async function createNotice(data: FormData): Promise<Notice> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    body: data,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create notice');
  }
  return res.json();
}

export async function updateNotice(id: number, data: FormData): Promise<Notice> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    body: data,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update notice');
  }
  return res.json();
}

export async function deleteNotice(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete notice');
}