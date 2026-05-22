<?php

namespace App\Http\Controllers;

use App\Models\Pregunta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PreguntaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $preguntes = Pregunta::with('categoria')->get();

        return response()->json($preguntes, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validat = $request->validate([
            'enunciat' => 'required|string|max:255',
            'dificultat' => 'required|string|max:30',
            'categoria_id' => 'nullable|exists:categorias,id',
        ]);

        $pregunta = Pregunta::create($validat);

        return response()->json([
            'message' => 'Pregunta creada correctament',
            'data' => $pregunta,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $pregunta = Pregunta::with(['categoria', 'respostes'])->findOrFail($id);

        return response()->json($pregunta, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $pregunta = Pregunta::findOrFail($id);

        $validat = $request->validate([
            'enunciat' => 'sometimes|required|string|max:255',
            'dificultat' => 'sometimes|required|string|max:30',
            'categoria_id' => 'nullable|exists:categorias,id',
        ]);

        $pregunta->update($validat);

        return response()->json([
            'message' => 'Pregunta actualitzada correctament',
            'data' => $pregunta,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $pregunta = Pregunta::findOrFail($id);
        $pregunta->delete();

        return response()->json([
            'message' => 'Pregunta eliminada correctament',
        ], 200);
    }
}
