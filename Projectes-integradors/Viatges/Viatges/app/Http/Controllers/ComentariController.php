<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreComentariRequest;
use App\Models\Comentari;
use App\Models\Experiencia;
use Illuminate\Support\Facades\Auth;

class ComentariController extends Controller
{
    /**
     * Afegeix un comentari a una experiència.
     */
    public function store(StoreComentariRequest $request, Experiencia $experiencia)
    {
        $experiencia->comentaris()->create([
            'id_usuari' => Auth::id(),
            'contingut' => $request->validated('contingut'),
        ]);

        return back()->with('success', 'Comentari afegit correctament.');
    }

    /**
     * Elimina un comentari (només el autor).
     */
    public function destroy(Comentari $comentari)
    {
        if ($comentari->id_usuari !== Auth::id()) {
            abort(403, 'No tens permís per eliminar aquest comentari.');
        }

        $comentari->delete();

        return back()->with('success', 'Comentari eliminat correctament.');
    }

    /**
     * Obté els comentaris d'una experiència.
     */
    public function getComentaris(Experiencia $experiencia)
    {
        $comentaris = $experiencia->comentaris()
            ->with('usuari:id,name')
            ->get();

        return response()->json(
            $comentaris->map(function ($comentari) {
                return [
                    'id_comentari' => $comentari->id,
                    'contingut' => $comentari->contingut,
                    'usuari' => $comentari->usuari->name,
                ];
            })
        );
    }
}
