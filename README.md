# Wellmeet Frontend

Frontend web application for the Wellmeet platform, deployed on Vercel.

**Live Link (Vercel):** https://wellmeet-frontend-j4yo.vercel.app
The application may respond slowly on the first request.
This is expected behavior, as the backend is hosted on a free-tier service that that spins down during inactivity and requires a short warm-up time.

## Tech Stack
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Forms & Validation:** React Hook Form + Zod
- **UI:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Notifications:** Sonner

> **Note:** The backend API lives in a separate repository.

## Prerequisites
- Node.js (LTS recommended)
- npm

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (copy and edit `.env.example`):
   ```bash
   cp .env.example .env
   ```

   Required values:
    - `VITE_API_URL`

3. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables
Vite uses `VITE_`-prefixed variables. The frontend expects:
- `VITE_API_URL` — base URL for the Wellmeet API

