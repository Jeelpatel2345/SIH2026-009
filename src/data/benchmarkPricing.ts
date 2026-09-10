/**
 * SahYog Professional Benchmark Pricing & Service Specifications Guide
 * Extracted from official professional labor rate benchmark guides (INR).
 */

export interface ServiceSpec {
  id: string;
  category: 'Cleaning' | 'Plumbing' | 'Electrician' | 'Community';
  title: string;
  scopeAndInclusions: string;
  rateINR: string;
  minPrice: number;
  maxPrice: number;
  unit: string;
  popular?: boolean;
}

export const benchmarkServices: ServiceSpec[] = [
  // --- TOP 8 CLEANING SERVICES ---
  {
    id: 'clean-1',
    category: 'Cleaning',
    title: 'Full-Home Deep Cleaning',
    scopeAndInclusions: 'Floor scrubbing/buffing, dusting, wall cobweb removal, doors, switches, and windows.',
    rateINR: '₹2,500 – ₹7,500 / job (1–3 BHK)',
    minPrice: 2500,
    maxPrice: 7500,
    unit: 'job',
    popular: true
  },
  {
    id: 'clean-2',
    category: 'Cleaning',
    title: 'Move-In / Move-Out Cleaning',
    scopeAndInclusions: 'Detailed sanitation of empty homes, internal wardrobes, drawers, cabinets, and appliances.',
    rateINR: '₹3,500 – ₹9,000 / job',
    minPrice: 3500,
    maxPrice: 9000,
    unit: 'job'
  },
  {
    id: 'clean-3',
    category: 'Cleaning',
    title: 'Kitchen Deep Cleaning',
    scopeAndInclusions: 'Degreasing tiles, stovetop, slab sanitization, external cabinets, and chimney wipe-down.',
    rateINR: '₹1,200 – ₹2,500 / kitchen',
    minPrice: 1200,
    maxPrice: 2500,
    unit: 'kitchen',
    popular: true
  },
  {
    id: 'clean-4',
    category: 'Cleaning',
    title: 'Bathroom Deep Sanitization',
    scopeAndInclusions: 'Tile descaling, hard-water stain removal, toilet sanitization, grout and fitting polishing.',
    rateINR: '₹500 – ₹1,200 / bathroom',
    minPrice: 500,
    maxPrice: 1200,
    unit: 'bathroom',
    popular: true
  },
  {
    id: 'clean-5',
    category: 'Cleaning',
    title: 'Sofa & Upholstery Cleaning',
    scopeAndInclusions: 'Wet vacuuming, fabric shampooing, extraction, and spot stain treatment.',
    rateINR: '₹300 – ₹500 / seat',
    minPrice: 300,
    maxPrice: 500,
    unit: 'seat'
  },
  {
    id: 'clean-6',
    category: 'Cleaning',
    title: 'Carpet & Rug Shampooing',
    scopeAndInclusions: 'Dust mite extraction, deep fiber shampooing, and moisture extraction.',
    rateINR: '₹15 – ₹30 / sq. ft.',
    minPrice: 15,
    maxPrice: 30,
    unit: 'sq. ft.'
  },
  {
    id: 'clean-7',
    category: 'Cleaning',
    title: 'Post-Construction Cleaning',
    scopeAndInclusions: 'Heavy debris clearing, cement/paint splatter removal, fine dust vacuuming from all corners.',
    rateINR: '₹5 – ₹12 / sq. ft.',
    minPrice: 5,
    maxPrice: 12,
    unit: 'sq. ft.'
  },
  {
    id: 'clean-8',
    category: 'Cleaning',
    title: 'Commercial Office Cleaning',
    scopeAndInclusions: 'Desk disinfection, trash removal, restrooms, pantry, and high-traffic floor care.',
    rateINR: '₹3 – ₹8 / sq. ft. (or ₹6,000 – ₹20,000/mo)',
    minPrice: 6000,
    maxPrice: 20000,
    unit: 'month'
  },

  // --- TOP 8 PLUMBING SERVICES ---
  {
    id: 'plumb-1',
    category: 'Plumbing',
    title: 'Tap & Faucet Repair / Installation',
    scopeAndInclusions: 'Fixing dripping taps, cartridge replacement, spindle repair, or installing new mixer/faucets.',
    rateINR: '₹150 – ₹400 / unit',
    minPrice: 150,
    maxPrice: 400,
    unit: 'unit',
    popular: true
  },
  {
    id: 'plumb-2',
    category: 'Plumbing',
    title: 'Drain & Pipe Blockage Clearing',
    scopeAndInclusions: 'Mechanical snake/manual rodding to clear clogged washbasins, kitchen sinks, showers, or main traps.',
    rateINR: '₹300 – ₹1,200 / point',
    minPrice: 300,
    maxPrice: 1200,
    unit: 'point',
    popular: true
  },
  {
    id: 'plumb-3',
    category: 'Plumbing',
    title: 'Toilet & Commode Installation/Repair',
    scopeAndInclusions: 'Flush tank kit fixing, siphon/inlet valve replacement, wax ring leak sealing, or full commode replacement.',
    rateINR: '₹400 – ₹1,800 / job',
    minPrice: 400,
    maxPrice: 1800,
    unit: 'job'
  },
  {
    id: 'plumb-4',
    category: 'Plumbing',
    title: 'Pipe Leakage & Concealed Repair',
    scopeAndInclusions: 'Identifying wall dampness source, cutting/splicing damaged CPVC/UPVC/GI pipes, and fitting joints.',
    rateINR: '₹500 – ₹2,500 / job',
    minPrice: 500,
    maxPrice: 2500,
    unit: 'job',
    popular: true
  },
  {
    id: 'plumb-5',
    category: 'Plumbing',
    title: 'Geyser & Water Heater Plumbing',
    scopeAndInclusions: 'Inlet/outlet connection hose fitting, non-return valve (NRV) installation, line flushing, and demounting.',
    rateINR: '₹350 – ₹800 / unit',
    minPrice: 350,
    maxPrice: 800,
    unit: 'unit'
  },
  {
    id: 'plumb-6',
    category: 'Plumbing',
    title: 'Water Tank Installation & Plumbing',
    scopeAndInclusions: 'Overhead/loft tank pipeline setup, float/ball valve replacement, overflow & vent line plumbing.',
    rateINR: '₹800 – ₹3,000 / tank',
    minPrice: 800,
    maxPrice: 3000,
    unit: 'tank'
  },
  {
    id: 'plumb-7',
    category: 'Plumbing',
    title: 'Water Pump / Motor Setup',
    scopeAndInclusions: 'Centrifugal/submersible pump installation, suction & delivery line union fittings, bypass valve setup.',
    rateINR: '₹600 – ₹1,500 / pump',
    minPrice: 600,
    maxPrice: 1500,
    unit: 'pump'
  },
  {
    id: 'plumb-8',
    category: 'Plumbing',
    title: 'Full Bathroom / Complete Line Fitout',
    scopeAndInclusions: 'Full rough-in and trim-out: concealed piping, shower diverters, waste lines, and multiple fixture fittings.',
    rateINR: '₹3,500 – ₹10,000 / bath',
    minPrice: 3500,
    maxPrice: 10000,
    unit: 'bath'
  },

  // --- TOP 8 ELECTRICIAN SERVICES ---
  {
    id: 'elec-1',
    category: 'Electrician',
    title: 'Switch, Socket & Board Repair',
    scopeAndInclusions: 'Replacing modular/regular switches, burnt sockets, dimmer switches, and loose terminal reconnection.',
    rateINR: '₹100 – ₹250 / point',
    minPrice: 100,
    maxPrice: 250,
    unit: 'point',
    popular: true
  },
  {
    id: 'elec-2',
    category: 'Electrician',
    title: 'Fan Installation & Repair',
    scopeAndInclusions: 'Ceiling/exhaust fan mounting, blade balancing, regulator pairing, capacitor replacement, or motor re-wiring.',
    rateINR: '₹200 – ₹450 / unit',
    minPrice: 200,
    maxPrice: 450,
    unit: 'unit',
    popular: true
  },
  {
    id: 'elec-3',
    category: 'Electrician',
    title: 'Decorative & Architectural Lighting',
    scopeAndInclusions: 'Installation of false ceiling spot/cove LEDs, chandeliers, track lights, wall sconces, and driver units.',
    rateINR: '₹150 – ₹1,200 / unit',
    minPrice: 150,
    maxPrice: 1200,
    unit: 'unit'
  },
  {
    id: 'elec-4',
    category: 'Electrician',
    title: 'MCB & Distribution Board (DB) Setup',
    scopeAndInclusions: 'Troubleshooting tripping breakers, replacing faulty single/double-pole MCBs, RCCB/ELCB, or rewiring DB box.',
    rateINR: '₹300 – ₹1,500 / job',
    minPrice: 300,
    maxPrice: 1500,
    unit: 'job',
    popular: true
  },
  {
    id: 'elec-5',
    category: 'Electrician',
    title: 'Inverter & Battery Installation',
    scopeAndInclusions: 'Mounting inverter system, battery terminal cabling, earthing check, bypass line separation, and load testing.',
    rateINR: '₹500 – ₹1,200 / setup',
    minPrice: 500,
    maxPrice: 1200,
    unit: 'setup'
  },
  {
    id: 'elec-6',
    category: 'Electrician',
    title: 'Appliance Electrical Line Setup',
    scopeAndInclusions: 'Heavy-duty power connection (16A/20A) with dedicated conduit/cable for ACs, geysers, or induction hobs.',
    rateINR: '₹400 – ₹900 / point',
    minPrice: 400,
    maxPrice: 900,
    unit: 'point'
  },
  {
    id: 'elec-7',
    category: 'Electrician',
    title: 'Short Circuit & Fault Diagnosis',
    scopeAndInclusions: 'Tracing invisible insulation faults, earth leakages, burnt conduit wiring, and restoring localized power loss.',
    rateINR: '₹500 – ₹1,800 / visit',
    minPrice: 500,
    maxPrice: 1800,
    unit: 'visit',
    popular: true
  },
  {
    id: 'elec-8',
    category: 'Electrician',
    title: 'Full-Home Conduit Wiring / Rewiring',
    scopeAndInclusions: 'Complete rough-in wiring: running conduit pipes, pulling FRLS cables, circuit tagging, and final switchboard assembly.',
    rateINR: '₹15 – ₹35 / sq. ft. (or ₹120–₹250 / point)',
    minPrice: 15,
    maxPrice: 35,
    unit: 'sq. ft.'
  },

  // --- COMMUNITY & SOCIETY SERVICES ---
  {
    id: 'comm-1',
    category: 'Community',
    title: 'Society Water Tank Deep Cleaning & Disinfection',
    scopeAndInclusions: 'Rotary jet scrubbing, sludge extraction pump, antibacterial UV & chlorine misting for underground/overhead community tanks.',
    rateINR: '₹1,500 – ₹4,500 / tank',
    minPrice: 1500,
    maxPrice: 4500,
    unit: 'tank',
    popular: true
  },
  {
    id: 'comm-2',
    category: 'Community',
    title: 'Apartment Common Area & Parking Sanitation',
    scopeAndInclusions: 'High-pressure floor buffing, stairwell sanitization, clubhouse cleaning, and storm drain debris clearing.',
    rateINR: '₹2,500 – ₹8,000 / society',
    minPrice: 2500,
    maxPrice: 8000,
    unit: 'society',
    popular: true
  },
  {
    id: 'comm-3',
    category: 'Community',
    title: 'Society Main Distribution Panel & Streetlight AMC',
    scopeAndInclusions: 'DG synchronizer check, campus street lights, earthing pits resistance test, and clubhouse electrical inspection.',
    rateINR: '₹2,000 – ₹7,500 / visit',
    minPrice: 2000,
    maxPrice: 7500,
    unit: 'visit'
  },
  {
    id: 'comm-4',
    category: 'Community',
    title: 'Apartment Central Hydro-Pneumatic Pump AMC',
    scopeAndInclusions: 'Submersible pump maintenance, pressure tank gauge check, flow switch testing, and mainline leak inspection.',
    rateINR: '₹3,000 – ₹12,000 / quarter',
    minPrice: 3000,
    maxPrice: 12000,
    unit: 'quarter'
  },
  {
    id: 'comm-5',
    category: 'Community',
    title: 'Bulk Society Residential Care Package',
    scopeAndInclusions: 'Dedicated on-call multi-skilled technician team with priority SLAs and resident discounts for entire housing society.',
    rateINR: '₹8,000 – ₹25,000 / month',
    minPrice: 8000,
    maxPrice: 25000,
    unit: 'month',
    popular: true
  }
];
