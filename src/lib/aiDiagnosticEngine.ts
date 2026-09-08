/**
 * SahYog Intelligent AI Diagnostic & Worker Recommendation Engine
 * Analyzes free-form domestic issues, diagnoses root causes, recommends
 * the appropriate verified worker category, transparent pricing, and direct action.
 */

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

  // 1. Check for Gujarati script or terms
  const isGujarati = /[\u0A80-\u0AFF]/.test(query) || 
    lower.includes('gujarati') || lower.includes('નળ') || lower.includes('પાણી') || lower.includes('પંખો') || lower.includes('કારીગર');

  // 2. Check for Hindi / Devanagari script
  const isHindi = /[\u0900-\u097F]/.test(query) || 
    lower.includes('hindi') || lower.includes('हिन्दी') || lower.includes('पानी') || lower.includes('नल') || lower.includes('पंखा') || lower.includes('कारीगर');

  // ==========================================
  // GUJARATI HANDLER
  // ==========================================
  if (isGujarati) {
    if (lower.includes('નળ') || lower.includes('પાણી') || lower.includes('લીકેજ') || lower.includes('ડ્રેનેજ') || lower.includes('પ્લમ્બ')) {
      return {
        reply: `🔧 **પ્લમ્બિંગ માર્ગદર્શન (Plumbing Assistance):**\n` +
          `• **સમસ્યા:** પાણી લીકેજ અથવા નળની ખામી.\n` +
          `• **તાત્કાલિક પગલું:** કૃપા કરીને સિંક અથવા મુખ્ય ટાંકીનો સ્ટોપ કોક વાલ્વ તરત બંધ કરો.\n` +
          `• **ભલામણ કરેલ કારીગર:** **વેરિફાઇડ પ્લમ્બર (Certified Plumber)**\n` +
          `• **અંદાજિત ચાર્જ:** ₹350/કલાક ફ્લેટ રેટ (કોઈ છુપો ચાર્જ નથી)\n` +
          `• **સુરક્ષા:** કારીગર ઘરે આવે ત્યારે જ 4-અંકનો OTP આપવો.`,
        recommendedWorker: 'Plumber',
        estimatedCost: '₹350 flat visit',
        actionText: 'વેરિફાઇડ પ્લમ્બર બુક કરો →',
        actionHref: '/services',
        quickFollowUps: ['નળ બદલવાનો ચાર્જ?', 'વોશબેસિન બ્લોક છે', 'OTP સુરક્ષા કેવી રીતે કામ કરે છે?']
      };
    }

    if (lower.includes('લાઈટ') || lower.includes('પંખો') || lower.includes('mcb') || lower.includes('સ્પાર્ક') || lower.includes('વાયરિંગ')) {
      return {
        reply: `⚡ **ઇલેક્ટ્રિકલ સલામતી માર્ગદર્શન (Electrical Assistance):**\n` +
          `• **ચેતવણી:** શોર્ટ સર્કિટ અથવા વાયરિંગ સ્પાર્ક વખતે મેઇન સ્વીચ તરત બંધ કરો. ભીના હાથે અડવું નહીં!\n` +
          `• **ભલામણ કરેલ કારીગર:** **પ્રમાણિત ઇલેક્ટ્રિશિયન (Certified Electrician)**\n` +
          `• **અંદાજિત ચાર્જ:** ₹350 ફ્લેટ વિઝિટ ચાર્જ.\n` +
          `• અમારો ઇલેક્ટ્રિશિયન ટેસ્ટર અને સેફ્ટી ટૂલ્સ સાથે 15-30 મિનિટમાં આવી પહોંચશે.`,
        recommendedWorker: 'Electrician',
        estimatedCost: '₹350 flat visit',
        actionText: 'ઇલેક્ટ્રિશિયન બુક કરો →',
        actionHref: '/services',
        quickFollowUps: ['પંખો અવાજ કરે છે', 'MCB વારંવાર ટ્રીપ થાય છે', 'સ્વીચ બોર્ડ બદલવું છે']
      };
    }

    if (lower.includes('દરવાજો') || lower.includes('તાળું') || lower.includes('ફર્નિચર') || lower.includes('સુથાર') || lower.includes('કબાટ')) {
      return {
        reply: `🪚 **સુથારકામ માર્ગદર્શન (Carpentry Assistance):**\n` +
          `• **સમસ્યા:** દરવાજાનું લોક જામ થવું, કબાટના મિજાગરા કે ફર્નિચર રિપેર.\n` +
          `• **ભલામણ કરેલ કારીગર:** **અનુભવી સુથાર (Master Carpenter)**\n` +
          `• **અંદાજિત ચાર્જ:** માઇનોર રિપેર ₹299 થી શરૂ.\n` +
          `• બધા કારીગરો SahYog સુરક્ષા ગેરંટી સાથે આવે છે.`,
        recommendedWorker: 'Carpenter',
        estimatedCost: '₹299 થી શરૂ',
        actionText: 'સુથાર (Carpenter) બુક કરો →',
        actionHref: '/services',
        quickFollowUps: ['દરવાજાનું લોક જામ છે', 'કબાટના હિન્જીસ બદલવા', 'નવું ટેબલ ફિટિંગ']
      };
    }

    return {
      reply: `🙏 **નમસ્તે! સહયોગ (SahYog) AI સહાયકમાં તમારું સ્વાગત છે.**\n\n` +
        `તમને કોઈપણ ઘરેલુ સમારકામ માટે યોગ્ય કારીગર શોધવામાં હું મદદ કરી શકું છું:\n` +
        `1. 💧 **પાણી લીકેજ, નળ, ગટર બ્લોક** ➔ પ્લમ્બર (₹350)\n` +
        `2. ⚡ **વાયરિંગ, સ્પાર્ક, પંખો, MCB** ➔ ઇલેક્ટ્રિશિયન (₹350)\n` +
        `3. 🪚 **દરવાજો, લોક, કબાટ, ફર્નિચર** ➔ સુથાર (₹299 થી શરૂ)\n` +
        `4. 🧹 **ઘરની ઊંડી સફાઈ, સોફા વોશ** ➔ ડીપ ક્લિનિંગ (₹699 થી)\n` +
        `5. ❄️ **AC, ફ્રિજ, વોશિંગ મશીન** ➔ એપ્લાયન્સ ટેકનિશિયન (₹399)\n\n` +
        `તમારી સમસ્યા લખો, હું યોગ્ય કારીગર અને ભાવ જણાવીશ!`,
      actionText: 'બધી સેવાઓ જુઓ →',
      actionHref: '/services',
      quickFollowUps: ['પાણી લીકેજ છે શું કરવું?', 'MCB સ્વીચ ટ્રીપ થાય છે', 'ઓટીપી ક્યારે આપવો?']
    };
  }

  // ==========================================
  // HINDI HANDLER
  // ==========================================
  if (isHindi) {
    if (lower.includes('नल') || lower.includes('पानी') || lower.includes('लीक') || lower.includes('पाइप') || lower.includes('प्लंबर')) {
      return {
        reply: `🔧 **प्लंबिंग सहायता (Plumbing Support):**\n` +
          `• **समस्या:** पानी का रिसाव या पाइप लीकेज.\n` +
          `• **आपातकालीन टिप:** सिंक के नीचे लगे एंगल वाल्व या मेन वाटर सप्लाई को तुरंत बंद करें ताकि पानी का नुकसान न हो.\n` +
          `• **किसको बुक करें:** **सत्यापित प्लंबर (Certified Plumber)**\n` +
          `• **चार्ज:** ₹350 प्रति घंटा फिक्स रेट (शून्य छुपे चार्ज).\n` +
          `• काम पूरा होने और संतुष्ट होने के बाद ही ऑनलाइन या कैश पेमेंट करें।`,
        recommendedWorker: 'Plumber',
        estimatedCost: '₹350 flat visit',
        actionText: 'वेरिफाइड प्लंबर बुक करें →',
        actionHref: '/services',
        quickFollowUps: ['नल टपक रहा है', 'सिंक जाम हो गया है', 'गिज़र पाइप लीकेज']
      };
    }

    if (lower.includes('बिजली') || lower.includes('पंखा') || lower.includes('स्पार्क') || lower.includes('शॉर्ट') || lower.includes('वायरिंग')) {
      return {
        reply: `⚡ **इलेक्ट्रिकल सुरक्षा व समाधान (Electrical Safety):**\n` +
          `• **सुरक्षा चेतावनी:** स्पार्किंग या जलने की गंध आने पर मुख्य MCB को तुरंत ऑफ करें। गीले हाथों से कोई स्विच न छुएं।\n` +
          `• **किसको बुक करें:** **सत्यापित इलेक्ट्रीशियन (Certified Electrician)**\n` +
          `• **चार्ज:** ₹350 विज़िट व डायग्नोसिस चार्ज.\n` +
          `• हमारे इलेक्ट्रीशियन सेफ्टी गियर्स और स्पेयर टूल्स के साथ आते हैं।`,
        recommendedWorker: 'Electrician',
        estimatedCost: '₹350 flat visit',
        actionText: 'इलेक्ट्रीशियन बुक करें →',
        actionHref: '/services',
        quickFollowUps: ['पंखा आवाज कर रहा है', 'MCB बार-बार गिर रही है', 'स्विच बोर्ड बदलना है']
      };
    }

    return {
      reply: `🙏 **नमस्ते! सहयोग (SahYog) AI असिस्टेंट में आपका स्वागत है।**\n\n` +
        `अगर आपको घर में कोई समस्या है, तो मैं आपको सही कारीगर सुझा सकता हूँ:\n` +
        `1. 💧 **नल लीकेज, पाइप या ड्रेनेज जाम** ➔ प्लंबर बुक करें (₹350/घंटा)\n` +
        `2. ⚡ **शॉर्ट सर्किट, पंखा, MCB, स्विच** ➔ इलेक्ट्रीशियन बुक करें (₹350)\n` +
        `3. 🪚 **दरवाजा लॉक, अलमारी, फर्नीचर** ➔ बढ़ई (Carpenter) बुक करें (₹299 से)\n` +
        `4. 🧹 **घर की गहरी सफाई, सोफा वॉश** ➔ डीप क्लीनिंग एक्सपर्ट (₹699 से)\n` +
        `5. ❄️ **AC कूलिंग, फ्रिज, गीजर रिपेयर** ➔ अप्लायंस टेक्नीशियन (₹399 से)\n\n` +
        `कृपया अपनी समस्या बताएं, हम तुरंत सही कारीगर उपलब्ध कराएंगे!`,
      actionText: 'सभी सेवाएं देखें →',
      actionHref: '/services',
      quickFollowUps: ['पानी टपक रहा है क्या करूं?', 'MCB ट्रिप हो रही है', 'अराइवल OTP कैसे काम करता है?']
    };
  }

  // ==========================================
  // ENGLISH / COMPREHENSIVE REPAIR DIAGNOSTICS
  // ==========================================

  // A. Meta question: "What type of worker should I book?" / "Which worker do I need?"
  if (
    lower.includes('what type of worker') ||
    lower.includes('which worker') ||
    lower.includes('who should i book') ||
    lower.includes('whom should i book') ||
    lower.includes('what worker') ||
    (lower.includes('issue') && lower.includes('book') && !lower.includes('fan') && !lower.includes('sink')) ||
    lower === 'help' ||
    lower === 'worker'
  ) {
    return {
      reply: `🔍 **How to Choose the Right SahYog Professional:**\n\n` +
        `Depending on your household issue, here is who you should book:\n\n` +
        `1. 💧 **Plumber** (₹350 flat visit):\n` +
        `   • For leaking taps, broken pipes, choked kitchen sinks, toilet flush, low water pressure, geyser water inlet leaks.\n\n` +
        `2. ⚡ **Electrician** (₹350 flat visit):\n` +
        `   • For MCB tripping, sparking switchboards, ceiling fan wobble/noise, appliance power trips, short circuits, inverter wiring.\n\n` +
        `3. 🪚 **Carpenter** (Starts ₹299):\n` +
        `   • For jammed doors, broken locks, sliding wardrobe rollers, loose hinges, modular kitchen cabinet adjustments, furniture assembly.\n\n` +
        `4. 🧹 **Deep Cleaning Specialist** (Starts ₹699):\n` +
        `   • For bathroom scale/acid stain removal, kitchen oil/chimney degreasing, sofa shampooing, full 1BHK-3BHK move-in deep cleaning.\n\n` +
        `5. ❄️ **Appliance Repair Technician** (Starts ₹399):\n` +
        `   • For AC not cooling/gas recharge, refrigerator defrost failures, washing machine spin motor, water geyser heating coil.\n\n` +
        `6. 🎨 **Painter & Waterproofing** (Starts ₹12/sq.ft):\n` +
        `   • For damp walls, wall paint peeling, ceiling water seepage, crack putty touch-ups.\n\n` +
        `💬 *Tell me your specific problem (e.g. "my bathroom drain is clogged" or "fan is sparking") and I will instantly recommend the exact technician with pricing!*`,
      actionText: 'Explore All Service Categories →',
      actionHref: '/services',
      quickFollowUps: ['💧 Leaking kitchen sink', '⚡ Ceiling fan sparking', '🪚 Jammed door lock', '🧹 Bathroom deep cleaning']
    };
  }

  // B. Plumbing Issues
  if (
    lower.includes('sink') || lower.includes('leak') || lower.includes('pipe') ||
    lower.includes('tap') || lower.includes('faucet') || lower.includes('drain') ||
    lower.includes('clog') || lower.includes('choke') || lower.includes('water') ||
    lower.includes('flush') || lower.includes('toilet') || lower.includes('commode') ||
    lower.includes('plumb') || lower.includes('tank') || lower.includes('sewer')
  ) {
    return {
      reply: `🔧 **Plumbing Diagnosis & Recommendation:**\n\n` +
        `• **Recommended Worker:** **Certified Plumber**\n` +
        `• **Diagnosis:** Likely a degraded rubber O-ring/washer, loose compression fitting, or clogged P-trap causing pressure buildup.\n` +
        `• **Emergency Action:** Turn the shutoff angle valve clockwise under the fixture or shut the overhead tank valve to prevent water damage.\n` +
        `• **Pricing:** ₹350 flat visit & labor rate for first hour. Replacement washers/sealants provided at MRP.\n` +
        `• **SahYog Guarantee:** 30-day rework warranty with verified background-checked plumbers.`,
      recommendedWorker: 'Plumber',
      estimatedCost: '₹350/hr flat rate',
      actionText: 'Book Certified Plumber Now →',
      actionHref: '/services',
      quickFollowUps: ['How much does tap replacement cost?', 'Do I need to buy spare parts?', 'How does arrival OTP work?']
    };
  }

  // C. Electrical Issues
  if (
    lower.includes('mcb') || lower.includes('trip') || lower.includes('spark') ||
    lower.includes('electric') || lower.includes('fan') || lower.includes('switch') ||
    lower.includes('socket') || lower.includes('wire') || lower.includes('wiring') ||
    lower.includes('light') || lower.includes('short circuit') || lower.includes('shock') ||
    lower.includes('fuse') || lower.includes('voltage') || lower.includes('inverter')
  ) {
    return {
      reply: `⚡ **Electrical Diagnosis & Recommendation:**\n\n` +
        `• **Recommended Worker:** **Licensed Electrician**\n` +
        `• **Diagnosis:** Tripping or sparking indicates either an active line-to-neutral short, an overloaded circuit breaker, or a degraded capacitor in the fan.\n` +
        `• **Safety Alert ⚠️:** DO NOT repeatedly force the MCB switch UP if it keeps tripping. Turn off the main distribution switch and avoid touching switches with wet hands.\n` +
        `• **Pricing:** ₹350 flat visit & safety inspection.\n` +
        `• **Equipment:** Our electricians carry certified multi-meters, insulated screwdrivers, and genuine Havells/Anchor switches.`,
      recommendedWorker: 'Electrician',
      estimatedCost: '₹350 flat visit',
      actionText: 'Book Licensed Electrician Now →',
      actionHref: '/services',
      quickFollowUps: ['Ceiling fan making squeaking noise', 'Switchboard smells burnt', 'Inverter battery not charging']
    };
  }

  // D. Carpentry & Locks
  if (
    lower.includes('door') || lower.includes('lock') || lower.includes('key') ||
    lower.includes('jam') || lower.includes('hinge') || lower.includes('drawer') ||
    lower.includes('cupboard') || lower.includes('wardrobe') || lower.includes('wood') ||
    lower.includes('furniture') || lower.includes('bed') || lower.includes('table') ||
    lower.includes('carpenter') || lower.includes('shelf') || lower.includes('latch')
  ) {
    return {
      reply: `🪚 **Carpentry Diagnosis & Recommendation:**\n\n` +
        `• **Recommended Worker:** **Master Carpenter**\n` +
        `• **Diagnosis:** Wood swells during humidity changes causing door friction; misaligned mortise locks or worn hydraulic hinges need precision realignment.\n` +
        `• **Pricing Guide:**\n` +
        `  - Door lock / latch repair: ₹299\n` +
        `  - Wardrobe hydraulic hinge replacement: ₹349\n` +
        `  - Custom shelf / furniture assembly: ₹499 - ₹699\n` +
        `• **Tools:** Technicians carry high-torque drills, wood planers, and replacement mortise cylinders.`,
      recommendedWorker: 'Carpenter',
      estimatedCost: 'Starting at ₹299',
      actionText: 'Book Master Carpenter Now →',
      actionHref: '/services',
      quickFollowUps: ['Main door lock is stuck', 'Wardrobe sliding door came off track', 'Bed frame creaking sound']
    };
  }

  // E. Cleaning & Pest
  if (
    lower.includes('clean') || lower.includes('wash') || lower.includes('stain') ||
    lower.includes('sofa') || lower.includes('bathroom') || lower.includes('kitchen') ||
    lower.includes('pest') || lower.includes('cockroach') || lower.includes('chimney') ||
    lower.includes('dust') || lower.includes('deep clean') || lower.includes('carpet')
  ) {
    return {
      reply: `🧹 **Cleaning & Sanitization Diagnosis:**\n\n` +
        `• **Recommended Service:** **Deep Cleaning Specialist**\n` +
        `• **What Is Included:**\n` +
        `  - Industrial vacuuming & anti-microbial steam extraction.\n` +
        `  - Hard-water stain & calcium descaling on bathroom tiles.\n` +
        `  - Degreasing of kitchen chimney, stove, and exhaust fans.\n` +
        `• **Pricing:**\n` +
        `  - Bathroom Deep Clean: ₹499\n` +
        `  - Kitchen Deep Clean: ₹799\n` +
        `  - Full 3BHK Home Deep Clean: ₹1,800 - ₹2,400\n` +
        `• Eco-friendly, pet-safe chemicals used exclusively.`,
      recommendedWorker: 'Deep Cleaning',
      estimatedCost: 'Starts at ₹499',
      actionText: 'Book Deep Cleaning Service →',
      actionHref: '/services',
      quickFollowUps: ['Sofa shampooing cost', 'How long does 3BHK cleaning take?', 'Bathroom hard water tile marks']
    };
  }

  // F. Appliances (AC, Fridge, Washing Machine, Geyser)
  if (
    lower.includes('ac') || lower.includes('air conditioner') || lower.includes('cool') ||
    lower.includes('fridge') || lower.includes('refrigerator') || lower.includes('freezer') ||
    lower.includes('washing machine') || lower.includes('geyser') || lower.includes('heater') ||
    lower.includes('microwave') || lower.includes('gas') || lower.includes('appliance')
  ) {
    return {
      reply: `❄️ **Appliance Repair Diagnosis:**\n\n` +
        `• **Recommended Worker:** **Appliance Repair Technician**\n` +
        `• **Diagnosis:**\n` +
        `  - AC not cooling: Usually clogged filter mesh or refrigerant (R32/R410) pressure leak.\n` +
        `  - Geyser not heating: Burned copper heating coil or failed thermostat.\n` +
        `  - Washing machine vibrating/not draining: Blocked coin trap filter or worn drive belt.\n` +
        `• **Pricing:** ₹399 inspection fee (waived if repair approved) + spare parts at standard rate.\n` +
        `• Comes with a 30-Day SahYog Assurance Guarantee.`,
      recommendedWorker: 'Appliance Repair',
      estimatedCost: '₹399 diagnostic visit',
      actionText: 'Book Appliance Technician →',
      actionHref: '/services',
      quickFollowUps: ['AC gas refill cost', 'Geyser heating coil price', 'Washing machine not spinning']
    };
  }

  // G. Painting & Seepage
  if (
    lower.includes('paint') || lower.includes('wall') || lower.includes('seep') ||
    lower.includes('damp') || lower.includes('moisture') || lower.includes('crack') ||
    lower.includes('peel') || lower.includes('waterproof') || lower.includes('color')
  ) {
    return {
      reply: `🎨 **Painting & Seepage Diagnosis:**\n\n` +
        `• **Recommended Worker:** **Wall & Painting Contractor**\n` +
        `• **Diagnosis:** Wall peeling indicates moisture migration from exterior walls or concealed bathroom pipes behind the wall.\n` +
        `• **Remedy:** Scraping to base plaster, damp-proof primer coat, and acrylic putty before applying topcoat.\n` +
        `• **Pricing:** Free on-site laser measurement & estimate. Standard emulsion from ₹12/sq.ft.`,
      recommendedWorker: 'Painter',
      estimatedCost: 'Free estimate on site',
      actionText: 'Book Painting Consultation →',
      actionHref: '/services',
      quickFollowUps: ['Cost per square foot', 'Waterproofing bathroom wall', 'Accent wall texture cost']
    };
  }

  // H. Safety, Arrival OTP & Security
  if (
    lower.includes('otp') || lower.includes('safe') || lower.includes('safety') ||
    lower.includes('fraud') || lower.includes('scam') || lower.includes('security') ||
    lower.includes('code') || lower.includes('verification')
  ) {
    return {
      reply: `🛡️ **SahYog 4-Digit Arrival OTP Protection:**\n\n` +
        `• **How It Protects You:** When you book any service, a unique 4-digit arrival OTP is generated on your screen.\n` +
        `• **Strict Golden Rule:** Never share this OTP over call or message. Only reveal it to the worker when they are physically at your doorstep.\n` +
        `• **What Happens Next:** The worker enters the OTP in their partner app to officially start the job timer and log their live GPS arrival.\n` +
        `• **Payment Protection:** You only pay AFTER the worker completes the job and you inspect the work!`,
      estimatedCost: '100% Free Protection Guarantee',
      actionText: 'View Your Active Bookings & OTP →',
      actionHref: '/bookings',
      quickFollowUps: ['When do I make payment?', 'Can I cancel if worker is late?', 'Are workers police verified?']
    };
  }

  // I. Payment, Pricing, QR Code
  if (
    lower.includes('pay') || lower.includes('payment') || lower.includes('price') ||
    lower.includes('cost') || lower.includes('rate') || lower.includes('cash') ||
    lower.includes('upi') || lower.includes('qr') || lower.includes('bill')
  ) {
    return {
      reply: `💳 **Pay-After-Service & Payment Policy:**\n\n` +
        `• **Zero Advance Payment:** You pay ₹0 at the time of booking. Your money stays safely in your bank account.\n` +
        `• **When to Pay:** Only after the worker arrives (using your 4-digit OTP) and completes the service to your satisfaction.\n` +
        `• **Payment Options:** Dynamic UPI QR Code (valid for 5 mins for security), Google Pay, PhonePe, Paytm, or direct Cash.\n` +
        `• **Standard Labor Rates:** ₹350/hr flat visit fee for plumbing and electrical work. Transparent GST invoice provided instantly.`,
      actionText: 'Check Service Price Catalog →',
      actionHref: '/services',
      quickFollowUps: ['Is UPI QR code secure?', 'How does arrival OTP work?', 'Can I get a GST bill?']
    };
  }

  // J. Cancellation & Refunds
  if (
    lower.includes('cancel') || lower.includes('refund') || lower.includes('reschedule') ||
    lower.includes('delay') || lower.includes('late') || lower.includes('change time')
  ) {
    return {
      reply: `🔄 **Cancellation & Rescheduling Policy:**\n\n` +
        `• **Instant Cancellation:** You can cancel or reschedule any upcoming booking free of charge before the worker arrives.\n` +
        `• **100% Refund:** Since SahYog operates on a Pay-After-Service model, you haven't been charged anything in advance!\n` +
        `• **Worker Running Late?** You can live track their real-time location on the map in 'My Bookings' or call them directly.`,
      actionText: 'Manage My Bookings →',
      actionHref: '/bookings',
      quickFollowUps: ['Call assigned worker', 'Track worker on map', 'Book another service']
    };
  }

  // K. Contact / Support
  if (
    lower.includes('contact') || lower.includes('support') || lower.includes('call') ||
    lower.includes('phone') || lower.includes('helpline') || lower.includes('number')
  ) {
    return {
      reply: `📞 **SahYog 24/7 Customer Support:**\n\n` +
        `• **Helpline:** +91 98765 43210 (Toll-Free)\n` +
        `• **Email:** support@sahyog.in\n` +
        `• **Chatbot:** Available 24/7 right here to diagnose issues and coordinate technician dispatches.\n` +
        `• **Live Partner Chat:** Accessible inside any active or completed booking in 'My Bookings'.`,
      actionText: 'Call Support (+91 98765 43210)',
      actionHref: 'tel:+919876543210',
      quickFollowUps: ['What type of worker should I book?', 'Track my current booking', 'View service pricing']
    };
  }

  // L. Universal Intelligent Fallback
  return {
    reply: `🤖 **SahYog Diagnostic Assistant:**\n\n` +
      `I understand you're asking about your household issue! Here is how SahYog can solve it:\n\n` +
      `• **Water / Pipe / Drain Issue** ➔ Book a **Plumber** (₹350/hr flat rate)\n` +
      `• **Power / Spark / Fan Issue** ➔ Book an **Electrician** (₹350 flat visit)\n` +
      `• **Lock / Wood / Furniture Issue** ➔ Book a **Carpenter** (Starts ₹299)\n` +
      `• **Deep Cleaning / Sofa / Bathroom** ➔ Book **Deep Cleaning** (Starts ₹699)\n` +
      `• **AC / Fridge / Geyser Repair** ➔ Book **Appliance Service** (₹399)\n\n` +
      `💡 *Tell me what's happening (e.g., "my sink is clogged", "fan sparking", "door won't lock") and I will diagnose it immediately!*`,
    actionText: 'Browse All Verified Services →',
    actionHref: '/services',
    quickFollowUps: ['What type of worker should I book?', 'How much does plumbing cost?', 'Explain 4-digit arrival OTP']
  };
}
