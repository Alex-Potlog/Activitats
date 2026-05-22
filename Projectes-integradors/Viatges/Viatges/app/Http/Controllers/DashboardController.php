<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Comentari;
use App\Models\Like;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Ensenya el dashboard de l'usuari autentificat
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $publishedExperienciesQuery = $user->experiencies()
            ->where('estat', 'publicat');

        $totalExperiencies = (clone $publishedExperienciesQuery)->count();

        $totalLikes = Like::query()
            ->where('valoracio', 1)
            ->whereHas('experiencia', function ($query) use ($user): void {
                $query->where('id_usuari_creador', $user->id)
                    ->where('estat', 'publicat');
            })
            ->count();

        $totalComentaris = Comentari::query()
            ->whereHas('experiencia', function ($query) use ($user): void {
                $query->where('id_usuari_creador', $user->id)
                    ->where('estat', 'publicat');
            })
            ->count();

        $recentExperiencies = (clone $publishedExperienciesQuery)
            ->with('categories:id,nom')
            ->withCount([
                'likes as likes_positius_count' => function ($query): void {
                    $query->where('valoracio', 1);
                },
                'comentaris',
            ])
            ->latest('data_publicacio')
            ->latest('created_at')
            ->limit(5)
            ->get(['id', 'titol', 'ubicacio_nom', 'data_publicacio', 'created_at']);

        $ownExperiencies = $user->experiencies()
            ->with(['usuari:id,name', 'categories:id,nom'])
            ->withCount(['likes', 'comentaris', 'reports'])
            ->latest('created_at')
            ->limit(6)
            ->get();

        $topExperiencia = (clone $publishedExperienciesQuery)
            ->withCount([
                'likes as likes_positius_count' => function ($query): void {
                    $query->where('valoracio', 1);
                },
                'comentaris',
            ])
            ->orderByDesc('likes_positius_count')
            ->orderByDesc('comentaris_count')
            ->first(['id', 'titol', 'ubicacio_nom', 'data_publicacio']);

        $topCategories = Categoria::query()
            ->select(['categorias.id', 'categorias.nom'])
            ->whereHas('experiencies', function ($query) use ($user): void {
                $query->where('id_usuari_creador', $user->id)
                    ->where('estat', 'publicat');
            })
            ->withCount([
                'experiencies as total_experiencies' => function ($query) use ($user): void {
                    $query->where('id_usuari_creador', $user->id)
                        ->where('estat', 'publicat');
                },
            ])
            ->orderByDesc('total_experiencies')
            ->limit(5)
            ->get();

        $currentMonthStart = now()->startOfMonth();
        $currentMonthEnd = now()->endOfMonth();
        $previousMonthStart = now()->subMonthNoOverflow()->startOfMonth();
        $previousMonthEnd = now()->subMonthNoOverflow()->endOfMonth();

        $currentMonthExperiencies = (clone $publishedExperienciesQuery)
            ->whereBetween('data_publicacio', [$currentMonthStart, $currentMonthEnd])
            ->count();

        $previousMonthExperiencies = (clone $publishedExperienciesQuery)
            ->whereBetween('data_publicacio', [$previousMonthStart, $previousMonthEnd])
            ->count();

        if ($previousMonthExperiencies === 0) {
            $monthlyGrowth = $currentMonthExperiencies > 0 ? 100.0 : 0.0;
        } else {
            $monthlyGrowth = round((($currentMonthExperiencies - $previousMonthExperiencies) / $previousMonthExperiencies) * 100, 1);
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalExperiencies' => $totalExperiencies,
                'totalLikes' => $totalLikes,
                'totalComentaris' => $totalComentaris,
                'currentMonthExperiencies' => $currentMonthExperiencies,
                'monthlyGrowth' => $monthlyGrowth,
            ],
            'ownExperiencies' => $ownExperiencies,
            'recentExperiencies' => $recentExperiencies,
            'topExperiencia' => $topExperiencia,
            'topCategories' => $topCategories,
        ]);
    }
}
