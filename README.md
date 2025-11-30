# Maphy

Maphy is a personal AI chat app built with Next.js, Prisma, shadcn/ui, and Gemini API. It supports chat sessions, file uploads, model selection, and a graphing calculator modal.

## Features
- Multi-session chat with history
- File upload for context-aware answers
- Model selection (Gemini 2.5 Pro/Flash)
- Markdown rendering
- Graphing calculator modal
- Session management and renaming

## Getting Started
1. Clone the repo:
   ```sh
   git clone https://github.com/yourusername/maphy.git
   cd maphy
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   ```npm
   DATABASE_URL="postgresql://localhost:5432/maphy?schema=public"
   GEMINI_API_KEY="key-here"
   PRISMA_CLIENT_ENGINE_TYPE=library
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev
   npx prisma generate
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## Tech Stack
- Next.js
- Prisma & PostgreSQL
- shadcn/ui
- Gemini API

## License
MIT
