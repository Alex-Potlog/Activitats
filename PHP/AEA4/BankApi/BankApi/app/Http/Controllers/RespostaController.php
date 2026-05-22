<?php

namespace App\Http\Controllers;

use App\Models\Pregunta;
use App\Models\Resposta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class RespostaController extends Controller
{
    /**
     * Display a listing of the respostes for a given pregunta.
     */
    public function index(string $pregunta): JsonResponse
    {
        $preguntaModel = Pregunta::findOrFail($pregunta);

        return response()->json($preguntaModel->respostes, 200);
    }

    /**
     * Store a newly created resposta for a given pregunta.
     */
    public function store(Request $request, string $pregunta): JsonResponse
    {
        $preguntaModel = Pregunta::findOrFail($pregunta);

        $validat = $request->validate([
            'text' => 'required|string|max:255',
            'es_correcta' => 'required|boolean',
        ]);

        if ($preguntaModel->respostes()->count() >= 3) {
            throw ValidationException::withMessages([
                'pregunta' => 'Una pregunta no pot tenir més de tres respostes.',
            ]);
        }

        $resposta = DB::transaction(function () use ($preguntaModel, $validat) {
            if ($validat['es_correcta']) {
                $preguntaModel->respostes()->update(['es_correcta' => false]);
            }

            return $preguntaModel->respostes()->create($validat);
        });

        return response()->json([
            'message' => 'Resposta creada correctament',
            'data' => $resposta,
        ], 201);
    }

    /**
     * Display the specified resposta.
     */
    public function show(string $resposta): JsonResponse
    {
        $resposta = Resposta::findOrFail($resposta);

        return response()->json($resposta, 200);
    }

    /**
     * Update the specified resposta.
     */
    public function update(Request $request, string $resposta): JsonResponse
    {
        $resposta = Resposta::findOrFail($resposta);

        $validat = $request->validate([
            'text' => 'sometimes|required|string|max:255',
            'es_correcta' => 'sometimes|required|boolean',
        ]);

        DB::transaction(function () use ($resposta, $validat) {
            if (! empty($validat['es_correcta'])) {
                Resposta::where('pregunta_id', $resposta->pregunta_id)
                    ->where('id', '!=', $resposta->id)
                    ->update(['es_correcta' => false]);
            }

            $resposta->update($validat);
        });

        return response()->json([
            'message' => 'Resposta actualitzada correctament',
            'data' => $resposta->fresh(),
        ], 200);
    }

    /**
     * Remove the specified resposta.
     */
    public function destroy(string $resposta): JsonResponse
    {
        $resposta = Resposta::findOrFail($resposta);
        $resposta->delete();

        return response()->json([
            'message' => 'Resposta eliminada correctament',
        ], 200);
    }
}
