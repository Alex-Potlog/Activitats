import React from 'react';
import { Map as GoogleMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import './Map.css';

export default function Map({ lat, lng, zoom = 9 }) {
    const position = { lat, lng };

    if (import.meta.env.VITE_ENABLE_MAPS !== 'true') {
        return (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                Mapa desactivat (Mode estalvi)
            </div>
        );
    }

    return (
        <div className="map-container w-full h-full">
            <GoogleMap
                defaultZoom={zoom}
                defaultCenter={position}
                mapId={import.meta.env.VITE_GOOGLE_MAP_ID || 'DEMO_MAP_ID'}
                mapTypeId={'hybrid'}
                disableDefaultUI={true}
                gestureHandling={'none'}
            >
                <AdvancedMarker position={position} />
            </GoogleMap>
        </div>
    );
}
