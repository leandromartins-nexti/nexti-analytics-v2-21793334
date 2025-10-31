import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface DeviceLocation {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  status: 'online' | 'offline' | 'maintenance';
  posto: string;
}

interface DeviceMapProps {
  devices: DeviceLocation[];
}

export function DeviceMap({ devices }: DeviceMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hb21hcmNlbG9kdWFydGUiLCJhIjoiY21oM3MwZmNxMTMwbDJtb2Q0M2x6ZXIyMSJ9.uIZthCCWo2RgvbWannUnyg';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-46.6333, -23.5505], // São Paulo, Brazil
        zoom: 10,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add markers for each device
      devices.forEach((device) => {
        const el = document.createElement('div');
        el.className = 'device-marker';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        el.style.backgroundColor = 
          device.status === 'online' ? '#22c55e' : 
          device.status === 'offline' ? '#ef4444' : '#f59e0b';

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 4px;">${device.name}</h3>
            <p style="margin: 2px 0; font-size: 12px;">Posto: ${device.posto}</p>
            <p style="margin: 2px 0; font-size: 12px;">
              Status: <span style="color: ${
                device.status === 'online' ? '#22c55e' : 
                device.status === 'offline' ? '#ef4444' : '#f59e0b'
              }; font-weight: 600;">
                ${
                  device.status === 'online' ? 'Online' : 
                  device.status === 'offline' ? 'Offline' : 'Manutenção'
                }
              </span>
            </p>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat(device.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Fit map to show all markers
      if (devices.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        devices.forEach((device) => {
          bounds.extend(device.coordinates);
        });
        map.current.fitBounds(bounds, { padding: 50 });
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [devices]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
}
