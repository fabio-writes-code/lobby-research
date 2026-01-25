# Lobby Research

## Overview
Lobby Research is a web app that helps clients load, filter, and summarize Alberta Legislative Assembly Hansard documents (verbatim transcripts of legislative proceedings). It is designed for fast keyword lookups across one or many documents, with tools to compile findings into shareable reports.

## Core Features
- **Search Hansard documents**: View, sort, and filter documents; highlight and list paragraphs containing a keyword.
- **Multi-document search**: Load multiple Hansard records and aggregate all matching paragraphs across them.
- **Report generation**: Open a side-by-side rich-text editor, paste or author notes, and export the final report to PDF.
- **Automated data ingestion**: Hansard documents are stored in SQLite and populated via a Python script executed on a cron schedule.

## Tech Stack
- **Framework**: Next.js 14 (App Router) + React 18
- **Language**: TypeScript
- **Styling/UI**: Tailwind CSS, Radix UI, class-variance-authority, tailwind-merge, lucide-react
- **Auth**: NextAuth.js (beta) + bcryptjs
- **Data**: Drizzle ORM; SQLite as the Hansard datastore; optional Postgres tooling present for other environments
- **Forms/Validation**: react-hook-form, @hookform/resolvers, zod
- **Editor/Export**: EasyMDE / react-simplemde-editor, markdown-it/remark, html2pdf.js, jsPDF
- **Dates**: date-fns, react-day-picker

## Data Pipeline
- Hansard data is ingested into SQLite via a Python script.
- A cron job keeps the database up to date.

## Scripts
- `pnpm dev` - start the dev server
- `pnpm build` - production build
- `pnpm start` - run the production server
- `pnpm lint` - lint the codebase
- `pnpm db:generate` - generate Drizzle artifacts
- `pnpm db:migrate` - run Drizzle migrations
- `pnpm db:push` - push schema (see `drizzle.config.ts`)
- `pnpm db:studio` - open Drizzle Studio

## Getting Started
1. Install dependencies: `pnpm install`
2. Copy env vars: `cp .env.example .env`
3. Run the app: `pnpm dev`

## Required Environment Variables
Define these in `.env` (values shown here are placeholders):

```bash
DATABASE_URL="postgresql://user:password@host:5432/db"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"

POSTGRES_URL="postgres://user:password@host:5432/db?sslmode=require"
POSTGRES_PRISMA_URL="postgres://user:password@host:5432/db?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NO_SSL="postgres://user:password@host:5432/db"
POSTGRES_URL_NON_POOLING="postgres://user:password@host:5432/db?sslmode=require"
POSTGRES_USER="user"
POSTGRES_HOST="host"
POSTGRES_PASSWORD="password"
POSTGRES_DATABASE="db"
```

## Notes
- If you change the ingestion schedule or SQLite file path, update the cron job and the Python script accordingly.
