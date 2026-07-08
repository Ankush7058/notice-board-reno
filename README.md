# Notice Board

A full-stack Notice Board application built with Next.js (Pages Router), Prisma, and MySQL. Supports creating, reading, updating, and deleting notices with server-side validation and responsive design.

## Features

- **Create Notice**: Add new notices with title, body, category, priority, publish date, and optional image
- **Read Notices**: View all notices as responsive cards with stats dashboard
- **Update Notice**: Edit existing notices with pre-filled form
- **Delete Notice**: Remove notices with confirmation dialog
- **Urgent Priority**: Urgent notices automatically sort to the top with a red badge
- **Server-Side Validation**: All input validation runs on the API, not just the browser
- **Responsive Design**: Works on mobile phones and desktop screens
- **Image Upload**: Optional image attachment for notices (bonus feature)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (Pages Router) |
| Database Access | Prisma ORM |
| Database | TiDB Cloud (MySQL-compatible, free tier) |
| Hosting | Vercel (Hobby tier) |
| Styling | Tailwind CSS v3 |
| Language | TypeScript |

## How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/notice-board-reno.git
   cd notice-board-reno
Install dependencies
bash
npm install
Set up environment variables
Create a .env file in the root directory
Add your database connection string:
plain
DATABASE_URL="mysql://username:password@host:port/database?sslaccept=strict"
Generate Prisma client and push schema
bash
npx prisma generate
npx prisma db push
Start the development server
bash
npm run dev
Open in browser
Navigate to http://localhost:3000
Project Structure
plain
├── components/          # React components
│   ├── ConfirmDialog.tsx  # Delete confirmation modal
│   ├── Header.tsx         # Navigation header
│   ├── NoticeCard.tsx     # Notice display card
│   └── NoticeForm.tsx     # Create/Edit form
├── lib/                   # Utility functions
│   ├── api.ts             # Frontend API calls
│   ├── prisma.ts          # Prisma client instance
│   ├── utils.ts           # Helper utilities
│   └── validation.ts      # Server-side validation
├── pages/                 # Next.js Pages Router
│   ├── api/notices/       # API routes
│   │   ├── index.ts       # GET all, POST create
│   │   └── [id].ts        # GET one, PUT update, DELETE
│   ├── notices/           # Page routes
│   │   ├── new.tsx        # Create notice page
│   │   └── [id].tsx       # Edit notice page
│   ├── _app.tsx           # App wrapper
│   └── index.tsx          # Home page (list notices)
├── prisma/
│   └── schema.prisma      # Database schema
├── public/uploads/        # Uploaded images
├── styles/
│   └── globals.css        # Global styles
└── types/
    └── notice.ts          # TypeScript types
API Endpoints
Table
Method	Endpoint	Description
GET	/api/notices	List all notices (Urgent first)
POST	/api/notices	Create a new notice
GET	/api/notices/:id	Get a single notice
PUT	/api/notices/:id	Update an existing notice
DELETE	/api/notices/:id	Delete a notice
One Thing to Improve With More Time
With more time, I would add pagination for the notice list to handle large datasets efficiently, and implement a rich text editor (like Quill or Tiptap) for the notice body instead of a plain textarea. This would allow formatting, bullet points, and embedded links in notices.
Where and How AI Was Used
AI (ChatGPT/Claude) was used to:
Help structure the project architecture and file organization
Generate boilerplate code for components and API routes
Debug Tailwind CSS v4 compatibility issues and configure v3
Fix Prisma schema compatibility with TiDB Cloud (MySQL)
Review and explain Next.js Pages Router patterns
All code was reviewed, tested, and modified by me to ensure correctness, security, and full understanding of how each part works.
Live Demo
View Live Application