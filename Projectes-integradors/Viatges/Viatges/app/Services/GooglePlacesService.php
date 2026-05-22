<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GooglePlacesService
{
    public function __construct(private readonly ?string $apiKey = null) {}

    /**
     * Fetch place details from the Google Places API (New) using a place ID.
     *
     * @return array{lat: float, lng: float, name: ?string, formatted_address: ?string}|null
     */
    public function getPlaceDetails(string $placeId): ?array
    {
        $apiKey = $this->apiKey ?? config('services.google.places_api_key');

        if (empty($apiKey)) {
            Log::warning('GooglePlacesService: missing API key');

            return null;
        }

        $response = Http::withHeaders([
            'X-Goog-Api-Key' => $apiKey,
            'X-Goog-FieldMask' => 'id,location,displayName,formattedAddress',
        ])->get("https://places.googleapis.com/v1/places/{$placeId}");

        if (! $response->successful()) {
            Log::warning('GooglePlacesService: request failed', [
                'place_id' => $placeId,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return null;
        }

        $data = $response->json();

        if (! isset($data['location']['latitude'], $data['location']['longitude'])) {
            return null;
        }

        return [
            'lat' => (float) $data['location']['latitude'],
            'lng' => (float) $data['location']['longitude'],
            'name' => $data['displayName']['text'] ?? null,
            'formatted_address' => $data['formattedAddress'] ?? null,
        ];
    }
}
