import { useEffect, useRef } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

/**
 * Wrapper around the new google.maps.places.PlaceAutocompleteElement web
 * component. Replaces the deprecated google.maps.places.Autocomplete class.
 *
 * Requires the "Places API (New)" to be enabled in the Google Cloud project.
 */
export default function PlaceAutocomplete({
    onPlaceSelect,
    placeholder = 'Cerca una ubicació',
}) {
    const containerRef = useRef(null);
    const onPlaceSelectRef = useRef(onPlaceSelect);
    const places = useMapsLibrary('places');

    // Keep the latest callback without re-instantiating the element.
    useEffect(() => {
        onPlaceSelectRef.current = onPlaceSelect;
    }, [onPlaceSelect]);

    useEffect(() => {
        if (!places || !containerRef.current) {
            return;
        }

        const element = new places.PlaceAutocompleteElement();
        element.setAttribute('placeholder', placeholder);
        element.style.width = '100%';

        containerRef.current.appendChild(element);

        const handleSelect = async (event) => {
            const prediction = event.placePrediction;

            if (!prediction) {
                onPlaceSelectRef.current?.(null);
                return;
            }

            const place = prediction.toPlace();

            try {
                await place.fetchFields({
                    fields: [
                        'id',
                        'displayName',
                        'formattedAddress',
                        'location',
                    ],
                });
            } catch (error) {
                console.error('fetchFields failed', error);
                onPlaceSelectRef.current?.(null);
                return;
            }

            if (!place.location) {
                onPlaceSelectRef.current?.(null);
                return;
            }

            onPlaceSelectRef.current?.({
                place_id: place.id,
                name: place.displayName || place.formattedAddress || '',
                formatted_address: place.formattedAddress || '',
                lat: place.location.lat(),
                lng: place.location.lng(),
            });
        };

        element.addEventListener('gmp-select', handleSelect);

        return () => {
            element.removeEventListener('gmp-select', handleSelect);
            element.remove();
        };
    }, [places, placeholder]);

    return <div ref={containerRef} className="w-full" />;
}
