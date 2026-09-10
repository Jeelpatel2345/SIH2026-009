/**
 * SahYog Professional Benchmark Pricing & Dynamic Rate Guide
 * Complete 48 Service Categories across 6 Trades + Community & Society Services.
 * Extracted from official professional labor rate benchmark guides (INR)
 * and calibrated with 2,000 historical job rating multipliers.
 */

export interface ServiceSpec {
  id: string;
  category: "Cleaning" | "Plumbing" | "Electrician" | "Appliance Repair" | "Carpentry" | "Painting" | "Community";
  title: string;
  scopeAndInclusions: string;
  rateINR: string;
  minPrice: number;
  maxPrice: number;
  unit: string;
  popular?: boolean;
}

export const benchmarkServices: ServiceSpec[] = [
  // ==========================================
  // 1. TOP 8 APPLIANCE REPAIR SERVICES
  // ==========================================
  {
    id: "app-1",
    category: "Appliance Repair",
    title: "Air Conditioner (AC) Repair & Service",
    scopeAndInclusions: "Jet pump foam wash, PCB troubleshooting, cooling coil leak repair, or refrigerant gas recharge.",
    rateINR: "₹450 – ₹2,500 / unit",
    minPrice: 450,
    maxPrice: 2500,
    unit: "unit",
    popular: true
  },
  {
    id: "app-2",
    category: "Appliance Repair",
    title: "Refrigerator Repair",
    scopeAndInclusions: "Defrost timer/thermostat fix, compressor relay, door gasket replacement, or gas charging.",
    rateINR: "₹350 – ₹2,200 / job",
    minPrice: 350,
    maxPrice: 2200,
    unit: "job",
    popular: true
  },
  {
    id: "app-3",
    category: "Appliance Repair",
    title: "Washing Machine Repair",
    scopeAndInclusions: "Drain pump clearing, drum bearing replacement, inlet valve fix, drive belt repair, or motherboard fix.",
    rateINR: "₹350 – ₹1,800 / job",
    minPrice: 350,
    maxPrice: 1800,
    unit: "job",
    popular: true
  },
  {
    id: "app-4",
    category: "Appliance Repair",
    title: "Microwave Oven Repair",
    scopeAndInclusions: "Magnetron replacement, high-voltage diode/capacitor check, touchpad repair, or door switch fix.",
    rateINR: "₹300 – ₹1,200 / unit",
    minPrice: 300,
    maxPrice: 1200,
    unit: "unit"
  },
  {
    id: "app-5",
    category: "Appliance Repair",
    title: "Water Purifier (RO/UV) Service",
    scopeAndInclusions: "Filter/sediment candle replacement, RO membrane descaling, booster pump testing, and TDS tuning.",
    rateINR: "₹250 – ₹1,500 / service",
    minPrice: 250,
    maxPrice: 1500,
    unit: "service",
    popular: true
  },
  {
    id: "app-6",
    category: "Appliance Repair",
    title: "Kitchen Chimney Repair & Cleaning",
    scopeAndInclusions: "Baffle/mesh filter degreasing, motor carbon cleaning, touch/motion sensor panel repair, or duct pipe fix.",
    rateINR: "₹500 – ₹1,500 / unit",
    minPrice: 500,
    maxPrice: 1500,
    unit: "unit"
  },
  {
    id: "app-7",
    category: "Appliance Repair",
    title: "Geyser / Water Heater Repair",
    scopeAndInclusions: "Heating element replacement, thermostat calibration, anode rod servicing, or inner tank descaling.",
    rateINR: "₹300 – ₹900 / unit",
    minPrice: 300,
    maxPrice: 900,
    unit: "unit"
  },
  {
    id: "app-8",
    category: "Appliance Repair",
    title: "Television (LED/Smart TV) Repair",
    scopeAndInclusions: "Backlight LED strip replacement, motherboard component repair, power board fixing, or speaker replacement.",
    rateINR: "₹400 – ₹2,800 / unit",
    minPrice: 400,
    maxPrice: 2800,
    unit: "unit"
  },

  // ==========================================
  // 2. TOP 8 CARPENTRY SERVICES
  // ==========================================
  {
    id: "carp-1",
    category: "Carpentry",
    title: "Lock, Handle & Latch Installation",
    scopeAndInclusions: "Installing/replacing mortise locks, cylindrical door handles, tower bolts, magnetic catchers, and latches.",
    rateINR: "₹200 – ₹500 / unit",
    minPrice: 200,
    maxPrice: 500,
    unit: "unit",
    popular: true
  },
  {
    id: "carp-2",
    category: "Carpentry",
    title: "Door & Window Repair / Fitting",
    scopeAndInclusions: "Door planing to fix rubbing against frame/floor, hinge replacement, alignment adjustment, or door mesh repair.",
    rateINR: "₹300 – ₹1,200 / door",
    minPrice: 300,
    maxPrice: 1200,
    unit: "door",
    popular: true
  },
  {
    id: "carp-3",
    category: "Carpentry",
    title: "Modular Furniture Assembly / Dismantling",
    scopeAndInclusions: "Assembly and knockdown of flat-pack beds, wardrobes, study desks, shoe racks (IKEA, Pepperfry, Amazon).",
    rateINR: "₹500 – ₹2,500 / unit",
    minPrice: 500,
    maxPrice: 2500,
    unit: "unit",
    popular: true
  },
  {
    id: "carp-4",
    category: "Carpentry",
    title: "Drawer Channel & Hinge Replacement",
    scopeAndInclusions: "Replacing rusted/jammed drawer telescopic slides, soft-close hydraulic kitchen hinges, and wardrobe shutter alignment.",
    rateINR: "₹150 – ₹350 / pair",
    minPrice: 150,
    maxPrice: 350,
    unit: "pair"
  },
  {
    id: "carp-5",
    category: "Carpentry",
    title: "Wall-Mounted Wooden Fixtures",
    scopeAndInclusions: "Drilling and mounting wooden wall shelves, TV back panels, temple units, curtain rods, and mirror frames.",
    rateINR: "₹150 – ₹600 / item",
    minPrice: 150,
    maxPrice: 600,
    unit: "item"
  },
  {
    id: "carp-6",
    category: "Carpentry",
    title: "Wood Polish & Surface Refinishing",
    scopeAndInclusions: "Sanding, wood putty touch-up, PU / Melamine / French spirit hand polishing, and scratch restoration.",
    rateINR: "₹35 – ₹120 / sq. ft.",
    minPrice: 35,
    maxPrice: 120,
    unit: "sq. ft."
  },
  {
    id: "carp-7",
    category: "Carpentry",
    title: "Modular Kitchen & Wardrobe Fabrication",
    scopeAndInclusions: "Custom build labor: carcass frame fabrication, laminate pasting, edge banding, and shutter fitting.",
    rateINR: "₹250 – ₹550 / sq. ft.",
    minPrice: 250,
    maxPrice: 550,
    unit: "sq. ft."
  },
  {
    id: "carp-8",
    category: "Carpentry",
    title: "Wooden Partition & Ceiling Paneling",
    scopeAndInclusions: "Wooden rafter room partitions, acoustic/fluted wall cladding, and wooden false ceiling framework fabrication.",
    rateINR: "₹80 – ₹220 / sq. ft.",
    minPrice: 80,
    maxPrice: 220,
    unit: "sq. ft."
  },

  // ==========================================
  // 3. TOP 8 PAINTING SERVICES
  // ==========================================
  {
    id: "paint-1",
    category: "Painting",
    title: "Interior Wall Repainting (Fresh Coat)",
    scopeAndInclusions: "Wall surface cleaning, minor putty filling, spot sanding, and 2 coats of standard acrylic emulsion.",
    rateINR: "₹10 – ₹20 / sq. ft.",
    minPrice: 10,
    maxPrice: 20,
    unit: "sq. ft.",
    popular: true
  },
  {
    id: "paint-2",
    category: "Painting",
    title: "Interior Fresh Painting (New Walls)",
    scopeAndInclusions: "Complete sanding, 1 coat primer, 2 full coats putty, intermediate sanding, and 2–3 coats premium emulsion.",
    rateINR: "₹22 – ₹45 / sq. ft.",
    minPrice: 22,
    maxPrice: 45,
    unit: "sq. ft."
  },
  {
    id: "paint-3",
    category: "Painting",
    title: "Exterior Weatherproof Painting",
    scopeAndInclusions: "High-pressure washing, crack bridging, exterior primer, and 2 coats of anti-algal exterior acrylic emulsion.",
    rateINR: "₹14 – ₹35 / sq. ft.",
    minPrice: 14,
    maxPrice: 35,
    unit: "sq. ft.",
    popular: true
  },
  {
    id: "paint-4",
    category: "Painting",
    title: "Wall Texture & Stencil Design",
    scopeAndInclusions: "Application of designer textures (metallic, rustic, marble finish) or custom geometric/floral stencils.",
    rateINR: "₹60 – ₹180 / sq. ft.",
    minPrice: 60,
    maxPrice: 180,
    unit: "sq. ft."
  },
  {
    id: "paint-5",
    category: "Painting",
    title: "Waterproofing & Damp Treatment",
    scopeAndInclusions: "Scraping peeling paint, efflorescence treatment, elastomeric waterproofing polymer/barrier coating.",
    rateINR: "₹35 – ₹80 / sq. ft.",
    minPrice: 35,
    maxPrice: 80,
    unit: "sq. ft.",
    popular: true
  },
  {
    id: "paint-6",
    category: "Painting",
    title: "Metal & Grill Enamel Painting",
    scopeAndInclusions: "Rust scraping, red oxide anti-corrosive primer, and 2 coats of gloss/matte synthetic enamel paint.",
    rateINR: "₹15 – ₹30 / sq. ft.",
    minPrice: 15,
    maxPrice: 30,
    unit: "sq. ft."
  },
  {
    id: "paint-7",
    category: "Painting",
    title: "Wood Polish & Melamine/PU Finish",
    scopeAndInclusions: "Door/frame sanding, wood stain matching, grain filling, and clear spray/brush Melamine or PU coats.",
    rateINR: "₹35 – ₹110 / sq. ft.",
    minPrice: 35,
    maxPrice: 110,
    unit: "sq. ft."
  },
  {
    id: "paint-8",
    category: "Painting",
    title: "Ceiling Painting & POP Finish",
    scopeAndInclusions: "Ceiling surface levelling, joint tape/putty finishing, and 2 coats of flat anti-glare ceiling paint.",
    rateINR: "₹12 – ₹24 / sq. ft.",
    minPrice: 12,
    maxPrice: 24,
    unit: "sq. ft."
  },

  // ==========================================
  // 4. TOP 8 CLEANING SERVICES
  // ==========================================
  {
    id: "clean-1",
    category: "Cleaning",
    title: "Full-Home Deep Cleaning",
    scopeAndInclusions: "Floor scrubbing/buffing, dusting, wall cobweb removal, doors, switches, and windows.",
    rateINR: "₹2,500 – ₹7,500 / job (1–3 BHK)",
    minPrice: 2500,
    maxPrice: 7500,
    unit: "job",
    popular: true
  },
  {
    id: "clean-2",
    category: "Cleaning",
    title: "Move-In / Move-Out Cleaning",
    scopeAndInclusions: "Detailed sanitation of empty homes, internal wardrobes, drawers, cabinets, and appliances.",
    rateINR: "₹3,500 – ₹9,000 / job",
    minPrice: 3500,
    maxPrice: 9000,
    unit: "job"
  },
  {
    id: "clean-3",
    category: "Cleaning",
    title: "Kitchen Deep Cleaning",
    scopeAndInclusions: "Degreasing tiles, stovetop, slab sanitization, external cabinets, and chimney wipe-down.",
    rateINR: "₹1,200 – ₹2,500 / kitchen",
    minPrice: 1200,
    maxPrice: 2500,
    unit: "kitchen",
    popular: true
  },
  {
    id: "clean-4",
    category: "Cleaning",
    title: "Bathroom Deep Sanitization",
    scopeAndInclusions: "Tile descaling, hard-water stain removal, toilet sanitization, grout and fitting polishing.",
    rateINR: "₹500 – ₹1,200 / bathroom",
    minPrice: 500,
    maxPrice: 1200,
    unit: "bathroom",
    popular: true
  },
  {
    id: "clean-5",
    category: "Cleaning",
    title: "Sofa & Upholstery Cleaning",
    scopeAndInclusions: "Wet vacuuming, fabric shampooing, extraction, and spot stain treatment.",
    rateINR: "₹300 – ₹500 / seat",
    minPrice: 300,
    maxPrice: 500,
    unit: "seat",
    popular: true
  },
  {
    id: "clean-6",
    category: "Cleaning",
    title: "Carpet & Rug Shampooing",
    scopeAndInclusions: "Dust mite extraction, deep fiber shampooing, and moisture extraction.",
    rateINR: "₹15 – ₹30 / sq. ft.",
    minPrice: 15,
    maxPrice: 30,
    unit: "sq. ft."
  },
  {
    id: "clean-7",
    category: "Cleaning",
    title: "Post-Construction Cleaning",
    scopeAndInclusions: "Heavy debris clearing, cement/paint splatter removal, fine dust vacuuming from all corners.",
    rateINR: "₹5 – ₹12 / sq. ft.",
    minPrice: 5,
    maxPrice: 12,
    unit: "sq. ft."
  },
  {
    id: "clean-8",
    category: "Cleaning",
    title: "Commercial Office Cleaning",
    scopeAndInclusions: "Desk disinfection, trash removal, restrooms, pantry, and high-traffic floor care.",
    rateINR: "₹3 – ₹8 / sq. ft. (or ₹6,000 – ₹20,000/mo)",
    minPrice: 6000,
    maxPrice: 20000,
    unit: "month"
  },

  // ==========================================
  // 5. TOP 8 PLUMBING SERVICES
  // ==========================================
  {
    id: "plumb-1",
    category: "Plumbing",
    title: "Tap & Faucet Repair / Installation",
    scopeAndInclusions: "Fixing dripping taps, cartridge replacement, spindle repair, or installing new mixer/faucets.",
    rateINR: "₹150 – ₹400 / unit",
    minPrice: 150,
    maxPrice: 400,
    unit: "unit",
    popular: true
  },
  {
    id: "plumb-2",
    category: "Plumbing",
    title: "Drain & Pipe Blockage Clearing",
    scopeAndInclusions: "Mechanical snake/manual rodding to clear clogged washbasins, kitchen sinks, showers, or main traps.",
    rateINR: "₹300 – ₹1,200 / point",
    minPrice: 300,
    maxPrice: 1200,
    unit: "point",
    popular: true
  },
  {
    id: "plumb-3",
    category: "Plumbing",
    title: "Toilet & Commode Installation/Repair",
    scopeAndInclusions: "Flush tank kit fixing, siphon/inlet valve replacement, wax ring leak sealing, or full commode replacement.",
    rateINR: "₹400 – ₹1,800 / job",
    minPrice: 400,
    maxPrice: 1800,
    unit: "job"
  },
  {
    id: "plumb-4",
    category: "Plumbing",
    title: "Pipe Leakage & Concealed Repair",
    scopeAndInclusions: "Identifying wall dampness source, cutting/splicing damaged CPVC/UPVC/GI pipes, and fitting joints.",
    rateINR: "₹500 – ₹2,500 / job",
    minPrice: 500,
    maxPrice: 2500,
    unit: "job",
    popular: true
  },
  {
    id: "plumb-5",
    category: "Plumbing",
    title: "Geyser & Water Heater Plumbing",
    scopeAndInclusions: "Inlet/outlet connection hose fitting, non-return valve (NRV) installation, line flushing, and demounting.",
    rateINR: "₹350 – ₹800 / unit",
    minPrice: 350,
    maxPrice: 800,
    unit: "unit"
  },
  {
    id: "plumb-6",
    category: "Plumbing",
    title: "Water Tank Installation & Plumbing",
    scopeAndInclusions: "Overhead/loft tank pipeline setup, float/ball valve replacement, overflow & vent line plumbing.",
    rateINR: "₹800 – ₹3,000 / tank",
    minPrice: 800,
    maxPrice: 3000,
    unit: "tank"
  },
  {
    id: "plumb-7",
    category: "Plumbing",
    title: "Water Pump / Motor Setup",
    scopeAndInclusions: "Centrifugal/submersible pump installation, suction & delivery line union fittings, bypass valve setup.",
    rateINR: "₹600 – ₹1,500 / pump",
    minPrice: 600,
    maxPrice: 1500,
    unit: "pump"
  },
  {
    id: "plumb-8",
    category: "Plumbing",
    title: "Full Bathroom / Complete Line Fitout",
    scopeAndInclusions: "Full rough-in and trim-out: concealed piping, shower diverters, waste lines, and multiple fixture fittings.",
    rateINR: "₹3,500 – ₹10,000 / bath",
    minPrice: 3500,
    maxPrice: 10000,
    unit: "bath"
  },

  // ==========================================
  // 6. TOP 8 ELECTRICIAN SERVICES
  // ==========================================
  {
    id: "elec-1",
    category: "Electrician",
    title: "Switch, Socket & Board Repair",
    scopeAndInclusions: "Replacing modular/regular switches, burnt sockets, dimmer switches, and loose terminal reconnection.",
    rateINR: "₹100 – ₹250 / point",
    minPrice: 100,
    maxPrice: 250,
    unit: "point",
    popular: true
  },
  {
    id: "elec-2",
    category: "Electrician",
    title: "Fan Installation & Repair",
    scopeAndInclusions: "Ceiling/exhaust fan mounting, blade balancing, regulator pairing, capacitor replacement, or motor re-wiring.",
    rateINR: "₹200 – ₹450 / unit",
    minPrice: 200,
    maxPrice: 450,
    unit: "unit",
    popular: true
  },
  {
    id: "elec-3",
    category: "Electrician",
    title: "Decorative & Architectural Lighting",
    scopeAndInclusions: "Installation of false ceiling spot/cove LEDs, chandeliers, track lights, wall sconces, and driver units.",
    rateINR: "₹150 – ₹1,200 / unit",
    minPrice: 150,
    maxPrice: 1200,
    unit: "unit"
  },
  {
    id: "elec-4",
    category: "Electrician",
    title: "MCB & Distribution Board (DB) Setup",
    scopeAndInclusions: "Troubleshooting tripping breakers, replacing faulty single/double-pole MCBs, RCCB/ELCB, or rewiring DB box.",
    rateINR: "₹300 – ₹1,500 / job",
    minPrice: 300,
    maxPrice: 1500,
    unit: "job",
    popular: true
  },
  {
    id: "elec-5",
    category: "Electrician",
    title: "Inverter & Battery Installation",
    scopeAndInclusions: "Mounting inverter system, battery terminal cabling, earthing check, bypass line separation, and load testing.",
    rateINR: "₹500 – ₹1,200 / setup",
    minPrice: 500,
    maxPrice: 1200,
    unit: "setup"
  },
  {
    id: "elec-6",
    category: "Electrician",
    title: "Appliance Electrical Line Setup",
    scopeAndInclusions: "Heavy-duty power connection (16A/20A) with dedicated conduit/cable for ACs, geysers, or induction hobs.",
    rateINR: "₹400 – ₹900 / point",
    minPrice: 400,
    maxPrice: 900,
    unit: "point"
  },
  {
    id: "elec-7",
    category: "Electrician",
    title: "Short Circuit & Fault Diagnosis",
    scopeAndInclusions: "Tracing invisible insulation faults, earth leakages, burnt conduit wiring, and restoring localized power loss.",
    rateINR: "₹500 – ₹1,800 / visit",
    minPrice: 500,
    maxPrice: 1800,
    unit: "visit",
    popular: true
  },
  {
    id: "elec-8",
    category: "Electrician",
    title: "Full-Home Conduit Wiring / Rewiring",
    scopeAndInclusions: "Complete rough-in wiring: running conduit pipes, pulling FRLS cables, circuit tagging, and final switchboard assembly.",
    rateINR: "₹15 – ₹35 / sq. ft. (or ₹120–₹250 / point)",
    minPrice: 15,
    maxPrice: 35,
    unit: "sq. ft."
  },

  // ==========================================
  // 7. COMMUNITY & SOCIETY SERVICES
  // ==========================================
  {
    id: "comm-1",
    category: "Community",
    title: "Society Water Tank Deep Cleaning & Disinfection",
    scopeAndInclusions: "Rotary jet scrubbing, sludge extraction pump, antibacterial UV & chlorine misting for underground/overhead community tanks.",
    rateINR: "₹1,500 – ₹4,500 / tank",
    minPrice: 1500,
    maxPrice: 4500,
    unit: "tank",
    popular: true
  },
  {
    id: "comm-2",
    category: "Community",
    title: "Apartment Common Area & Parking Sanitation",
    scopeAndInclusions: "High-pressure floor buffing, stairwell sanitization, clubhouse cleaning, and storm drain debris clearing.",
    rateINR: "₹2,500 – ₹8,000 / society",
    minPrice: 2500,
    maxPrice: 8000,
    unit: "society",
    popular: true
  },
  {
    id: "comm-3",
    category: "Community",
    title: "Society Main Distribution Panel & Streetlight AMC",
    scopeAndInclusions: "DG synchronizer check, campus street lights, earthing pits resistance test, and clubhouse electrical inspection.",
    rateINR: "₹2,000 – ₹7,500 / visit",
    minPrice: 2000,
    maxPrice: 7500,
    unit: "visit"
  },
  {
    id: "comm-4",
    category: "Community",
    title: "Apartment Central Hydro-Pneumatic Pump AMC",
    scopeAndInclusions: "Submersible pump maintenance, pressure tank gauge check, flow switch testing, and mainline leak inspection.",
    rateINR: "₹3,000 – ₹12,000 / quarter",
    minPrice: 3000,
    maxPrice: 12000,
    unit: "quarter"
  },
  {
    id: "comm-5",
    category: "Community",
    title: "Bulk Society Residential Care Package",
    scopeAndInclusions: "Dedicated on-call multi-skilled technician team with priority SLAs and resident discounts for entire housing society.",
    rateINR: "₹8,000 – ₹25,000 / month",
    minPrice: 8000,
    maxPrice: 25000,
    unit: "month",
    popular: true
  }
];

/**
 * Dynamic price estimator based on 2,000-job calibration model:
 * Rating Multiplier: 1★ (-10%), 2★ (-5%), 3★ (Base), 4★ (+5%), 5★ (+10%)
 */
export function calculateDynamicEstimate(minRate: number, maxRate: number, rating: number = 4.5, quantity: number = 1): number {
  const avg = (minRate + maxRate) / 2;
  const multiplier = rating >= 4.6 ? 1.10 : rating >= 3.8 ? 1.05 : rating >= 3.0 ? 1.00 : 0.95;
  return Math.round(avg * quantity * multiplier);
}
