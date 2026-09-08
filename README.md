# 🤝 SahYog (सहयोग) — Community Home Services Platform

> A production-ready, full-stack home services platform connecting households with 100+ verified professionals across Gujarat and India.

---

## 🏛️ Repository Architecture

This repository is organized as a clean, unified monorepo containing the mobile app, the desktop website, the native Android APK, and the cloud database.

```
Shayog/
├── 📱 src/               → Mobile Web App (Live on Vercel: shayog-rb55.vercel.app)
├── 🌐 website/           → Desktop Website (PC & Laptop Booking Portal)
├── 🤖 android-apk/       → Native Android Studio Project (WebView wrapper)
├── 🗄️ prisma/            → Shared Neon PostgreSQL Schema (100 workers, 6 categories)
├── 📦 public/            → Static Assets & Built APK (public/sahyog.apk)
└── 📄 README.md          → Project Documentation
```

---

## 🚀 Live Deployments & URLs

| Project | Target | Platform | Live URL / Access |
|---|---|---|---|
| 📱 **Mobile Web App** | Smartphones & Tablets | Vercel | [https://shayog-rb55.vercel.app](https://shayog-rb55.vercel.app) |
| 🌐 **Desktop Website** | PC & Laptops | Vercel | Deploy `website/` folder (Guide below) |
| 🔧 **Admin Portal** | Operations Team | Vercel | [https://shayog-rb55.vercel.app/admin/portal](https://shayog-rb55.vercel.app/admin/portal) |
| 📲 **Android APK** | Android Devices | Direct Download | Served via `/sahyog.apk` (5.4 MB) |

---

## 🌐 Deploying the Desktop Website to a Separate Vercel URL

The desktop website is completely separate from the mobile web app and has its own desktop-first layout. Both share the **same Neon PostgreSQL database**, so user profiles and bookings are always synchronized.

### Quick Setup Steps:
1. Go to your [Vercel Dashboard](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Select this repository: `Jeelpatel2345/Shayog`.
4. In the configuration screen, click **Edit** next to **Root Directory** and select `website`.
5. Under **Environment Variables**, add:
   - `DATABASE_URL`: `postgresql://neondb_owner:npg_8czO3KtAngQZ@ep-sparkling-darkness-axp25cq4-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require`
   - `NEXTAUTH_SECRET`: `sahyog-desktop-secret-key-2025`
6. Click **Deploy**.
7. Vercel will create your new separate desktop website URL (e.g. `sahyog-web.vercel.app`).

---

## 📱 Mobile Web App (`src/`)

- **Design**: Mobile-first responsive app container (`max-w-md` on phones, clean navbar on desktop).
- **Interactive Map**: Real Leaflet / OpenStreetMap GPS tracking with simulated worker motion.
- **OTP Auth**: 4-digit passwordless phone authentication with Neon DB session persistence.
- **Smart App Banner**: Displays APK download button to web users; automatically hidden inside the native APK.

```bash
# Run locally
npm install
npm run dev
```

---

## 🌐 Desktop Website (`website/`)

- **Design**: Desktop-first wide layout (`max-w-7xl`).
- **Catalog**: All 100+ workers categorized across 6 services (Cleaning, Plumbing, Electrician, Appliance Repair, Carpentry, Painting).
- **Filtering**: Instant client-side filters for Category, City (Ahmedabad, Surat, Vadodara, Rajkot), Rating, and Price.
- **Price Calculator**: Real-time hourly, half-day (10% off), and full-day (20% off) booking calculator.

```bash
# Run locally
cd website
npm install
npm run dev
```

---

## 🤖 Android APK (`android-apk/`)

- Native Android Studio project wrapping the mobile web app inside an optimized `WebView`.
- Injects custom `SahYogApp/1.0` User-Agent string so the web app can hide redundant download buttons.
- Supports pull-to-refresh, hardware back button navigation, and instant direct-to-home launch.

```bash
# Build APK
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
gradlew.bat assembleDebug
```

---

## 🗄️ Database & Technology Stack

- **Database**: Neon Serverless PostgreSQL
- **ORM**: Prisma ORM v5.22.0
- **Framework**: Next.js 14 (App Router)
- **UI & Styling**: Tailwind CSS, Lucide Icons
- **State Management**: Zustand
