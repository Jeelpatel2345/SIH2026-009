/**
 * SahYog Intelligent AI Diagnostic & Worker Recommendation Engine
 * Trained on 300 Certified Workers Dataset & Official Benchmark Labor Pricing Guides.
 * Analyzes domestic & community inquiries, diagnoses root causes, recommends
 * certified workers, official labor rates, and direct booking actions.
 */

import { benchmarkServices } from '@/data/benchmarkPricing';
import { getTopWorkers, certifiedWorkers300 } from '@/data/workersDataset300';

export interface AIResponse {
  reply: string;
  recommendedWorker?: 'Plumber' | 'Electrician' | 'Carpenter' | 'Deep Cleaning' | 'Appliance Repair' | 'Painter' | null;
  estimatedCost?: string;
  actionText?: string;
  actionHref?: string;
  quickFollowUps?: string[];
}

export function diagnoseUserQuery(rawQuery: string): AIResponse {
  const query = rawQuery.trim();
  const lower = query.toLowerCase();

  // 1. Language detection
  const isGujarati = /[\u0A80-\u0AFF]/.test(query) || 
    lower.includes('gujarati') || lower.includes('ગુજરાતી') || lower.includes('નળ') || lower.includes('પાણી') || lower.includes('પંખો') || lower.includes('કારીગર');

  const isHindi = /[\u0900-\u097F]/.test(query) || 
    lower.includes('hindi') || lower.includes('हिन्दी') || lower.includes('पानी') || lower.includes('नल') || lower.includes('पंखा') || lower.includes('कारीगर');

  // Detect city if mentioned
  const cities = ['ahmedabad', 'surat', 'vadodara', 'rajkot', 'gandhinagar', 'delhi', 'mumbai', 'bengaluru', 'pune', 'hyderabad'];
  const detectedCity = cities.find(c => lower.includes(c));
  const cityLabel = detectedCity ? detectedCity.charAt(0).toUpperCase() + detectedCity.slice(1) : undefined;

  // ==========================================
  // 1. COMMUNITY & SOCIETY SERVICES
  // ==========================================
  if (
    lower.includes('community') || lower.includes('society') || lower.includes('apartment') ||
    lower.includes('complex') || lower.includes('સોસાયટી') || lower.includes('सामूहिक') || lower.includes('सोसायटी')
  ) {
    const topPlumbers = getTopWorkers('Plumbing', cityLabel, 2);
    const topCleaners = getTopWorkers('Cleaning', cityLabel, 2);

    return {
      reply: `🏢 **SahYog Community & Housing Society Services (સામૂહિક સોસાયટી સેવાઓ):**\n\n` +
        `We provide bulk residential society maintenance, commercial contracts & dedicated facility teams across Gujarat:\n\n` +
        `1. 💧 **Society Water Tank Deep Cleaning & UV Disinfection:** ₹1,500 – ₹4,500 / tank\n` +
        `   • *Scope:* Rotary jet scrubbing, sludge extraction pump, antibacterial chlorine misting.\n\n` +
        `2. 🧹 **Apartment Common Area & Parking Sanitation:** ₹2,500 – ₹8,000 / society\n` +
        `   • *Scope:* Lobbies, staircases, clubhouse buffing, and storm drain clearing.\n\n` +
        `3. ⚡ **Main Distribution Panel & Streetlight Maintenance:** ₹2,000 – ₹7,500 / visit\n` +
        `   • *Scope:* DG synchronizing panel inspection, campus bollards, earthing pits resistance check.\n\n` +
        `4. 🔧 **Central Hydro-Pneumatic Booster Pump AMC:** ₹3,000 – ₹12,000 / quarter\n` +
        `   • *Scope:* Submersible pump health, pressure tank gauges, mainline leak detection.\n\n` +
        `5. 🤝 **Bulk Society Residential Care AMC Package:** ₹8,000 – ₹25,000 / month\n` +
        `   • Dedicated multi-skilled technician team on-call for all residents with priority SLAs.\n\n` +
        (cityLabel ? `🌟 **Top Available Society Partners in ${cityLabel}:**\n` +
          `• ${topPlumbers[0] ? `${topPlumbers[0].name} (Plumbing, ${topPlumbers[0].rating}★, ${topPlumbers[0].phone})` : 'Certified Plumber Team'}\n` +
          `• ${topCleaners[0] ? `${topCleaners[0].name} (Cleaning, ${topCleaners[0].rating}★, ${topCleaners[0].phone})` : 'Sanitation Crew'}\n\n` : '') +
        `*Would you like to schedule a free Society Site Survey or request a bulk contract quotation?*`,
      recommendedWorker: 'Plumber',
      estimatedCost: 'Custom Society Quotation',
      actionText: 'Request Society Service Inspection →',
      actionHref: '/services',
      quickFollowUps: ['Society water tank cleaning quote', 'Common area cleaning cost', 'Apartment electrical AMC']
    };
  }

  // ==========================================
  // 2. GUJARATI HANDLER WITH BENCHMARK RATES
  // ==========================================
  if (isGujarati) {
    if (lower.includes('નળ') || lower.includes('પાણી') || lower.includes('લીકેજ') || lower.includes('ટાંકી') || lower.includes('ડ્રેનેજ') || lower.includes('પ્લમ્બ')) {
      const topP = getTopWorkers('Plumbing', cityLabel, 2);
      return {
        reply: `🔧 **સહયોગ પ્લમ્બિંગ માર્ગદર્શન અને ઓફિશિયલ રેટ્સ:**\n\n` +
          `• **નળ રીપેર / નવું ફિટિંગ:** ₹150 – ₹400 / નંગ\n` +
          `• **વોશબેસિન / સિંક / ડ્રેનેજ બ્લોકેજ:** ₹300 – ₹1,200 / પોઈન્ટ\n` +
          `• **દીવાલ અંદર પાઇપ લીકેજ રીપેર:** ₹500 – ₹2,500 / જોબ\n` +
          `• **પાણીની ટાંકી ફિટિંગ / વોટર ટેન્ક:** ₹800 – ₹3,000 / ટાંકી\n` +
          `• **વોટર પંપ / મોટર સેટઅપ:** ₹600 – ₹1,500 / પંપ\n\n` +
          (cityLabel && topP[0] ? `🌟 **${cityLabel} માં ટોચના વેરિફાઇડ પ્લમ્બર:**\n• **${topP[0].name}** (${topP[0].rating}★, અનુભવ: ${topP[0].experienceYears} વર્ષ, દર: ₹${topP[0].hourlyRate}/કલાક)\n\n` : '') +
          `• **સુરક્ષા નિયમ:** કારીગર ઘરે આવે ત્યારે જ 4-અંકનો OTP આપવો. કામ પૂર્ણ થયા પછી જ પેમેન્ટ કરવું!`,
        recommendedWorker: 'Plumber',
        estimatedCost: '₹150 – ₹1,200 (કામ મુજબ)',
        actionText: 'વેરિફાઇડ પ્લમ્બર બુક કરો →',
        actionHref: '/services',
        quickFollowUps: ['નળ બદલવાનો ચાર્જ?', 'વોશબેસિન બ્લોક છે', 'OTP સુરક્ષા કેવી રીતે કામ કરે છે?']
      };
    }

    if (lower.includes('લાઈટ') || lower.includes('પંખો') || lower.includes('mcb') || lower.includes('વાયર') || lower.includes('સ્પાર્ક') || lower.includes('ઇલેક્ટ્રિ')) {
      const topE = getTopWorkers('Electrician', cityLabel, 2);
      return {
        reply: `⚡ **ઇલેક્ટ્રિકલ સેફ્ટી અને સ્ટાન્ડર્ડ ચાર્જીસ:**\n\n` +
          `• **સ્વીચ / સોકેટ / બોર્ડ રીપેર:** ₹100 – ₹250 / પોઈન્ટ\n` +
          `• **છતનો પંખો ફિટિંગ / રીપેર:** ₹200 – ₹450 / નંગ\n` +
          `• **MCB / DB બોક્સ ટ્રીપિંગ સોલ્યુશન:** ₹300 – ₹1,500 / જોબ\n` +
          `• **ઇન્વર્ટર અને બેટરી ઇન્સ્ટોલેશન:** ₹500 – ₹1,200 / સેટઅપ\n` +
          `• **શોર્ટ સર્કિટ અને ફોલ્ટ ચેકિંગ:** ₹500 – ₹1,800 / વિઝિટ\n\n` +
          (cityLabel && topE[0] ? `🌟 **${cityLabel} માં પ્રમાણિત ઇલેક્ટ્રિશિયન:**\n• **${topE[0].name}** (${topE[0].rating}★, રિવ્યુ: ${topE[0].reviewsCount}, દર: ₹${topE[0].hourlyRate}/કલાક)\n\n` : '') +
          `⚠️ **ચેતવણી:** શોર્ટ સર્કિટ વખતે મેઇન સ્વીચ તરત બંધ કરો. ભીના હાથે અડવું નહીં!`,
        recommendedWorker: 'Electrician',
        estimatedCost: '₹100 – ₹450 થી શરૂ',
        actionText: 'ઇલેક્ટ્રિશિયન બુક કરો →',
        actionHref: '/services',
        quickFollowUps: ['પંખો અવાજ કરે છે', 'MCB વારંવાર ટ્રીપ થાય છે', 'સ્વીચ બોર્ડ બદલવું છે']
      };
    }

    if (lower.includes('સફાઈ') || lower.includes('ક્લિનિંગ') || lower.includes('સોફા')) {
      return {
        reply: `🧹 **પ્રોફેશનલ ડીપ ક્લિનિંગ રેટ્સ:**\n\n` +
          `• **આખું ઘર ડીપ ક્લિનિંગ (1–3 BHK):** ₹2,500 – ₹7,500 / જોબ\n` +
          `• **રસોડું (Kitchen) ડીપ ક્લિનિંગ:** ₹1,200 – ₹2,500 / કિચન\n` +
          `• **બાથરૂમ ડીપ સેનિટાઈઝેશન:** ₹500 – ₹1,200 / બાથરૂમ\n` +
          `• **સોફા અને ગાદી ડ્રાયક્લિનિંગ:** ₹300 – ₹500 / સીટ\n` +
          `• **કાર્પેટ શેમ્પૂઇંગ:** ₹15 – ₹30 / ચોરસ ફૂટ\n\n` +
          `ઇકો-ફ્રેન્ડલી અને હોસ્પિટલ ગ્રેડ સેનિટાઇઝેશન મશીનો સાથે સેવા આપવામાં આવે છે.`,
        recommendedWorker: 'Deep Cleaning',
        estimatedCost: '₹500 – ₹2,500',
        actionText: 'ક્લિનિંગ સેવા બુક કરો →',
        actionHref: '/services',
        quickFollowUps: ['સોફા ક્લિનિંગ ચાર્જ', 'બાથરૂમ ટાઇલ્સ સફાઈ', 'ફુલ હોમ ડીપ ક્લિનિંગ']
      };
    }

    return {
      reply: `🙏 **નમસ્તે! સહયોગ (SahYog) AI સહાયકમાં તમારું સ્વાગત છે.**\n\n` +
        `અમારી પાસે 300+ પ્રમાણિત કારીગરો ગુજરાતભરમાં ઉપલબ્ધ છે:\n` +
        `1. 💧 **પ્લમ્બિંગ (નળ, પાઇપ, ડ્રેનેજ, ટાંકી):** ₹150 થી શરૂ\n` +
        `2. ⚡ **ઇલેક્ટ્રિશિયન (પંખો, MCB, સ્વીચ, વાયરિંગ):** ₹100 થી શરૂ\n` +
        `3. 🧹 **ડીપ ક્લિનિંગ (ઘર, સોફા, કિચન, બાથરૂમ):** ₹300 થી શરૂ\n` +
        `4. 🪚 **સુથારકામ (દરવાજો, લોક, ફર્નિચર):** ₹299 થી શરૂ\n` +
        `5. 🏢 **સોસાયટી મેઇન્ટેનન્સ (સામૂહિક ટાંકી સફાઈ, લાઈટ્સ):** પેકેજ રેટ\n\n` +
        `તમારી સમસ્યા અને તમારું શહેર જણાવો, હું ચોક્કસ ભાવ અને ટોચના કારીગર બતાવીશ!`,
      actionText: 'બધી સેવાઓ જુઓ →',
      actionHref: '/services',
      quickFollowUps: ['નળ લીકેજ છે', 'MCB સ્વીચ ટ્રીપ થાય છે', 'સોસાયટી ટાંકી સફાઈ']
    };
  }

  // ==========================================
  // 3. HINDI HANDLER WITH BENCHMARK RATES
  // ==========================================
  if (isHindi) {
    if (lower.includes('नल') || lower.includes('पानी') || lower.includes('लीक') || lower.includes('पाइप') || lower.includes('प्लंबर') || lower.includes('टंकी')) {
      const topP = getTopWorkers('Plumbing', cityLabel, 2);
      return {
        reply: `🔧 **प्लंबिंग सेवा दर सूची और विशेषज्ञ सहायता:**\n\n` +
          `• **नल और मिक्सर रिपेयर / नया इंस्टॉलेशन:** ₹150 – ₹400 / यूनिट\n` +
          `• **ड्रेन व सिंक ब्लॉकेज क्लियरिंग:** ₹300 – ₹1,200 / पॉइंट\n` +
          `• **दीवार में छुपा हुआ पाइप लीकेज रिपेयर:** ₹500 – ₹2,500 / जॉब\n` +
          `• **पानी की टंकी फिटिंग व प्लंबिंग:** ₹800 – ₹3,000 / टंकी\n` +
          `• **मोटर / वाटर पंप सेटअप:** ₹600 – ₹1,500 / पंप\n\n` +
          (cityLabel && topP[0] ? `🌟 **${cityLabel} के शीर्ष प्रमाणित प्लंबर:**\n• **${topP[0].name}** (रेटिंग: ${topP[0].rating}★, अनुभव: ${topP[0].experienceYears} वर्ष, दर: ₹${topP[0].hourlyRate}/घंटा)\n\n` : '') +
          `🛡️ **सहयोग सुरक्षा:** कामगार के आगमन पर ही 4-अंकीय OTP दें। काम पूरा होने पर UPI या नकद से भुगतान करें!`,
        recommendedWorker: 'Plumber',
        estimatedCost: '₹150 – ₹1,200',
        actionText: 'प्रमाणित प्लंबर बुक करें →',
        actionHref: '/services',
        quickFollowUps: ['नल बदलने का खर्च?', 'वॉशबेसिन चोक है', 'OTP कैसे काम करता है?']
      };
    }

    if (lower.includes('लाइट') || lower.includes('पंखा') || lower.includes('mcb') || lower.includes('शॉर्ट') || lower.includes('इलेक्ट')) {
      const topE = getTopWorkers('Electrician', cityLabel, 2);
      return {
        reply: `⚡ **इलेक्ट्रिकल सुरक्षा दिशा-निर्देश व दरें:**\n\n` +
          `• **स्विच, सॉकेट व बोर्ड रिपेयर:** ₹100 – ₹250 / पॉइंट\n` +
          `• **सीलिंग फैन इंस्टॉलेशन व रिपेयर:** ₹200 – ₹450 / यूनिट\n` +
          `• **MCB व डिस्ट्रीब्यूशन बॉक्स सेटअप:** ₹300 – ₹1,500 / जॉब\n` +
          `• **इन्वर्टर और बैटरी इंस्टॉलेशन:** ₹500 – ₹1,200 / सेटअप\n` +
          `• **शॉर्ट सर्किट व फॉल्ट टेस्टिंग:** ₹500 – ₹1,800 / विजिट\n\n` +
          (cityLabel && topE[0] ? `🌟 **${cityLabel} के शीर्ष इलेक्ट्रीशियन:**\n• **${topE[0].name}** (रेटिंग: ${topE[0].rating}★, अनुभव: ${topE[0].experienceYears} वर्ष, दर: ₹${topE[0].hourlyRate}/घंटा)\n\n` : '') +
          `⚠️ **सतर्कता:** बार-बार ट्रिप होने वाले MCB को जबरन ऊपर न धकेलें। मुख्य स्विच बंद करें।`,
        recommendedWorker: 'Electrician',
        estimatedCost: '₹100 – ₹450 से शुरू',
        actionText: 'इलेक्ट्रीशियन बुक करें →',
        actionHref: '/services',
        quickFollowUps: ['पंखा आवाज कर रहा है', 'MCB बार-बार गिरती है', 'स्विच बोर्ड बदलना है']
      };
    }
  }

  // ==========================================
  // 4. ENGLISH BENCHMARK PRICE MATCHER (FROM 3 PDF GUIDES)
  // ==========================================

  // --- CLEANING BENCHMARKS ---
  if (lower.includes('sofa') || lower.includes('upholstery')) {
    return {
      reply: `🛋️ **Sofa & Upholstery Cleaning Benchmark:**\n\n` +
        `• **Official Rate:** **₹300 – ₹500 / seat**\n` +
        `• **Scope & Inclusions:** Wet vacuuming, high-grade fabric shampooing, moisture extraction, and localized spot stain treatment.\n` +
        `• **Drying Time:** 2–3 hours with air circulation.\n` +
        `• **Equipment:** Industrial extraction machines with fabric-safe PH-neutral solutions.`,
      recommendedWorker: 'Deep Cleaning',
      estimatedCost: '₹300 – ₹500 / seat',
      actionText: 'Book Sofa Cleaning →',
      actionHref: '/services',
      quickFollowUps: ['Carpet cleaning rate', 'Kitchen deep cleaning cost', 'Full home cleaning']
    };
  }

  if (lower.includes('carpet') || lower.includes('rug')) {
    return {
      reply: `🧹 **Carpet & Rug Shampooing Benchmark:**\n\n` +
        `• **Official Rate:** **₹15 – ₹30 / sq. ft.**\n` +
        `• **Scope & Inclusions:** Dust mite extraction, deep fiber shampooing, and high-power moisture extraction.\n` +
        `• **Benefits:** Removes trapped allergens, stains, and restores pile texture.`,
      recommendedWorker: 'Deep Cleaning',
      estimatedCost: '₹15 – ₹30 / sq. ft.',
      actionText: 'Book Carpet Shampooing →',
      actionHref: '/services',
      quickFollowUps: ['Sofa cleaning price', 'Living room deep clean']
    };
  }

  if (lower.includes('kitchen') && (lower.includes('clean') || lower.includes('degreas') || lower.includes('chimney'))) {
    return {
      reply: `🍳 **Kitchen Deep Cleaning Benchmark:**\n\n` +
        `• **Official Rate:** **₹1,200 – ₹2,500 / kitchen**\n` +
        `• **Scope & Inclusions:** Degreasing wall tiles, stovetop, kitchen slab sanitization, external cabinet cleaning, and exterior chimney wipe-down.\n` +
        `• **Chemicals:** Non-corrosive heavy-duty degreasers safe for granite, quartz, and stainless steel.`,
      recommendedWorker: 'Deep Cleaning',
      estimatedCost: '₹1,200 – ₹2,500 / kitchen',
      actionText: 'Book Kitchen Deep Cleaning →',
      actionHref: '/services',
      quickFollowUps: ['Bathroom deep cleaning rate', 'Full home deep clean']
    };
  }

  if (lower.includes('bathroom') && (lower.includes('clean') || lower.includes('sanitiz') || lower.includes('tile') || lower.includes('scale'))) {
    return {
      reply: `🚿 **Bathroom Deep Sanitization Benchmark:**\n\n` +
        `• **Official Rate:** **₹500 – ₹1,200 / bathroom**\n` +
        `• **Scope & Inclusions:** Tile descaling, hard-water mineral stain removal, toilet pot sanitization, tile grout scrubbing, and chrome fitting polishing.`,
      recommendedWorker: 'Deep Cleaning',
      estimatedCost: '₹500 – ₹1,200 / bathroom',
      actionText: 'Book Bathroom Sanitization →',
      actionHref: '/services',
      quickFollowUps: ['Kitchen deep cleaning', 'Drain blockage clearing']
    };
  }

  if (lower.includes('move in') || lower.includes('move out') || lower.includes('empty home') || lower.includes('flat clean')) {
    return {
      reply: `🏡 **Move-In / Move-Out Cleaning Benchmark:**\n\n` +
        `• **Official Rate:** **₹3,500 – ₹9,000 / job**\n` +
        `• **Scope & Inclusions:** Detailed deep sanitization of empty homes, internal wardrobes, drawers, kitchen cabinets, window channels, and built-in appliances.`,
      recommendedWorker: 'Deep Cleaning',
      estimatedCost: '₹3,500 – ₹9,000 / job',
      actionText: 'Book Move-In Deep Cleaning →',
      actionHref: '/services',
      quickFollowUps: ['Full home cleaning cost', 'Post-construction cleaning']
    };
  }

  if (lower.includes('post construction') || lower.includes('debris') || lower.includes('renovation clean')) {
    return {
      reply: `🏗️ **Post-Construction Cleaning Benchmark:**\n\n` +
        `• **Official Rate:** **₹5 – ₹12 / sq. ft.**\n` +
        `• **Scope & Inclusions:** Heavy debris clearing, cement/paint splatter blade scraping, and fine silica dust vacuuming from all corners and ceiling ledges.`,
      recommendedWorker: 'Deep Cleaning',
      estimatedCost: '₹5 – ₹12 / sq. ft.',
      actionText: 'Book Post-Construction Cleaners →',
      actionHref: '/services',
      quickFollowUps: ['Commercial office cleaning', 'Full home deep clean']
    };
  }

  if (lower.includes('office') || lower.includes('commercial clean')) {
    return {
      reply: `🏢 **Commercial Office Cleaning Benchmark:**\n\n` +
        `• **Official Rate:** **₹3 – ₹8 / sq. ft. (or ₹6,000 – ₹20,000 / month AMC)**\n` +
        `• **Scope & Inclusions:** Workstation desk disinfection, trash clearing, restroom sanitization, pantry hygiene care, and high-traffic floor buffing.`,
      recommendedWorker: 'Deep Cleaning',
      estimatedCost: '₹3 – ₹8 / sq. ft.',
      actionText: 'Book Commercial Cleaning →',
      actionHref: '/services',
      quickFollowUps: ['Society maintenance packages', 'Post-construction cleaning']
    };
  }

  // --- PLUMBING BENCHMARKS ---
  if (lower.includes('tap') || lower.includes('faucet') || lower.includes('mixer') || lower.includes('dripping')) {
    return {
      reply: `🚰 **Tap & Faucet Repair / Installation Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹150 – ₹400 / unit**\n` +
        `• **Scope & Inclusions:** Fixing dripping taps, cartridge replacement, spindle repair, or installing new mixer/faucets.\n` +
        `• **Spare Parts:** Replacement cartridges or Teflon tape billed at actual MRP.`,
      recommendedWorker: 'Plumber',
      estimatedCost: '₹150 – ₹400 / unit',
      actionText: 'Book Plumber for Tap Repair →',
      actionHref: '/services',
      quickFollowUps: ['Drain blockage clearing', 'Pipe leakage repair']
    };
  }

  if (lower.includes('drain') || lower.includes('choke') || lower.includes('clog') || lower.includes('blockage') || lower.includes('sink')) {
    return {
      reply: `🚽 **Drain & Pipe Blockage Clearing Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹300 – ₹1,200 / point**\n` +
        `• **Scope & Inclusions:** Mechanical snake wire/manual rodding to clear clogged washbasins, kitchen sinks, shower traps, or main nahani traps.`,
      recommendedWorker: 'Plumber',
      estimatedCost: '₹300 – ₹1,200 / point',
      actionText: 'Book Drain Cleaning Plumber →',
      actionHref: '/services',
      quickFollowUps: ['Toilet commode repair', 'Pipe leak concealed']
    };
  }

  if (lower.includes('toilet') || lower.includes('commode') || lower.includes('flush tank') || lower.includes('siphon')) {
    return {
      reply: `🚽 **Toilet & Commode Installation / Repair Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹400 – ₹1,800 / job**\n` +
        `• **Scope & Inclusions:** Flush tank kit fixing, siphon/inlet valve replacement, wax ring leak sealing, or complete commode replacement and floor bolting.`,
      recommendedWorker: 'Plumber',
      estimatedCost: '₹400 – ₹1,800 / job',
      actionText: 'Book Commode Repair →',
      actionHref: '/services',
      quickFollowUps: ['Tap repair cost', 'Pipe leakage repair']
    };
  }

  if (lower.includes('leak') || lower.includes('concealed') || lower.includes('seep') || lower.includes('dampness')) {
    return {
      reply: `💧 **Pipe Leakage & Concealed Repair Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹500 – ₹2,500 / job**\n` +
        `• **Scope & Inclusions:** Identifying wall dampness source, cutting/splicing damaged CPVC/UPVC/GI pipes, solvent welding, and pressure testing joints.\n` +
        `• **Emergency Tip:** Shut the main terrace water valve to stop immediate pressure flow.`,
      recommendedWorker: 'Plumber',
      estimatedCost: '₹500 – ₹2,500 / job',
      actionText: 'Book Leakage Specialist →',
      actionHref: '/services',
      quickFollowUps: ['Water tank plumbing', 'Bathroom complete fitout']
    };
  }

  if (lower.includes('geyser') || lower.includes('water heater')) {
    return {
      reply: `🔥 **Geyser & Water Heater Plumbing Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹350 – ₹800 / unit**\n` +
        `• **Scope & Inclusions:** Inlet/outlet connection hose braided fitting, non-return valve (NRV) installation, line flushing, and secure wall demounting/mounting.`,
      recommendedWorker: 'Plumber',
      estimatedCost: '₹350 – ₹800 / unit',
      actionText: 'Book Geyser Installation →',
      actionHref: '/services',
      quickFollowUps: ['Electrical geyser line setup', 'Pipe leakage repair']
    };
  }

  if (lower.includes('tank') && (lower.includes('water') || lower.includes('loft') || lower.includes('overhead'))) {
    return {
      reply: `💧 **Water Tank Installation & Plumbing Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹800 – ₹3,000 / tank**\n` +
        `• **Scope & Inclusions:** Overhead/loft tank pipeline setup, float/ball valve replacement, overflow & vent line plumbing, and union connector assembly.`,
      recommendedWorker: 'Plumber',
      estimatedCost: '₹800 – ₹3,000 / tank',
      actionText: 'Book Water Tank Plumber →',
      actionHref: '/services',
      quickFollowUps: ['Water pump setup', 'Society tank deep clean']
    };
  }

  if (lower.includes('pump') || lower.includes('motor') || lower.includes('submersible')) {
    return {
      reply: `⚙️ **Water Pump / Motor Setup Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹600 – ₹1,500 / pump**\n` +
        `• **Scope & Inclusions:** Centrifugal / submersible pump installation, suction & delivery line union fittings, non-return check valves, and bypass setup.`,
      recommendedWorker: 'Plumber',
      estimatedCost: '₹600 – ₹1,500 / pump',
      actionText: 'Book Pump Installation →',
      actionHref: '/services',
      quickFollowUps: ['Water tank plumbing', 'MCB electrical line setup']
    };
  }

  // --- ELECTRICIAN BENCHMARKS ---
  if (lower.includes('switch') || lower.includes('socket') || lower.includes('board') || lower.includes('dimmer')) {
    return {
      reply: `🔌 **Switch, Socket & Board Repair Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹100 – ₹250 / point**\n` +
        `• **Scope & Inclusions:** Replacing modular/regular switches, burnt sockets, dimmer switches, and loose terminal reconnection to prevent sparking.`,
      recommendedWorker: 'Electrician',
      estimatedCost: '₹100 – ₹250 / point',
      actionText: 'Book Electrician for Switchboard →',
      actionHref: '/services',
      quickFollowUps: ['Fan installation rate', 'MCB tripping issue']
    };
  }

  if (lower.includes('fan') && (lower.includes('install') || lower.includes('repair') || lower.includes('noise') || lower.includes('blade') || lower.includes('capacitor'))) {
    return {
      reply: `🌀 **Fan Installation & Repair Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹200 – ₹450 / unit**\n` +
        `• **Scope & Inclusions:** Ceiling/exhaust fan mounting, blade dynamic balancing, electronic regulator pairing, capacitor replacement, or motor re-wiring.`,
      recommendedWorker: 'Electrician',
      estimatedCost: '₹200 – ₹450 / unit',
      actionText: 'Book Fan Technician →',
      actionHref: '/services',
      quickFollowUps: ['Decorative lighting installation', 'Switchboard repair']
    };
  }

  if (lower.includes('mcb') || lower.includes('trip') || lower.includes('distribution board') || lower.includes('breaker') || lower.includes('fuse')) {
    return {
      reply: `⚡ **MCB & Distribution Board (DB) Setup Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹300 – ₹1,500 / job**\n` +
        `• **Scope & Inclusions:** Troubleshooting tripping breakers, replacing faulty single/double-pole MCBs, RCCB/ELCB installation, or complete DB box rewiring.\n` +
        `• **Safety Alert ⚠️:** If an MCB trips repeatedly, do not force it on. It prevents electrical fire from line overloading.`,
      recommendedWorker: 'Electrician',
      estimatedCost: '₹300 – ₹1,500 / job',
      actionText: 'Book MCB Specialist →',
      actionHref: '/services',
      quickFollowUps: ['Short circuit diagnosis', 'Inverter battery setup']
    };
  }

  if (lower.includes('inverter') || lower.includes('battery')) {
    return {
      reply: `🔋 **Inverter & Battery Installation Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹500 – ₹1,200 / setup**\n` +
        `• **Scope & Inclusions:** Mounting inverter system, battery heavy-gauge terminal cabling, earthing check, bypass line separation, and dual-load testing.`,
      recommendedWorker: 'Electrician',
      estimatedCost: '₹500 – ₹1,200 / setup',
      actionText: 'Book Inverter Installation →',
      actionHref: '/services',
      quickFollowUps: ['MCB DB board setup', 'Appliance power line setup']
    };
  }

  if (lower.includes('short circuit') || lower.includes('spark') || lower.includes('shock') || lower.includes('burn')) {
    return {
      reply: `⚡ **Short Circuit & Fault Diagnosis Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹500 – ₹1,800 / visit**\n` +
        `• **Scope & Inclusions:** Megger testing, tracing invisible insulation faults, earth leakages, burnt conduit wiring, and restoring localized power loss.`,
      recommendedWorker: 'Electrician',
      estimatedCost: '₹500 – ₹1,800 / visit',
      actionText: 'Emergency Electrician Visit →',
      actionHref: '/services',
      quickFollowUps: ['Full home rewiring cost', 'MCB DB box setup']
    };
  }

  if (lower.includes('wiring') || lower.includes('conduit') || lower.includes('rewiring')) {
    return {
      reply: `🛠️ **Full-Home Conduit Wiring / Rewiring Benchmark:**\n\n` +
        `• **Official Labor Rate:** **₹15 – ₹35 / sq. ft. (or ₹120 – ₹250 / point)**\n` +
        `• **Scope & Inclusions:** Complete rough-in wiring: running PVC conduit pipes, pulling FRLS copper cables, circuit tagging, and final switchboard assembly.`,
      recommendedWorker: 'Electrician',
      estimatedCost: '₹15 – ₹35 / sq. ft.',
      actionText: 'Book Wiring Consultation →',
      actionHref: '/services',
      quickFollowUps: ['Decorative lighting setup', 'MCB distribution board']
    };
  }

  // ==========================================
  // 5. CITY-BASED WORKER RECOMMENDATIONS (FROM 300 DATASET)
  // ==========================================
  if (cityLabel) {
    const topOverall = getTopWorkers(undefined, cityLabel, 3);
    if (topOverall.length > 0) {
      return {
        reply: `📍 **Top-Rated Certified SahYog Partners in ${cityLabel}:**\n\n` +
          topOverall.map(w => `• **${w.name}** — ${w.service}\n  ⭐ ${w.rating} / 5.0 (${w.reviewsCount} verified reviews) • ${w.experienceYears} yrs exp • ₹${w.hourlyRate}/hr\n  📞 Contact: ${w.phone}`).join('\n\n') +
          `\n\n🛡️ **Safety Reminder:** When your partner arrives, they will ask for your unique 4-digit Arrival OTP before beginning work!`,
        actionText: `View All Workers in ${cityLabel} →`,
        actionHref: `/services?city=${encodeURIComponent(cityLabel)}`,
        quickFollowUps: [`Electrician in ${cityLabel}`, `Plumber in ${cityLabel}`, `Cleaning in ${cityLabel}`]
      };
    }
  }

  // ==========================================
  // 6. GENERAL DEFAULT RESPONSE
  // ==========================================
  return {
    reply: `👋 **Welcome to SahYog AI Smart Diagnostic Assistant!**\n\n` +
      `I can diagnose issues, quote exact official benchmark rates, and connect you with 300+ certified local partners:\n\n` +
      `1. 💧 **Plumbing:** Tap repair (₹150–₹400), drain clearing (₹300–₹1,200), pipe leak (₹500–₹2,500), water tank (₹800–₹3,000)\n` +
      `2. ⚡ **Electrical:** Switchboard (₹100–₹250), fan repair (₹200–₹450), MCB trip (₹300–₹1,500), short circuit (₹500–₹1,800)\n` +
      `3. 🧹 **Cleaning:** Sofa shampoo (₹300–₹500/seat), kitchen degrease (₹1,200–₹2,500), 3BHK deep clean (₹2,500–₹7,500)\n` +
      `4. 🏢 **Community Services:** Society tank cleaning (₹1,500–₹4,500), common area sanitation, building AMC\n\n` +
      `*Tell me what problem you are facing and your city (e.g. "tap leaking in Ahmedabad" or "society water tank cleaning in Surat")!*`,
    actionText: 'Browse All 24 Services →',
    actionHref: '/services',
    quickFollowUps: ['Sofa cleaning rates', 'MCB switch tripping issue', 'Society water tank cleaning', 'Tap leakage repair']
  };
}
