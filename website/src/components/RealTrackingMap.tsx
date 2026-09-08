'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Compass, Layers, ShieldCheck, User } from 'lucide-react';

interface RealTrackingMapProps {
  workerName?: string;
  customerAddress?: string;
  initialDistanceKm?: number;
}

export default function RealTrackingMap({
  workerName = 'Rajesh Kumar (Master Plumber)',
  customerAddress = 'B/402, Shanti Heights, Navrangpura, Ahmedabad',
  initialDistanceKm = 2.4,
}: RealTrackingMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const workerMarkerRef = useRef<any>(null);
  const routeLineRef = useRef<any>(null);

  const [distanceKm, setDistanceKm] = useState(initialDistanceKm);
  const [etaMins, setEtaMins] = useState(8);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [workerProgress, setWorkerProgress] = useState(0);

  // Ahmedabad coordinates
  // Destination: Customer home in Navrangpura
  const customerCoord: [number, number] = [23.0368, 72.5615];
  // Origin: Worker starting location near Paldi
  const startCoord: [number, number] = [23.0135, 72.5570];

  // Interpolated waypoints representing actual road path
  const waypoints: [number, number][] = [
    [23.0135, 72.5570],
    [23.0175, 72.5582],
    [23.0220, 72.5595],
    [23.0265, 72.5602],
    [23.0310, 72.5608],
    [23.0368, 72.5615],
  ];

  useEffect(() => {
    let isMounted = true;

    // Dynamically import Leaflet only on client side
    const initLeaflet = async () => {
      if (!mapContainerRef.current) return;

      try {
        const L = (await import('leaflet')).default;

        // Inject leaflet CSS via link tag (avoids TypeScript module resolution issues)
        if (!document.querySelector('#leaflet-css')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
          // Wait a tick for CSS to register
          await new Promise((r) => setTimeout(r, 50));
        }

        if (!isMounted || mapInstanceRef.current) return;

        // Create Leaflet Map centered between worker & customer
        const midLat = (startCoord[0] + customerCoord[0]) / 2;
        const midLng = (startCoord[1] + customerCoord[1]) / 2;

        const map = L.map(mapContainerRef.current, {
          center: [midLat, midLng],
          zoom: 14,
          zoomControl: false,
          attributionControl: false,
        });

        mapInstanceRef.current = map;

        // Clean modern OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          subdomains: ['a', 'b', 'c'],
        }).addTo(map);

        // Add Zoom control at top right
        L.control.zoom({ position: 'topright' }).addTo(map);

        // Customer Marker (Home / Green Pin)
        const customerIcon = L.divIcon({
          className: 'custom-customer-icon',
          html: `
            <div style="background-color: #0d9488; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(13,148,136,0.5); border: 2px solid white; position: relative;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); background: #042f2e; color: #fef08a; font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 6px; white-space: nowrap; border: 1px solid rgba(255,255,255,0.2);">
                Your Home
              </div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        L.marker(customerCoord, { icon: customerIcon })
          .addTo(map)
          .bindPopup(`<b>Your Address</b><br/>${customerAddress}`);

        // Worker Marker (Animated Vehicle / Amber Badge)
        const workerIcon = L.divIcon({
          className: 'custom-worker-icon',
          html: `
            <div style="position: relative; width: 44px; height: 44px;">
              <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background: rgba(245, 158, 11, 0.35); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: #042f2e; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(217,119,6,0.6); border: 2.5px solid white; position: absolute; top: 4px; left: 4px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                </svg>
              </div>
              <div style="position: absolute; top: -16px; left: 50%; transform: translateX(-50%); background: #042f2e; color: #6ee7b7; font-size: 9px; font-weight: 800; padding: 1px 6px; border-radius: 6px; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
                Rajesh (Moving)
              </div>
            </div>
          `,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        });

        const workerMarker = L.marker(startCoord, { icon: workerIcon }).addTo(map);
        workerMarkerRef.current = workerMarker;

        // Connecting Route Polyline (Teal glowing line)
        const routeLine = L.polyline(waypoints, {
          color: '#0d9488',
          weight: 5,
          opacity: 0.85,
          dashArray: '8, 8',
        }).addTo(map);
        routeLineRef.current = routeLine;

        // Fit map bounds to show full route comfortably
        map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });

        setMapLoaded(true);
      } catch (err) {
        console.error('Leaflet load error:', err);
      }
    };

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Simulate real-time worker movement along the waypoints
  useEffect(() => {
    if (!mapLoaded) return;

    const interval = setInterval(() => {
      setWorkerProgress((prev) => {
        const next = prev >= waypoints.length - 1 ? 0 : prev + 1;
        const currentCoord = waypoints[next];

        if (workerMarkerRef.current) {
          workerMarkerRef.current.setLatLng(currentCoord);
        }

        // Calculate remaining distance and ETA
        const remainingFraction = (waypoints.length - 1 - next) / (waypoints.length - 1);
        const newDist = Math.max(0.4, Number((initialDistanceKm * remainingFraction).toFixed(1)));
        const newEta = Math.max(2, Math.round(8 * remainingFraction));

        setDistanceKm(newDist);
        setEtaMins(newEta);

        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [mapLoaded]);

  const handleRecenter = () => {
    if (mapInstanceRef.current && routeLineRef.current) {
      mapInstanceRef.current.fitBounds(routeLineRef.current.getBounds(), { padding: [40, 40] });
    }
  };

  return (
    <div className="relative w-full h-64 sm:h-72 bg-slate-100 overflow-hidden border-b border-slate-200">
      {/* Real Interactive Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Status Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="bg-[#042f2e]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-lg border border-teal-500/30 flex items-center gap-2 pointer-events-auto">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-extrabold tracking-wide uppercase text-emerald-100">
            Live GPS Active • Ahmedabad
          </span>
        </div>

        <button
          onClick={handleRecenter}
          className="bg-white hover:bg-slate-50 text-slate-700 p-2 rounded-xl shadow-md border border-slate-200 text-xs font-bold flex items-center gap-1 transition pointer-events-auto active:scale-95"
          title="Recenter Map"
        >
          <Compass className="w-4 h-4 text-teal-700" />
          <span className="text-[10px] hidden sm:inline">Recenter</span>
        </button>
      </div>

      {/* Bottom Floating Route Info Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 flex-shrink-0">
            <Navigation className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-900 leading-tight">
              {distanceKm} km away • {etaMins} mins ETA
            </p>
            <p className="text-[10px] text-slate-500 truncate max-w-[180px] sm:max-w-xs">
              Navrangpura Route via CG Road
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-lg">
            En Route
          </span>
        </div>
      </div>
    </div>
  );
}
