export function validateNotice(data: {
  title?: string;
  body?: string;
  category?: string;
  priority?: string;
  publishDate?: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!data.body || data.body.trim().length === 0) {
    errors.push('Body is required');
  }

  if (!data.category || !['Exam', 'Event', 'General'].includes(data.category)) {
    errors.push('Category must be Exam, Event, or General');
  }

  if (!data.priority || !['Normal', 'Urgent'].includes(data.priority)) {
    errors.push('Priority must be Normal or Urgent');
  }

  if (!data.publishDate) {
    errors.push('Publish date is required');
  } else {
    const date = new Date(data.publishDate);
    if (isNaN(date.getTime())) {
      errors.push('Invalid publish date');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}