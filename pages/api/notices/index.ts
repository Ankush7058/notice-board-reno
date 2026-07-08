import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { validateNotice } from '@/lib/validation';
import formidable from 'formidable';
import cloudinary from '@/lib/cloudinary';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const form = formidable({
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
  if (req.method === 'GET') {
    try {
      const notices = await prisma.$queryRaw`
        SELECT * FROM Notice
        ORDER BY 
          CASE WHEN priority = 'Urgent' THEN 0 ELSE 1 END,
          publishDate DESC
      `;
      return res.status(200).json(notices);
    } catch {
      return res.status(500).json({ message: 'Failed to fetch notices' });
    }
  }

  if (req.method === 'POST') {
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

      let imageUrl: string | undefined;
      const imageFile = files.image;
      if (imageFile) {
        const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: 'notice-board',
        });
        imageUrl = result.secure_url;
        // Clean up temp file
        fs.unlinkSync(file.filepath);
      }

      const notice = await prisma.notice.create({
        data: {
          title: title!,
          body: body!,
          category: category!,
          priority: priority!,
          publishDate: new Date(publishDate!),
          image: imageUrl,
        },
      });

      return res.status(201).json(notice);
    } catch {
      return res.status(500).json({ message: 'Failed to create notice' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}