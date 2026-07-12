# PhotoFlugel - AI Image Generation SaaS

PhotoFlugel is a modern, premium AI Image Generation SaaS platform. It provides an elegant interface for generating images using AI (currently designed to plug into Google's Gemini API).

## Features
- **Modern UI**: Built with Next.js App Router, Tailwind CSS v4, and ShadCN UI, utilizing a premium Old Money/Minimal aesthetic.
- **Authentication**: Secure email and Google login via Clerk.
- **Database**: Robust data modeling using Supabase (PostgreSQL).
- **Payments**: Subscription tiers (Free, Pro, Business) integrated with Stripe.
- **AI Integration Ready**: Architecture prepared for drop-in replacement with the Gemini Image Generation API.
- **Cloudflare Pages Compatible**: Designed to work gracefully on Edge environments.

## Getting Started

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Copy `.env.example` to `.env.local` and fill in your Clerk, Supabase, and Stripe keys.

3. **Database Setup**
   Run the provided `supabase_schema.sql` in your Supabase SQL editor to create the required tables and security policies.

4. **Run Locally**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the application.

## AI Service Layer
The AI generation logic is abstracted in `src/services/imageGenerator.ts`. Currently, it throws a "Gemini API not connected" error. To integrate Gemini, simply update that single file.
