# SahYog — Mobile Web App

This is the **mobile-first** Next.js web app. It is the WebView target for the Android APK.

## Live URL
https://shayog-rb55.vercel.app

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Prisma + Neon PostgreSQL
- Zustand auth store
- Leaflet (OpenStreetMap tracking)

## Key Routes
| Route | Description |
|---|---|
| /customer/dashboard | Customer home screen |
| /customer/services | Browse 100 workers |
| /customer/booking/[id] | Book a worker |
| /customer/tracking/[id] | Live tracking (real map) |
| /admin/portal | Admin panel |
| /login | OTP login |
| /profile | User profile |
| /download | APK download page |

## Setup
\\\ash
npm install
cp .env.example .env  # add DATABASE_URL
npx prisma generate
npm run dev
\\\

## Build
\\\ash
npm run build
\\\

## Deploy
Auto-deploys to Vercel on push to main branch.
