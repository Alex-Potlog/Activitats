<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoriaController extends Controller
{
    public function index(Request $request): Response
    {
        $categorias = Categoria::query()
            ->withCount('experiencies')
            ->orderBy('nom')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Categories/Index', [
            'categories' => $categorias,
            'canManageCategories' => (bool) $request->user()?->is_admin,
        ]);
    }

    public function create()
    {
        return view('categorias.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255|unique:categorias,nom',
        ]);

        Categoria::create([
            'nom' => $request->nom,
        ]);

        return redirect()->route('categorias.index')
            ->with('success', 'Categoria creada correctament');
    }

    public function show(Categoria $categoria)
    {
        return view('categorias.show', compact('categoria'));
    }

    public function edit(Categoria $categoria)
    {
        return view('categorias.edit', compact('categoria'));
    }

    public function update(Request $request, Categoria $categoria)
    {
        $request->validate([
            'nom' => 'required|string|max:255|unique:categorias,nom,' . $categoria->id,
        ]);

        $categoria->update([
            'nom' => $request->nom,
        ]);

        return redirect()->route('categorias.index')
            ->with('success', 'Categoria actualitzada');
    }

    public function destroy(Categoria $categoria)
    {
        $categoria->delete();

        return redirect()->route('categorias.index')
            ->with('success', 'Categoria eliminada');
    }
}
