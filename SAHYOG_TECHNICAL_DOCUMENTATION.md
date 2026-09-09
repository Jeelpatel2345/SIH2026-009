# SAHYOG (सहयोग) — COMPREHENSIVE TECHNICAL DOCUMENTATION & JURY PITCH DOSSIER

> **Platform Version:** 2.4.0 (Production Release)  
> **Prepared For:** Academic / Hackathon / Investor Jury Presentation  
> **Mission:** Democratizing trusted, transparent, and fair-wage on-demand home services across India through AI diagnosis, digital escrow, and verified local talent.

---

## 1. EXECUTIVE SUMMARY & PLATFORM VISION

### 1.1 The Problem Space
In India, the domestic and blue-collar home services sector exceeds **\$35 Billion**, yet remains over **85% informal and fragmented**:
1. **The Trust Deficit:** Customers fear fraud, unverified workers entering homes, and upfront payment loss when workers don't arrive.
2. **Worker Exploitation:** Skilled technicians (plumbers, electricians, carpenters) endure erratic payments, commission cuts (up to 30% on legacy platforms), and lack of formal verification/credit history.
3. **The Communication Gap:** Customers struggle to explain technical breakdowns ("sparking MCB", "reverse osmosis membrane leak", "water hammer"), leading to wrong tools, wrong technicians, and wasted hours.
4. **Connectivity Volatility:** Tier-2/3 cities and basement apartments frequently lose 4G connectivity, paralyzing standard web apps.

### 1.2 The SahYog Solution
**SahYog (सहयोग)** provides an end-to-end digital ecosystem combining:
- **Arrival 4-Digit OTP Escrow Handshake:** Guaranteed protection where payments are held safe until the worker arrives at the doorstep and verifies the customer's unique 4-digit OTP.
- **Intelligent Free-Form AI Repair Assistant:** Multi-lingual diagnostic engine that diagnoses descriptions in plain English, Hindi, and Gujarati, estimates repair costs, and recommends exact verified specialists.
- **Zero-Flicker Role Architecture:** Clean architectural separation between Customer Portal, Worker Partner Dashboard, and Central Admin Command.
- **Offline PWA Architecture:** Full offline service browsing, rate cards, and cached bookings powered by Service Workers.
- **Real-Time Twilio SMS & OTP Push Simulation:** Instant transactional alerts and verification codes for users and workers alike.

---

## 2. HIGH-LEVEL SYSTEM ARCHITECTURE

```
+---------------------------------------------------------------------------------------+
|                                    CLIENT LAYER                                       |
|                                                                                       |
|   +--------------------------+  +--------------------------+  +-------------------+   |
|   |   Mobile PWA Client      |  |     Desktop Website      |  |   Admin Command   |   |
|   |   (Next.js App Router)   |  |     (Next.js App Router) |  |   Portal (Neon DB)|   |
|   |   - Customer Dashboard   |  |     - Public Services    |  |   - KYC Review    |   |
|   |   - Worker Dashboard     |  |     - Instant Booking    |  |   - Escrow Audit  |   |
|   |   - Floating AI Bot      |  |     - AI Diagnostic Bot  |  |   - Worker Approv |   |
|   +------------+-------------+  +------------+-------------+  +---------+---------+   |
+----------------|-----------------------------|--------------------------|-------------+
                 |                             |                          |
                 +-----------------------------+--------------------------+
                                               |
                                     HTTPS / JSON / WSS
                                               |
+----------------------------------------------v----------------------------------------+
|                                APPLICATION API LAYER                                  |
|                               (Next.js Serverless Routes)                             |
|                                                                                       |
|   +-----------------------+  +-----------------------+  +-------------------------+   |
|   | /api/auth/*           |  | /api/bookings/*       |  | /api/admin/*            |   |
|   | - Twilio SMS OTP      |  | - Escrow creation     |  | - Audit stats           |   |
|   | - Session hydration   |  | - 4-digit OTP verify  |  | - Worker Aadhaar KYC    |   |
|   | - Role verification   |  | - Status state machine|  | - Financial reconciliation|
|   +-----------------------+  +-----------------------+  +-------------------------+   |
|                                                                                       |
|   +-------------------------------------------------------------------------------+   |
|   |                        In-Memory AI Diagnostic NLP Engine                     |   |
|   |              (Multi-intent, hazard detection, cost estimation, routing)       |   |
|   +-------------------------------------------------------------------------------+   |
+----------------------------------------------+----------------------------------------+
                                               |
                                        Prisma ORM (Pooler)
                                               |
+----------------------------------------------v----------------------------------------+
|                               PERSISTENCE & 3RD PARTY LAYER                           |
|                                                                                       |
|   +--------------------------+  +--------------------------+  +-------------------+   |
|   |   Neon PostgreSQL        |  |    Twilio REST API       |  | Leaflet / Mapbox  |   |
|   |   - Serverless Cloud DB  |  |    - SMS Verification    |  | - Real-time GPS   |   |
|   |   - ACID Transactions    |  |    - Transactional OTP   |  | - Worker Route    |   |
|   |   - Foreign Key Cascades |  |    - Worker Dispatch SMS |  | - Live Proximity  |   |
|   +--------------------------+  +--------------------------+  +-------------------+   |
+---------------------------------------------------------------------------------------+
```

