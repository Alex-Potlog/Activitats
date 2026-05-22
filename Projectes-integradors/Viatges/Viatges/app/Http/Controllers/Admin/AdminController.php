<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoriaRequest;
use App\Http\Requests\Admin\UpdateCategoriaRequest;
use App\Models\Categoria;
use App\Models\Experiencia;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Mostra el panell d'administració.
     */
    public function index(): Response
    {
        $reportedExperiencies = Experiencia::query()
            ->whereHas('reports')
            ->with([
                'usuari:id,name,email',
                'categories:id,nom',
                'reports' => function ($query): void {
                    $query->with('usuari:id,name,email')
                        ->latest();
                },
            ])
            ->withCount('reports')
            ->orderByDesc('reports_count')
            ->orderByDesc('created_at')
            ->paginate(10, [
                'id',
                'id_usuari_creador',
                'titol',
                'ubicacio_nom',
                'estat',
                'data_publicacio',
                'created_at',
            ], 'reported_page')
            ->withQueryString();

        $users = User::query()
            ->select(['id', 'name', 'email', 'is_admin', 'created_at'])
            ->latest()
            ->paginate(15, ['id', 'name', 'email', 'is_admin', 'created_at'], 'users_page')
            ->withQueryString();

        return Inertia::render('Admin/Index', [
            'reportedExperiencies' => $reportedExperiencies,
            'users' => $users,
        ]);
    }

    /**
     * Crea una categoria.
     */
    public function storeCategoria(StoreCategoriaRequest $request): RedirectResponse
    {
        Categoria::query()->create($request->validated());

        return back()->with('success', 'Categoria creada correctament.');
    }

    /**
     * Actualitza una categoria.
     */
    public function updateCategoria(UpdateCategoriaRequest $request, Categoria $categoria): RedirectResponse
    {
        $categoria->update($request->validated());

        return back()->with('success', 'Categoria actualitzada correctament.');
    }

    /**
     * Elimina una categoria.
     */
    public function destroyCategoria(Categoria $categoria): RedirectResponse
    {
        if ($categoria->experiencies()->exists()) {
            return back()->with('error', 'No pots eliminar una categoria amb experiències associades.');
        }

        $categoria->delete();

        return back()->with('success', 'Categoria eliminada correctament.');
    }

    /**
     * Manté una experiència reportada i elimina els reports pendents.
     */
    public function keepReportedExperiencia(Experiencia $experiencia): RedirectResponse
    {
        if (! $experiencia->reports()->exists()) {
            return back()->with('error', 'Aquesta experiència no té reports pendents.');
        }

        $experiencia->reports()->delete();

        return back()->with('success', 'Reports eliminats i experiència mantinguda.');
    }

    /**
     * Rebutja una experiència reportada.
     */
    public function rejectReportedExperiencia(Experiencia $experiencia): RedirectResponse
    {
        if (! $experiencia->reports()->exists()) {
            return back()->with('error', 'Aquesta experiència no té reports pendents.');
        }

        $experiencia->update([
            'estat' => 'rebutjat',
        ]);

        $experiencia->reports()->delete();

        return back()->with('success', 'Experiència rebutjada correctament.');
    }

    /**
     * Dona de baixa un usuari.
     */
    public function destroyUser(Request $request, User $user): RedirectResponse
    {
        if ($request->user()->is($user)) {
            return back()->with('error', 'No pots donar-te de baixa a tu mateix des d\'aquí.');
        }

        if ($user->is_admin) {
            return back()->with('error', 'No es pot donar de baixa un altre administrador.');
        }

        $user->delete();

        return back()->with('success', 'Usuari donat de baixa correctament.');
    }
}
