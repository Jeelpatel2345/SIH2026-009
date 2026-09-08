# SahYog — Desktop Website

A complete desktop-first web platform for booking verified home service professionals across Gujarat and India.

## Key Features
- **Desktop-Optimized Wide Layouts**: Full browser view with responsive navigation, sidebars, and catalogs.
- **Shared Neon PostgreSQL Database**: Uses the exact same database as the mobile app and APK — bookings made on the website or mobile app sync in real-time.
- **100 Verified Workers Catalog**: Filter by all 6 categories (Cleaning, Plumbing, Electrician, Appliance Repair, Carpentry, Painting), city, rating, and experience.
- **Interactive Price Calculator**: Real-time hourly, half-day, and full-day rate calculation with transparent fee breakdown.
- **Direct OTP Authentication**: Passwordless mobile OTP login.

---

## Deploying to a Separate Vercel URL

To deploy this website on its own separate Vercel URL:

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Select your repository: `https://github.com/Jeelpatel2345/Shayog`.
4. In the **"Root Directory"** setting, click **Edit** and choose `sahyog-website`.
5. Under **Environment Variables**, add:
   - `DATABASE_URL`: `postgresql://neondb_owner:npg_8czO3KtAngQZ@ep-sparkling-darkness-axp25cq4-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require`
   - `NEXTAUTH_SECRET`: `sahyog-desktop-secret-key-2025`
6. Click **Deploy**.
7. Vercel will give you a new separate URL (for example: `sahyog-web.vercel.app` or custom domain).

---

## Local Development
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```