---

## 3. CORE FEATURES & IMPLEMENTATION DETAILS

### 3.1 The 4-Digit Arrival OTP & Escrow Handshake
- **Why It Matters:** Conventional platforms either force advance payment (putting the customer at risk) or cash-on-delivery (leaving workers stranded without pay after travel).
- **How SahYog Solves It:**
  1. Customer books a service and chooses payment method (UPI / Card / Cash on Arrival).
  2. The system generates a cryptographic 4-digit `arrivalOtp` tied to `Booking.id`.
  3. The OTP is displayed **strictly on the Customer's live tracking screen**.
  4. The Worker travels to the customer's location using live turn-by-turn map directions.
  5. Upon arrival at the doorstep, the Worker taps **"Arrived? Enter Customer 4-Digit OTP"**.
  6. Submitting the OTP calls `/api/bookings/[id]/verify-otp`.
  7. When verified, the booking atomically updates to `IN_PROGRESS` with `otpVerifiedAt = NOW()`.
  8. Once work finishes, the worker marks the job completed and collects the payment with zero disputes.

### 3.2 Twilio SMS & OTP Notification Engine
- **Endpoint:** `POST /api/auth/send-otp`
- **Payload:** `{ phone: string }`
- **Behavior:**
  - Validates 10-digit Indian phone number (`/^[6-9]\d{9}$/`).
  - Generates secure random 6-digit numeric OTP.
  - Formats destination to E.164 (`+91...`).
  - If Twilio environment variables (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`) are present, dispatches real SMS message:
    `"Your SahYog verification OTP is {OTP}. Valid for 5 minutes. Do not share this code."`
  - In local development or jury demo mode, falls back gracefully while serving an authentic top-sliding interactive push notification banner (`MESSAGES • Twilio / SahYog SMS • now`) with a 1-tap **Auto Fill** button.

### 3.3 Free-Form AI Diagnostic Assistant (`aiDiagnosticEngine.ts`)
- **Capabilities:**
  - Answers manual, arbitrary user queries rather than being restricted to canned buttons.
  - Multi-lingual tokenization: Understands Hindi/Gujarati terms like *paani tapak raha hai*, *fan awaz kare che*, *bijli ka short circuit*, *bijli gayab*, *colour karvano che*.
  - Hazard Detection: Instantly flags hazardous emergencies (gas smell, electrical sparks, black smoke, gushing pipe bursts) with critical safety warnings before routing to emergency technicians.
  - Transparent Cost Estimator: Automatically breaks down visit charges, labor rates, and part replacement estimates.
  - Direct Routing Action: Emits dynamic CTAs directly linking to pre-filtered worker categories.

### 3.4 Offline Mode & Service Worker Resilience
- **Service Worker (`sw.js`):**
  - Caches core app shells (`/`, `/welcome`, `/login`, `/manifest.json`, `/logo.png`).
  - Pre-caches static category lists, standard rate cards, and emergency hotlines.
  - Uses `Cache-First` strategy for static UI assets, and `Network-First` with cache fallback for API endpoints.
- **Offline Banner (`OfflineBanner.tsx`):**
  - Continuously monitors `window.addEventListener('online')` and `'offline'`.
  - Non-intrusively alerts the user: *"You are currently offline. Viewing cached bookings and offline rate cards."* with an instant retry ping.

### 3.5 Role Integrity & Zero-Flicker Hydration
- Eliminates Next.js client-side re-render role flickering by strictly initializing and locking `localStorage.setItem('sahyog-role', 'WORKER' | 'CUSTOMER')` on respective dashboards.
- First-launch guard: New visitors or downloads from the website are welcomed with an animated Splash Screen (`/`) -> Onboarding (`/welcome`) -> Mobile OTP Login (`/login`) -> Respective Dashboard, preventing unauthenticated skips directly to customer screens.

---

## 4. DATABASE ARCHITECTURE (NEON POSTGRESQL + PRISMA)

### 4.1 Key Relational Entities
```prisma
model User {
  id            String          @id @default(uuid())
  phone         String          @unique
  fullName      String?
  email         String?         @unique
  role          UserRole        @default(CUSTOMER) // CUSTOMER | WORKER | ADMIN
  avatarUrl     String?
  city          String?
  address       String?
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  
  workerProfile WorkerProfile?
  bookings      Booking[]       @relation("CustomerBookings")
  reviews       Review[]
}

model WorkerProfile {
  id             String         @id @default(uuid())
  userId         String         @unique
  user           User           @relation(fields: [userId], references: [id])
  category       String
  experienceYrs  Int            @default(1)
  rating         Float          @default(4.8)
  reviewCount    Int            @default(0)
  hourlyRate     Float          @default(250)
  isAvailable    Boolean        @default(true)
  isVerified     Boolean        @default(false) // Aadhaar / Police Verification
  aadhaarNumber  String?
  aadhaarDocUrl  String?
  assignedBookings Booking[]    @relation("WorkerBookings")
}

model Booking {
  id              String        @id @default(uuid())
  customerId      String
  customer        User          @relation("CustomerBookings", fields: [customerId], references: [id])
  workerId        String?
  worker          WorkerProfile? @relation("WorkerBookings", fields: [workerId], references: [id])
  serviceTitle    String
  serviceCategory String
  status          BookingStatus @default(PENDING) // PENDING, CONFIRMED, ACCEPTED, IN_PROGRESS, COMPLETED, CANCELLED
  scheduledDate   DateTime
  scheduledTime   String
  serviceLocation String
  totalAmount     Float
  arrivalOtp      String?       // 4-digit verification code
  otpVerifiedAt   DateTime?
  paymentStatus   PaymentStatus @default(PENDING) // PENDING, ESCROW_HELD, RELEASED, REFUNDED
  paymentTiming   String        @default("AFTER_SERVICE")
  createdAt       DateTime      @default(now())
}
```

---

## 5. API REFERENCE MATRIX

| Route | Method | Purpose | Auth / Role |
|---|---|---|---|
| `/api/auth/send-otp` | `POST` | Generates & dispatches 6-digit SMS via Twilio | Public |
| `/api/auth/verify-otp` | `POST` | Validates OTP, issues JWT/session, creates user | Public |
| `/api/auth/session` | `GET` | Returns active user session & role | Bearer / Cookie |
| `/api/auth/logout` | `POST` | Invalidates session tokens | Authenticated |
| `/api/user/profile` | `GET / PUT` | Reads or updates user profile attributes | Authenticated |
| `/api/services` | `GET` | Fetches available service categories & rates | Public |
| `/api/workers` | `GET` | Fetches verified service providers nearby | Public |
| `/api/bookings` | `GET / POST` | Lists bookings or books a new service provider | Customer / Worker |
| `/api/bookings/[id]/verify-otp` | `POST` | Validates 4-digit arrival OTP & starts job | Worker |
| `/api/bookings/[id]/complete` | `POST` | Marks job complete & triggers escrow payout | Worker / Customer |
| `/api/admin/auth/login` | `POST` | Admin authentication with bcrypt credentials | Admin |
| `/api/admin/verification` | `GET / POST` | Approves or rejects worker Aadhaar KYC docs | Admin |
| `/api/admin/stats` | `GET` | Returns live Gross Merchandise Value, jobs, active workers | Admin |

---

## 6. JURY PRESENTATION CHEAT-SHEET & DEFENSE STRATEGY

### Q1: "Why would a customer use SahYog over Urban Company or Local Directory apps?"
> **Answer:** "Urban Company charges heavy margins (20-30%), standardizes services into rigid expensive packages, and frequently does not protect users if a technician delays. Local directories (JustDial/Sulekha) simply sell customer phone numbers to spammers. **SahYog solves this with three core differentiators:**
> 1. **4-Digit Arrival OTP Digital Escrow:** No money changes hands until the worker is physically verified at the doorstep.
> 2. **AI Repair Diagnosis:** Users don't need technical jargon—they explain the problem naturally, and our AI identifies the exact worker, parts, and estimated price before booking.
> 3. **Fair Worker Economics:** 95% of the fee goes directly to the worker, fostering higher quality of work, lower churn, and competitive pricing."

### Q2: "How do you ensure user safety when an unknown worker enters a home?"
> **Answer:** "Safety is built into the architecture via our **Triple-Verification Protocol**:
> 1. **Government ID & Aadhaar KYC:** Workers must submit government documents, audited directly via the Admin Command Center before receiving bookings.
> 2. **Digital Handshake OTP:** Ensures the worker at the door is the exact verified individual assigned in the system.
> 3. **In-App Real-time GPS Tracking & Emergency Hotline:** Family members can track the worker's ETA live on an interactive map."

### Q3: "What happens if a user is offline or in a basement with zero internet?"
> **Answer:** "SahYog is engineered as an **Offline-First PWA**. Our Service Worker caches essential app assets, emergency contact numbers, service catalogs, and rate cards. Even without connectivity, users can look up transparent pricing and view booked appointments."

### Q4: "How does the AI Assistant handle complex or unusual home issues?"
> **Answer:** "Our AI engine uses multi-layer semantic tokenization covering English, Hindi, and Gujarati idioms. It handles manual queries—whether someone describes a *'leaking toilet float valve'*, *'burnt smell from power switch'*, or *'lock sticking in winter'*. It provides a multi-point diagnosis: immediate safety triage, recommended technician type, transparent estimated cost, and a 1-tap booking button."

---

## 7. PROJECT REPOSITORY STRUCTURE

```
visily-multiscreens/
├── sahyog/                          # Primary Production Mobile Web/PWA Application
│   ├── public/
│   │   ├── sw.js                    # Service Worker for Offline PWA
│   │   ├── manifest.json            # PWA Web App Manifest
│   │   └── logo.png                 # Official SahYog Branding Logo
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx             # Splash Screen & First-Launch Router
│   │   │   ├── welcome/page.tsx     # Onboarding Carousel
│   │   │   ├── login/page.tsx       # Twilio SMS OTP Authentication
│   │   │   ├── customer/dashboard/  # Customer Portal with AI Assistant
│   │   │   ├── worker/dashboard/    # Worker Dashboard with Arrival OTP Action
│   │   │   ├── worker/bookings/     # Worker Bookings & Escrow Collection
│   │   │   ├── profile/page.tsx     # Real-Time Synchronized Profile
│   │   │   └── api/                 # Next.js Serverless API Endpoints
│   │   ├── components/
│   │   │   ├── FloatingChatbot.tsx  # Free-Form AI Diagnostic Assistant
│   │   │   ├── OfflineBanner.tsx    # Reactive Connectivity Listener
│   │   │   └── RealTrackingMap.tsx  # Leaflet GPS Live Worker Tracker
│   │   └── lib/
│   │       ├── aiDiagnosticEngine.ts# Multi-lingual NLP Diagnosis Engine
│   │       └── prisma.ts            # Neon PostgreSQL Client Pooler
│   └── prisma/
│       └── schema.prisma            # Relational PostgreSQL Schema
│
└── sahyog-website/                  # Marketing, SEO & Customer Web Platform
    ├── public/                      # Static Assets & Service Worker
    └── src/app/                     # Desktop-Optimized Service Catalog & Booking
```

---

*Compiled and verified for the SahYog Engineering Defense. All systems active and operational.*
