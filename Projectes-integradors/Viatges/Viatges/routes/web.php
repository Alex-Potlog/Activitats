<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ComentariController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExperienciaController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Models\Categoria;
use App\Services\GooglePlacesService;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $sort = request('sort');
    $direction = request('direction', 'asc');
    $search = request('search');
    $selectedCategories = array_filter((array) request('categories', []));
    $experiencies = (new ExperienciaController(new GooglePlacesService))->getExperiencies($sort, $direction, $selectedCategories, $search);

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'experiencies' => $experiencies,
        'sort' => $sort,
        'direction' => $direction,
        'search' => $search,
        'categories' => Categoria::all(),
        'selectedCategories' => array_map('intval', $selectedCategories),
    ]);
})->name('welcome');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');
    Route::patch('/experiencies/{experiencia}/keep', [AdminController::class, 'keepReportedExperiencia'])->name('experiencies.keep');
    Route::patch('/experiencies/{experiencia}/reject', [AdminController::class, 'rejectReportedExperiencia'])->name('experiencies.reject');
    Route::delete('/users/{user}', [AdminController::class, 'destroyUser'])->name('users.destroy');
    Route::post('/categories', [AdminController::class, 'storeCategoria'])->name('categories.store');
    Route::patch('/categories/{categoria}', [AdminController::class, 'updateCategoria'])->name('categories.update');
    Route::delete('/categories/{categoria}', [AdminController::class, 'destroyCategoria'])->name('categories.destroy');
});

// ─── Experiències ─────────────────────────────────────────────────────────────
// Públiques
Route::get('/experiencies', [ExperienciaController::class, 'index'])->name('experiencies.index');

//
Route::middleware('auth')->get('/experiencies/create', function () {
    $props = app(ExperienciaController::class)->create();

    return Inertia::render('Experiencies/Create', [
        'props' => $props,
    ]);
})->name('experiencies.create');

Route::middleware('auth')->get('/experiencies/{experiencia}/edit', [ExperienciaController::class, 'edit'])->name('experiencies.edit');

Route::get('/experiencies/{experiencia}', [ExperienciaController::class, 'show'])->name('experiencies.show');

// Autenticades
Route::middleware('auth')->group(function () {
    Route::post('/experiencies', [ExperienciaController::class, 'store'])->name('experiencies.store');
    Route::patch('/experiencies/{experiencia}', [ExperienciaController::class, 'update'])->name('experiencies.update');
    Route::delete('/experiencies/{experiencia}', [ExperienciaController::class, 'destroy'])->name('experiencies.destroy');
    Route::patch('/experiencies/{experiencia}/estat', [ExperienciaController::class, 'updateEstat'])->name('experiencies.estat.update');

    // Comentaris
    Route::post('/experiencies/{experiencia}/comentaris', [ComentariController::class, 'store'])->name('comentaris.store');
    Route::get('/experiencies/{experiencia}/comentaris', [ComentariController::class, 'getComentaris'])->name('comentaris.get');
    Route::delete('/comentaris/{comentari}', [ComentariController::class, 'destroy'])->name('comentaris.destroy');

    // Likes
    Route::post('/experiencies/{experiencia}/like', [LikeController::class, 'react'])->name('likes.react');

    // Reports
    Route::post('/experiencies/{experiencia}/report', [ReportController::class, 'store'])->name('reports.store');
});

// ─── Categories (existent) ───────────────────────────────────────────────────
Route::get('/list', [CategoriaController::class, 'index'])->name('categorias.list');

// ─── Pàgines legals ──────────────────────────────────────────────────────────
Route::get('/copyright', fn() => Inertia::render('Legal/Copyright'))->name('legal.copyright');
Route::get('/license', fn() => Inertia::render('Legal/License'))->name('legal.license');
Route::get('/contact', fn() => Inertia::render('Legal/Contact'))->name('legal.Contact');

require __DIR__ . '/auth.php';
