export interface Notice {
  id: number;  // Changed from string to number
  title: string;
  body: string;
  category: 'Exam' | 'Event' | 'General';
  priority: 'Normal' | 'Urgent';
  publishDate: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type NoticeFormData = Omit<Notice, 'id' | 'createdAt' | 'updatedAt'>;