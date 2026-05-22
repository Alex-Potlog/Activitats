<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $categorias = Categoria::all();
            return response()->json($categorias, 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error 503: Servei no disponible'], 503);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validat = $request->validate([
                "nom" => "required|string|max:30|unique:categorias,nom",
                "descripcio" => "required|string"
            ]);

            $categoria = Categoria::create($validat);

            return response()->json([
                'message' => 'Categoria creada correctament',
                'data' => $categoria
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Dades de validació invàlides', 'details' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error 503: Servei no disponible'], 503);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $categoria = Categoria::findOrFail($id);
            return response()->json($categoria, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Categoria no trobada (Error 404)'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error 503: Servei no disponible'], 503);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $categoria = Categoria::findOrFail($id);

            $validat = $request->validate([
                "nom" => "required|string|max:30|unique:categorias,nom," . $id,
                "descripcio" => "required|string"
            ]);

            $categoria->update($validat);

            return response()->json([
                'message' => 'Categoria actualitzada correctament',
                'data' => $categoria
            ], 200);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Dades de validació invàlides', 'details' => $e->errors()], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Categoria no trobada (Error 404)'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error 503: Servei no disponible'], 503);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $categoria = Categoria::findOrFail($id);
            $categoria->delete();

            return response()->json([
                'message' => 'Categoria eliminada correctament'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Categoria no trobada (Error 404)'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error 503: Servei no disponible'], 503);
        }
    }
}
