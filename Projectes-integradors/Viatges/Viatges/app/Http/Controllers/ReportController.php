<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Experiencia;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    /**
     * Crear un report
     */
    public function store(Experiencia $experiencia)
    {
        $userId = Auth::id();

        if ($experiencia->id_usuari_creador === $userId) {
            abort(403, 'No pots reportar una experiència pròpia.');
        }

        // Comprovem si ja existeix
        $exists = Report::where('id_usuari', $userId)
            ->where('id_experiencia', $experiencia->id)
            ->exists();

        if (!$exists) {
            Report::create([
                'id_usuari' => $userId,
                'id_experiencia' => $experiencia->id,
            ]);
        }

        return back()->with([
            'reported' => true,
            'reports_count' => $experiencia->reports()->count(),
        ]);
    }
}
