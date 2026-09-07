# SahYog (सहयोग) - Community Home Services Platform

SahYog is an on-demand community home services platform for Indian households connecting users with background-verified local service professionals (electricians, plumbers, home cleaning experts, appliance technicians).

---

## 🌟 Key Features

### 👤 Customer Flow
- **Home Dashboard**: Browse top categories (Cleaning, Plumbing, Electrician, Repair), view background-check trust badges, and upcoming appointments.
- **Service & Worker Search**: Filter by ratings (4.5+), experience, distance (km), and hourly rates in Indian Rupees (₹).
- **Worker Profile Detail**: Bio, verified Aadhar badge, completed jobs, skills, and spoken languages.
- **Booking & Scheduling**: Interactive date and time slot selector, location details, transparent price breakdown (Labor + Materials + Platform Trust Fee).
- **Payment & Escrow**: UPI (PhonePe, Google Pay, Paytm), Debit/Credit Cards, Net Banking, and Cash after Service.
- **Live Job Tracking**: Simulated GPS map, heading status, and 4-digit arrival safety OTP (`5 8 2 1`).
- **Interactive Cancellation**: Dedicated booking management with 1-tap cancellation and 100% refund guarantee.

### 🛠️ Worker Flow
- **Worker Dashboard**: Online/Offline availability toggle, weekly earnings progress (target tracking), active job turn-by-turn navigation.
- **Earnings & Payouts**: 6-month interactive earnings trend chart, platform commission breakdown, and tax reports.
- **Onboarding Wizard**: Aadhar verification upload and service category selection.

### 💬 In-App Communication & AI Assistant
- **2-Person Live Chat**: Bidirectional chat between Customer and Worker with quick replies, location card sharing, and audio/video call shortcuts.
- **SahYog AI Assistant (सहयोग मित्र)**: Instant diagnostic repair assistance for plumbing, electrical safety, and pricing guidance in English, हिन्दी, and ગુજરાતી.

### 📊 Admin Console
- **Analytics Hub**: User growth metrics, market share across major cities (Ahmedabad, Surat, Rajkot, Vadodara), dual-line booking trends.
- **Worker Verification & Inspection**: AI OCR document review queue, Aadhar card inspection, and approval/rejection decision panel.
- **User Management**: Complete directory of platform participants.
- **Bookings Ledger**: Complete order history, status filters, and gross value metrics.
- **Financial Analytics**: Revenue growth charts, commission tracking, and platform settings.

---

## 🚀 One-Click Deployment to Vercel

1. Push or fork this repository to your GitHub account: `https://github.com/Jeelpatel2345/Shayog.git`.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the **`Shayog`** repository.
4. Keep the default settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `prisma generate && next build`
   - **Install Command**: `npm install`
5. Click **"Deploy"**. Your app will be live with a secure `https://...vercel.app` URL!

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/Jeelpatel2345/Shayog.git
cd Shayog

# Install dependencies
npm install

# Push database schema & seed demo data
npx prisma db push
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
