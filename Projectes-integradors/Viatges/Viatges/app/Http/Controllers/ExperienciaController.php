<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExperienciaRequest;
use App\Http\Requests\UpdateExperienciaEstatRequest;
use App\Http\Requests\UpdateExperienciaRequest;
use App\Models\Categoria;
use App\Models\Experiencia;
use App\Models\Like;
use App\Services\GooglePlacesService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ExperienciaController extends Controller
{
    public function __construct(private readonly GooglePlacesService $googlePlaces) {}

    private function applyUserReaction($query)
    {
        if (Auth::check()) {
            $query->addSelect([
                'user_reaction' => Like::select('valoracio')
                    ->whereColumn('id_experiencia', 'experiencies.id')
                    ->where('id_usuari', Auth::id())
                    ->limit(1),
            ]);
        }

        return $query;
    }

    /**
     * Llista totes les experiències publicades.
     */
    public function index()
    {
        $userId = Auth::id();

        $query = Experiencia::with(['usuari', 'categories'])
            ->where('estat', 'publicat')
            ->where(function ($q) use ($userId) {
                $q->where('id_usuari_creador', $userId)
                    ->orWhereHas('likes', function ($likeQuery) use ($userId) {
                        $likeQuery->where('id_usuari', $userId);
                    })
                    ->orWhereHas('comentaris', function ($commentQuery) use ($userId) {
                        $commentQuery->where('id_usuari', $userId);
                    });
            })
            ->withCount([
                'comentaris',
                'likes' => function ($query) {
                    $query->where('valoracio', 1);
                },
            ])
            ->latest();

        $experiencies = $this->applyUserReaction($query)->paginate(12)->withQueryString();

        return Inertia::render('Welcome', [
            'experiencies' => $experiencies,
        ]);
    }

    public function create()
    {
        $categories = Categoria::all('id', 'nom');

        return [
            'categories' => $categories,
        ];
    }

    /**
     * Crea una nova experiència.
     */
    public function store(StoreExperienciaRequest $request)
    {
        $validated = $request->validated();
        $estat = $validated['estat'];
        $dataPublicacio = $estat === 'publicat' ? now() : null;

        $latitud = $validated['latitud'] ?? null;
        $longitud = $validated['longitud'] ?? null;
        $ubicacioNom = $validated['ubicacio_nom'] ?? null;
        $googlePlaceId = $validated['google_place_id'] ?? null;

        if (! empty($googlePlaceId)) {
            $placeDetails = $this->googlePlaces->getPlaceDetails($googlePlaceId);

            if ($placeDetails === null) {
                throw ValidationException::withMessages([
                    'google_place_id' => 'No s\'han pogut obtenir les dades del lloc seleccionat.',
                ]);
            }

            $latitud = $placeDetails['lat'];
            $longitud = $placeDetails['lng'];
            $ubicacioNom = $ubicacioNom ?? $placeDetails['formatted_address'] ?? $placeDetails['name'];
        }

        // Pujar la imatge a Cloudinary
        $uploadedFile = cloudinary()->uploadApi()->upload($request->file('imatge')->getRealPath(), [
            'folder' => 'viatges/experiencies',
        ]);
        $imatgeUrl = $uploadedFile['secure_url'];

        $experiencia = Experiencia::create([
            'id_usuari_creador' => Auth::id(),
            'titol' => $validated['titol'],
            'contingut' => $validated['contingut'],
            'imatge' => $imatgeUrl,
            'latitud' => $latitud,
            'longitud' => $longitud,
            'ubicacio_nom' => $ubicacioNom,
            'google_place_id' => $googlePlaceId,
            'estat' => $estat,
            'data_publicacio' => $dataPublicacio,
        ]);

        $experiencia->categories()->sync($validated['id_categories'] ?? []);

        return redirect()->route('welcome')
            ->with('success', 'Experiència publicada correctament.');
    }

    /**
     * Mostra el detall d'una experiència.
     */
    public function show(Experiencia $experiencia)
    {
        $experiencia->load(['usuari', 'categories', 'comentaris.usuari']);
        $experiencia->loadCount([
            'comentaris',
            'likes' => function ($query) {
                $query->where('valoracio', 1);
            },
            'reports',
        ]);

        $experiencia->user_reaction = Auth::check()
            ? (int) (Like::where('id_experiencia', $experiencia->id)
                ->where('id_usuari', Auth::id())
                ->value('valoracio') ?? 0)
            : 0;

        return Inertia::render('Experiencies/Show', [
            'experiencia' => $experiencia,
        ]);
    }

    /**
     * Mostra el formulari d'edició d'un esborrany propi.
     */
    public function edit(Experiencia $experiencia)
    {
        if ($experiencia->id_usuari_creador !== Auth::id() || $experiencia->estat !== 'esborrany') {
            abort(403, 'Només pots editar els teus esborranys.');
        }

        $experiencia->load('categories:id');

        return Inertia::render('Experiencies/Edit', [
            'experiencia' => [
                'id' => $experiencia->id,
                'titol' => $experiencia->titol,
                'contingut' => $experiencia->contingut,
                'ubicacio_nom' => $experiencia->ubicacio_nom,
                'google_place_id' => $experiencia->google_place_id,
                'latitud' => $experiencia->latitud,
                'longitud' => $experiencia->longitud,
                'id_categories' => $experiencia->categories->pluck('id')->values(),
            ],
            'categories' => Categoria::query()->get(['id', 'nom']),
        ]);
    }

    /**
     * Actualitza un esborrany propi.
     */
    public function update(UpdateExperienciaRequest $request, Experiencia $experiencia): RedirectResponse
    {
        $validated = $request->validated();

        $latitud = $validated['latitud'] ?? null;
        $longitud = $validated['longitud'] ?? null;
        $ubicacioNom = $validated['ubicacio_nom'] ?? null;
        $googlePlaceId = $validated['google_place_id'] ?? null;

        if (! empty($googlePlaceId)) {
            $placeDetails = $this->googlePlaces->getPlaceDetails($googlePlaceId);

            if ($placeDetails === null) {
                throw ValidationException::withMessages([
                    'google_place_id' => 'No s\'han pogut obtenir les dades del lloc seleccionat.',
                ]);
            }

            $latitud = $placeDetails['lat'];
            $longitud = $placeDetails['lng'];
            $ubicacioNom = $ubicacioNom ?? $placeDetails['formatted_address'] ?? $placeDetails['name'];
        }

        $imatgeUrl = $experiencia->imatge;
        if ($request->hasFile('imatge')) {
            $uploadedFile = cloudinary()->uploadApi()->upload($request->file('imatge')->getRealPath(), [
                'folder' => 'viatges/experiencies',
            ]);
            $imatgeUrl = $uploadedFile['secure_url'];
        }

        $experiencia->update([
            'titol' => $validated['titol'],
            'contingut' => $validated['contingut'],
            'imatge' => $imatgeUrl,
            'latitud' => $latitud,
            'longitud' => $longitud,
            'ubicacio_nom' => $ubicacioNom,
            'google_place_id' => $googlePlaceId,
            'estat' => 'esborrany',
            'data_publicacio' => null,
        ]);

        $experiencia->categories()->sync($validated['id_categories'] ?? []);

        return redirect()->route('experiencies.show', $experiencia)
            ->with('success', 'Esborrany actualitzat correctament.');
    }

    /**
     * Elimina una experiència (només el creador).
     */
    public function destroy(Experiencia $experiencia)
    {
        if ($experiencia->id_usuari_creador !== Auth::id()) {
            abort(403, 'No tens permís per eliminar aquesta experiència.');
        }

        $experiencia->delete();

        return redirect()->route('experiencies.index')
            ->with('success', 'Experiència eliminada correctament.');
    }

    /**
     * Alterna l'estat d'una experiència entre esborrany i publicada.
     */
    public function updateEstat(UpdateExperienciaEstatRequest $request, Experiencia $experiencia): RedirectResponse
    {
        if ($experiencia->estat === 'rebutjat') {
            return back()->with('error', "No es pot canviar l'estat d'una experiència rebutjada.");
        }

        $nextEstat = $experiencia->estat === 'esborrany' ? 'publicat' : 'esborrany';

        $experiencia->update([
            'estat' => $nextEstat,
            'data_publicacio' => $nextEstat === 'publicat' ? ($experiencia->data_publicacio ?? now()) : null,
        ]);

        return back()->with('success', $nextEstat === 'publicat'
            ? 'Experiència publicada correctament.'
            : 'Experiència desada com a esborrany.');
    }

    public function getExperiencies(?string $sort = null, string $direction = 'asc', array $categories = [], ?string $search = null): LengthAwarePaginator
    {
        $direction = in_array($direction, ['asc', 'desc']) ? $direction : 'asc';

        $query = Experiencia::with(['usuari', 'categories'])
            ->where('estat', 'publicat')
            ->withCount([
                'comentaris',
                'likes' => function ($query) {
                    $query->where('valoracio', 1);
                },
            ]);

        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('titol', 'like', "%{$search}%")
                    ->orWhere('contingut', 'like', "%{$search}%")
                    ->orWhere('ubicacio_nom', 'like', "%{$search}%")
                    ->orWhereHas('usuari', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if (! empty($categories)) {
            $query->whereHas('categories', function ($q) use ($categories) {
                $q->whereIn('categorias.id', $categories);
            });
        }

        match ($sort) {
            'titol' => $query->orderBy('titol', $direction),
            'likes' => $query->orderBy('likes_count', $direction),
            'data_publicacio' => $query->orderBy('data_publicacio', $direction),
            default => $query->latest(),
        };

        return $this->applyUserReaction($query)->paginate(12)->withQueryString();
    }

    public function getExperienciesByUser()
    {
        $query = Experiencia::with(['usuari', 'categories'])
            ->where('id_usuari_creador', Auth::id())
            ->withCount([
                'comentaris',
                'likes' => function ($query) {
                    $query->where('valoracio', 1);
                },
            ])
            ->paginate(12)
            ->latest();

        return $this->applyUserReaction($query)->get();
    }
}
