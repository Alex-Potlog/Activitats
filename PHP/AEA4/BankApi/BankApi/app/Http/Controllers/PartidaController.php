<?php

namespace App\Http\Controllers;

use App\Models\Partida;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PartidaController extends Controller
{
    /**
     * Display a listing of the partides for the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $partides = Partida::with('preguntes')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($partides, 200);
    }

    /**
     * Store a newly created partida.
     */
    public function store(Request $request): JsonResponse
    {
        $validat = $request->validate([
            'valoracio' => 'nullable|integer|min:0',
            'preguntes' => 'sometimes|array',
            'preguntes.*.id' => 'required_with:preguntes|exists:preguntas,id',
        ]);

        $partida = Partida::create([
            'valoracio' => $validat['valoracio'] ?? null,
            'user_id' => $request->user()->id,
        ]);

        if (! empty($validat['preguntes'])) {
            $partida->preguntes()->sync(collect($validat['preguntes'])->pluck('id')->all());
        }

        return response()->json([
            'message' => 'Partida creada correctament',
            'data' => $partida->load('preguntes'),
        ], 201);
    }

    /**
     * Display the specified partida.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $partida = Partida::with(['preguntes.respostes'])
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json($partida, 200);
    }

    /**
     * Update the specified partida.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $partida = Partida::where('user_id', $request->user()->id)->findOrFail($id);

        $validat = $request->validate([
            'valoracio' => 'nullable|integer|min:0',
            'preguntes' => 'sometimes|array',
            'preguntes.*.id' => 'required_with:preguntes|exists:preguntas,id',
        ]);

        if (array_key_exists('valoracio', $validat)) {
            $partida->update(['valoracio' => $validat['valoracio']]);
        }

        if (array_key_exists('preguntes', $validat)) {
            $partida->preguntes()->sync(collect($validat['preguntes'])->pluck('id')->all());
        }

        return response()->json([
            'message' => 'Partida actualitzada correctament',
            'data' => $partida->load('preguntes'),
        ], 200);
    }

    /**
     * Remove the specified partida.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $partida = Partida::where('user_id', $request->user()->id)->findOrFail($id);
        $partida->delete();

        return response()->json([
            'message' => 'Partida eliminada correctament',
        ], 200);
    }
}
