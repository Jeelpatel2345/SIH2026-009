'use client';

import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, Filter, MapPin, Star, ShieldCheck, Clock, 
  ArrowRight, Sparkles, CheckCircle2, ChevronRight, SlidersHorizontal 
} from 'lucide-react';
import { serviceCategories, allWorkers } from '@/data/workersData';

function ServicesCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialCity = searchParams.get('city') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<'rating' | 'price-low' | 'price-high' | 'experience'>('rating');

  const filteredWorkers = useMemo(() => {
    return allWorkers.filter((worker) => {
      // Category match
      const catMatch = selectedCategory === 'All' || worker.category === selectedCategory;
      // City match
      const cityMatch = selectedCity === 'All' || worker.city === selectedCity;
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const textMatch = 
        !q ||
        worker.name.toLowerCase().includes(q) ||
        worker.title.toLowerCase().includes(q) ||
        worker.category.toLowerCase().includes(q) ||
        worker.city.toLowerCase().includes(q) ||
        worker.skills.some((s) => s.toLowerCase().includes(q));

      return catMatch && cityMatch && textMatch;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.rate - b.rate;
      if (sortBy === 'price-high') return b.rate - a.rate;
      if (sortBy === 'experience') {
        const expA = a.exp || 0;
        const expB = b.exp || 0;
        return expB - expA;
      }
      return 0;
    });
  }, [selectedCategory, selectedCity, searchQuery, sortBy]);

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const cities = ['All', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'];

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Banner */}
        <div className="bg-[#042f2e] text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-emerald-900/60 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="text-xs uppercase font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-3 py-1 rounded-full">
              Full Network Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Browse 100+ Verified Service Experts
            </h1>
            <p className="text-sm text-emerald-200/90 leading-relaxed">
              Every worker has verified Aadhaar credentials, police clearing, and transparent hourly pricing. 
              Book direct with instant confirmation.
            </p>
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by worker name, skill, or service..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium border border-slate-200 rounded-xl outline-none focus:border-teal-600 transition text-slate-800"
              />
            </div>

            {/* City & Sort controls */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-semibold text-slate-500">City:</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer text-slate-700"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-semibold text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer text-slate-700"
                >
                  <option value="rating">Top Rated (Highest)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="experience">Most Experienced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-slate-100">
            <button
              onClick={() => setSelectedCategory('All')}
              className={'text-xs font-bold px-4 py-2 rounded-xl transition whitespace-nowrap ' + (
                selectedCategory === 'All' 
                  ? 'bg-teal-700 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              All Categories ({allWorkers.length})
            </button>

            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={'text-xs font-bold px-4 py-2 rounded-xl transition whitespace-nowrap ' + (
                  selectedCategory === cat.name 
                    ? 'bg-teal-700 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Showing <b>{filteredWorkers.length}</b> verified partners available</span>
          {(selectedCategory !== 'All' || searchQuery || selectedCity !== 'All') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedCity('All');
                setSearchQuery('');
              }}
              className="text-teal-700 hover:underline font-bold"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Worker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-teal-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header: Photo + Name + Rating */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-800 text-white font-black text-base flex items-center justify-center shadow-md flex-shrink-0">
                      {getInitials(w.name)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-base leading-snug">{w.name}</h3>
                        <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-teal-700 font-semibold">{w.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-black text-amber-800 flex-shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{w.rating}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {w.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5">
                  {w.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {w.skills.length > 3 && (
                    <span className="text-[10px] font-semibold bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded">
                      +{w.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Details row */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{(w.exp + " yrs")} exp</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{w.city}</span>
                  </div>
                  <div className="font-bold text-emerald-700">
                    {w.reviewsCount}+ jobs
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Standard Rate</span>
                  <span className="text-lg font-black text-slate-900">
                    ₹{w.rate}
                    <span className="text-xs font-normal text-slate-500">/hr</span>
                  </span>
                </div>

                <Link
                  href={'/book/' + w.id}
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm hover:scale-[1.02]"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 max-w-md mx-auto space-y-3">
            <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No matching partners found</h3>
            <p className="text-xs text-slate-500">
              Try changing your search terms or select another category or city.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedCity('All');
                setSearchQuery('');
              }}
              className="bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-xl mt-2"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ServicesCatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 text-slate-500 font-bold text-sm">
        Loading services catalog...
      </div>
    }>
      <ServicesCatalogContent />
    </Suspense>
  );
}
