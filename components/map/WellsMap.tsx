'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Well } from '@/types';
import { Card } from '@/components/ui/card';
import { BASIN_BOUNDARIES } from '@/lib/data/major-facilities';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3Jlb2RlYm5hdGgiLCJhIjoiY21oaXN2MzRzMTVxMTJpcjRzajFlY2g3ZSJ9.fT1UNAWxuOly4wb-bgscng';

interface WellsMapProps {
  wells: Well[];
}

interface WellWithHighlight extends Well {
  highlight?: boolean;
}

export function WellsMap({ wells }: WellsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selectedWell, setSelectedWell] = useState<Well | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const isMobile = window.innerWidth < 768;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: isMobile ? [-115.5, 55.0] : [-114.0719, 55.5461],
      zoom: isMobile ? 3.0 : 5.5,
      accessToken: MAPBOX_TOKEN
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      if (!map.current) return;

      BASIN_BOUNDARIES.forEach((basin, index) => {
        const coordinates = basin.coordinates.map(coord => [coord.lng, coord.lat]);
        coordinates.push(coordinates[0]);

        map.current!.addSource(`basin-${index}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [coordinates]
            },
            properties: basin
          }
        });

        const color = basin.type === 'oil-sands' ? '#22c55e' :
                     basin.type === 'gas' ? '#3b82f6' : '#f59e0b';

        map.current!.addLayer({
          id: `basin-fill-${index}`,
          type: 'fill',
          source: `basin-${index}`,
          paint: {
            'fill-color': color,
            'fill-opacity': 0.15
          }
        });

        map.current!.addLayer({
          id: `basin-outline-${index}`,
          type: 'line',
          source: `basin-${index}`,
          paint: {
            'line-color': color,
            'line-width': 2,
            'line-opacity': 0.6
          }
        });
      });

      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(251, 191, 36, 1); }
          50% { transform: scale(1.15); box-shadow: 0 0 40px rgba(251, 191, 36, 1); }
        }
        .well-marker {
          transition: transform 0.2s ease;
        }
        .well-marker:hover {
          transform: scale(1.2);
          z-index: 1000;
        }
      `;
      document.head.appendChild(style);

      wells.forEach((well) => {
        const wellWithHighlight = well as WellWithHighlight;
        const isHighlight = wellWithHighlight.highlight === true;
        
        const el = document.createElement('div');
        el.className = 'well-marker';
        
        const size = isHighlight ? (isMobile ? 24 : 30) : (isMobile ? 18 : 22);
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        el.style.border = isHighlight ? `${isMobile ? 3 : 4}px solid #fbbf24` : `${isMobile ? 2 : 3}px solid white`;
        el.style.boxShadow = isHighlight 
          ? '0 0 30px rgba(251, 191, 36, 1)' 
          : '0 2px 8px rgba(0,0,0,0.4)';
        
        if (well.type === 'oil') {
          el.style.backgroundColor = '#22c55e';
        } else {
          el.style.backgroundColor = '#3b82f6';
        }

        if (isHighlight) {
          el.style.animation = 'pulse 2s ease-in-out infinite';
        }

        const marker = new mapboxgl.Marker({
          element: el,
          anchor: 'center'
        })
          .setLngLat([well.longitude, well.latitude])
          .addTo(map.current!);

        markersRef.current.push(marker);

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedWell(well);
        });
      });
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, [wells]);

  return (
    <div className="relative">
      <div ref={mapContainer} className="w-full h-[500px] md:h-[600px] rounded-lg" />
      
      <Card className="absolute bottom-4 left-4 p-3 md:p-4 bg-background/95 backdrop-blur max-w-[180px] md:max-w-xs">
        <h3 className="font-semibold mb-2 text-sm md:text-base">Legend</h3>
        <div className="space-y-2 text-xs md:text-sm">
          <div>
            <div className="font-medium mb-1">Major Facilities</div>
            <div className="flex items-center gap-2 ml-2 mb-1">
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 border-2 md:border-3 border-white shadow-lg flex-shrink-0" />
              <span>Oil</span>
            </div>
            <div className="flex items-center gap-2 ml-2 mb-1">
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-500 border-2 md:border-3 border-white shadow-lg flex-shrink-0" />
              <span>Gas</span>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-500 border-3 md:border-4 border-yellow-400 flex-shrink-0" style={{ boxShadow: '0 0 15px rgba(251, 191, 36, 0.8)' }} />
              <span className="font-semibold text-xs">Former Site</span>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1 mt-2">Basins</div>
            <div className="flex items-center gap-2 ml-2 mb-1">
              <div className="w-3 h-3 bg-green-500 opacity-20 border border-green-500 flex-shrink-0" />
              <span>Oil Sands</span>
            </div>
            <div className="flex items-center gap-2 ml-2 mb-1">
              <div className="w-3 h-3 bg-blue-500 opacity-20 border border-blue-500 flex-shrink-0" />
              <span>Gas</span>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <div className="w-3 h-3 bg-orange-500 opacity-20 border border-orange-500 flex-shrink-0" />
              <span>Liquids</span>
            </div>
          </div>
        </div>
      </Card>

      {selectedWell && (
        <Card className="absolute top-4 right-4 p-3 md:p-4 bg-background/95 backdrop-blur w-72 md:w-80 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-base md:text-lg pr-2">{selectedWell.name}</h3>
            <button 
              onClick={() => setSelectedWell(null)}
              className="text-muted-foreground hover:text-foreground text-2xl leading-none flex-shrink-0"
            >
              ×
            </button>
          </div>
          <div className="space-y-2 text-xs md:text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground flex-shrink-0">Operator:</span>
              <span className="font-medium text-right">{selectedWell.operator}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground flex-shrink-0">Type:</span>
              <span className="capitalize font-medium">{selectedWell.facility || selectedWell.type}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground flex-shrink-0">Production:</span>
              <span className="font-medium">
                {selectedWell.production.toLocaleString()} {selectedWell.type === 'oil' ? 'bbl/d' : 'MMcf/d'}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground flex-shrink-0">Status:</span>
              <span className="capitalize font-medium text-green-500">{selectedWell.status}</span>
            </div>
            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
              Data represents major producing facilities in Alberta. Production figures are publicly reported estimates from AER.
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}