import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { validateNotice } from '@/lib/validation';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  if (req.method === 'GET') {
    try {
      const notice = await prisma.notice.findUnique({
        where: { id: numericId },
      });
      if (!notice) return res.status(404).json({ message: 'Notice not found' });
      return res.status(200).json(notice);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch notice' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { fields, files } = await parseForm(req);
      
      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const body = Array.isArray(fields.body) ? fields.body[0] : fields.body;
      const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
      const priority = Array.isArray(fields.priority) ? fields.priority[0] : fields.priority;
      const publishDate = Array.isArray(fields.publishDate) ? fields.publishDate[0] : fields.publishDate;

      const validation = validateNotice({ title, body, category, priority, publishDate });
      if (!validation.valid) {
        return res.status(400).json({ message: validation.errors.join(', ') });
      }

      const existingNotice = await prisma.notice.findUnique({ where: { id: numericId } });
      if (!existingNotice) return res.status(404).json({ message: 'Notice not found' });

      let imageUrl = existingNotice.image;
      const imageFile = files.image;
      if (imageFile) {
        const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;
        const filename = path.basename(file.filepath);
        imageUrl = `/uploads/${filename}`;
      }

      const notice = await prisma.notice.update({
        where: { id: numericId },
        data: {
          title: title!,
          body: body!,
          category: category!,
          priority: priority!,
          publishDate: new Date(publishDate!),
          image: imageUrl,
        },
      });

      return res.status(200).json(notice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to update notice' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.notice.delete({
        where: { id: numericId },
      });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete notice' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}