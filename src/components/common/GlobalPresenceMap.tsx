'use client';

/* ═══════════════════════════════════════════════════════════════
   Global Presence Map Component — Real Geographic Coordinates
   Uses Leaflet with clean CartoDB Voyager tiles & precise SVG teardrop pins.
   Guarantees 100% accurate pin placement on exact country coordinates.
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from 'react';

export interface CountryPin {
  code: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
  isHQ?: boolean;
}

export const EXPORT_MAP_LOCATIONS: CountryPin[] = [
  { code: 'IN', name: 'India (HQ)', lat: 20.5937, lng: 78.9629, color: '#25D366', isHQ: true },
  { code: 'BD', name: 'Bangladesh', lat: 23.6850, lng: 90.3563, color: '#E53935' },
  { code: 'LK', name: 'Sri Lanka', lat: 7.8731, lng: 80.7718, color: '#D81B60' },
  { code: 'MY', name: 'Malaysia', lat: 4.2105, lng: 101.9758, color: '#8E24AA' },
  { code: 'SG', name: 'Singapore', lat: 1.3521, lng: 103.8198, color: '#5C6BC0' },
  { code: 'NP', name: 'Nepal', lat: 28.3949, lng: 84.1240, color: '#1E88E5' },
  { code: 'BT', name: 'Bhutan', lat: 27.5142, lng: 90.4336, color: '#00897B' },
  { code: 'AE', name: 'UAE', lat: 23.4241, lng: 53.8478, color: '#43A047' },
  { code: 'SA', name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792, color: '#FB8C00' },
  { code: 'OM', name: 'Oman', lat: 21.4735, lng: 55.9754, color: '#F9A825' },
  { code: 'QA', name: 'Qatar', lat: 25.3548, lng: 51.1839, color: '#6D4C41' },
  { code: 'KW', name: 'Kuwait', lat: 29.3117, lng: 47.4818, color: '#FF6F00' },
  { code: 'ID', name: 'Indonesia', lat: -0.7893, lng: 113.9213, color: '#00ACC1' },
  { code: 'VN', name: 'Vietnam', lat: 14.0583, lng: 108.2772, color: '#7CB342' },
  { code: 'TH', name: 'Thailand', lat: 15.8700, lng: 100.9925, color: '#C62828' },
  { code: 'NG', name: 'Nigeria', lat: 9.0820, lng: 8.6753, color: '#AD1457' },
  { code: 'KE', name: 'Kenya', lat: -1.2921, lng: 36.8219, color: '#4527A0' },
  { code: 'US', name: 'United States', lat: 37.0902, lng: -95.7129, color: '#283593' },
];

interface GlobalPresenceMapProps {
  height?: string;
  initialZoom?: number;
  center?: [number, number];
  showTitleBar?: boolean;
}

export default function GlobalPresenceMap({
  height = '450px',
  initialZoom = 2,
  center = [20, 50],
  showTitleBar = true,
}: GlobalPresenceMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    // Load Leaflet CSS dynamically
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS dynamically
    const loadLeafletScript = () => {
      return new Promise<void>((resolve) => {
        if ((window as any).L) {
          resolve();
          return;
        }
        const existingScript = document.getElementById('leaflet-js');
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve());
        } else {
          const script = document.createElement('script');
          script.id = 'leaflet-js';
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = () => resolve();
          document.head.appendChild(script);
        }
      });
    };

    loadLeafletScript().then(() => {
      if (!isMounted || !containerRef.current) return;

      const L = (window as any).L;
      if (!L) return;

      // Clean existing instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize map
      const map = L.map(containerRef.current, {
        center: center,
        zoom: initialZoom,
        minZoom: 2,
        maxZoom: 8,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapInstanceRef.current = map;

      // Add CartoDB Voyager tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Add precise SVG teardrop pins
      EXPORT_MAP_LOCATIONS.forEach((loc) => {
        const isHQ = loc.isHQ;

        const pinWidth = isHQ ? 28 : 22;
        const pinHeight = isHQ ? 36 : 28;

        const svgPin = `
          <div style="position:relative; width:${pinWidth}px; height:${pinHeight}px;">
            ${isHQ ? `<div style="position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:32px; height:32px; border-radius:50%; background:rgba(37,211,102,0.3); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
            <svg width="${pinWidth}" height="${pinHeight}" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block; filter: drop-shadow(0px 3px 5px rgba(0,0,0,0.35));">
              <path d="M12 0C5.37 0 0 5.37 0 12C0 21 12 32 12 32C12 32 24 21 24 12C24 5.37 18.63 0 12 0Z" fill="${loc.color}" stroke="#FFFFFF" stroke-width="1.8"/>
              <circle cx="12" cy="12" r="4.5" fill="#FFFFFF"/>
            </svg>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'clean-map-pin',
          html: svgPin,
          iconSize: [pinWidth, pinHeight],
          iconAnchor: [pinWidth / 2, pinHeight], // Bottom tip of the pin anchored exactly at lat/lng
        });

        const marker = L.marker([loc.lat, loc.lng], { 
          icon: customIcon,
          title: `${loc.name} - ${isHQ ? 'Manufacturing Headquarters' : 'Export Market'}`,
        }).addTo(map);

        // Bind tooltip on hover & popup on click
        marker.bindTooltip(
          `<div style="font-weight:700; font-size:11px; font-family:sans-serif;">${isHQ ? '🏭 ' : ''}${loc.name}</div>`,
          {
            permanent: isHQ, // Keep India HQ label visible, others on hover
            direction: 'top',
            offset: [0, -pinHeight],
            className: 'custom-map-tooltip',
          }
        );

        marker.bindPopup(`
          <div style="padding: 4px; text-align: center; font-family: sans-serif;">
            <strong style="color: ${loc.color}; font-size: 13px;">${isHQ ? '🏭 ' : '📍 '}${loc.name}</strong>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #64748b;">${isHQ ? 'Manufacturing Headquarters' : 'Active Export Market'}</p>
          </div>
        `);
      });

      // Force resize calculation after load
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 250);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, initialZoom]);

  return (
    <div className="rounded-2xl overflow-hidden border-2 border-primary/20 shadow-elevated relative bg-gray-100 flex flex-col">
      {/* Title Bar */}
      {showTitleBar && (
        <div className="bg-primary-dark px-5 py-3 flex items-center gap-3 z-10 flex-shrink-0">
          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-600 text-sm">Kalasam Jaikrishna Industries — Global Presence</h3>
            <p className="text-white/60 text-xs">Exporting to 17+ countries across Asia, Middle East, Africa & North America</p>
          </div>
        </div>
      )}

      {/* Map Canvas */}
      <div
        ref={containerRef}
        style={{ height }}
        className="w-full relative z-0 flex-1 min-h-[300px]"
      />

      {/* Footer Legend */}
      <div className="bg-white px-5 py-2.5 border-t border-gray-200 flex flex-wrap items-center justify-between text-xs text-gray-600 z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-600 text-primary">
            <span className="w-3 h-3 rounded-full bg-primary inline-block" />
            HQ — India
          </div>
          <span className="w-px h-3.5 bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            17+ Global Export Destinations
          </div>
        </div>
        <span className="text-gray-400 hidden sm:inline text-[11px]">Hover or click any pin for country details</span>
      </div>
    </div>
  );
}
