# Notice Board

A full-stack **Notice Board** application built with **Next.js (Pages
Router)**, **Prisma ORM**, and **TiDB Cloud (MySQL-compatible)**. The
application supports complete **CRUD (Create, Read, Update, Delete)**
operations with server-side validation, responsive UI, and deployment on
Vercel.

------------------------------------------------------------------------

## 🚀 Features

-   ✅ Create new notices
-   ✅ View notices as responsive cards
-   ✅ Edit existing notices
-   ✅ Delete notices with confirmation dialog
-   ✅ Urgent notices displayed with a red badge
-   ✅ Urgent-first ordering from the database (Prisma query)
-   ✅ Server-side validation
-   ✅ Responsive design (Mobile & Desktop)
-   ✅ Optional image upload (Bonus)

------------------------------------------------------------------------

## 🛠 Tech Stack

  Layer          Technology
  -------------- -------------------------------
  Framework      Next.js 15 (Pages Router)
  Language       TypeScript
  Database ORM   Prisma
  Database       TiDB Cloud (MySQL-compatible)
  Hosting        Vercel (Hobby Tier)
  Styling        Tailwind CSS

------------------------------------------------------------------------

## 📦 Getting Started

### 1. Clone the Repository

``` bash
git clone https://github.com/Ankush7058/notice-board-reno.git
cd notice-board-reno
```

### 2. Install Dependencies

``` bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

``` env
DATABASE_URL="mysql://username:password@host:port/database?sslaccept=strict"
```

### 4. Generate Prisma Client

``` bash
npx prisma generate
```

### 5. Push the Database Schema

``` bash
npx prisma db push
```

### 6. Run the Development Server

``` bash
npm run dev
```

Open:

    http://localhost:3000

------------------------------------------------------------------------

## 📁 Project Structure

``` text
.
├── components
│   ├── ConfirmDialog.tsx
│   ├── Header.tsx
│   ├── NoticeCard.tsx
│   └── NoticeForm.tsx
├── lib
│   ├── api.ts
│   ├── prisma.ts
│   ├── utils.ts
│   └── validation.ts
├── pages
│   ├── api
│   │   └── notices
│   │       ├── index.ts
│   │       └── [id].ts
│   ├── notices
│   │   ├── new.tsx
│   │   └── [id].tsx
│   ├── _app.tsx
│   └── index.tsx
├── prisma
│   └── schema.prisma
├── public
├── styles
│   └── globals.css
├── types
│   └── notice.ts
└── README.md
```

------------------------------------------------------------------------

## 🔌 API Endpoints

  Method   Endpoint             Description
  -------- -------------------- --------------------------------
  GET      `/api/notices`       Get all notices (Urgent first)
  POST     `/api/notices`       Create a new notice
  GET      `/api/notices/:id`   Get a single notice
  PUT      `/api/notices/:id`   Update a notice
  DELETE   `/api/notices/:id`   Delete a notice

------------------------------------------------------------------------

## ✨ Assignment Requirements Covered

-   Full CRUD functionality
-   Next.js Pages Router
-   Prisma ORM
-   Hosted MySQL-compatible database (TiDB Cloud)
-   API routes with correct HTTP methods
-   Server-side validation
-   Responsive UI
-   Delete confirmation dialog
-   Urgent badge and urgent-first ordering
-   Public deployment on Vercel

------------------------------------------------------------------------

## 🔮 One Thing I Would Improve

Given more time, I would add:

-   Pagination for large datasets
-   Search and filtering
-   Rich text editor (Tiptap/Quill)
-   Image optimization
-   Authentication & role-based access
-   Unit and integration tests

------------------------------------------------------------------------

## 🤖 AI Usage

AI tools (ChatGPT) were used to:

-   Discuss application architecture
-   Explain Next.js Pages Router concepts
-   Generate boilerplate code
-   Assist with Prisma configuration
-   Help debug UI and styling issues
-   Review code quality and suggest improvements

All generated code was reviewed, modified, integrated, tested, and
verified by me before submission.

------------------------------------------------------------------------

## 🌐 Live Demo

**Live URL:** https://YOUR-VERCEL-URL.vercel.app

------------------------------------------------------------------------

## 📂 GitHub Repository

**Repository:** https://github.com/Ankush7058/notice-board-reno.git

------------------------------------------------------------------------

