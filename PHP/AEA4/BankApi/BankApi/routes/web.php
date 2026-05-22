<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::view('/categorias', 'categorias.index')->name('categorias.index');
    Route::view('/categorias/create', 'categorias.create')->name('categorias.create');
    Route::get('/categorias/{id}/edit', fn (int $id) => view('categorias.edit', ['categoriaId' => $id]))
        ->whereNumber('id')
        ->name('categorias.edit');

    Route::view('/preguntas', 'preguntas.index')->name('preguntas.index');
    Route::get('/preguntas/{id}', fn (int $id) => view('preguntas.show', ['preguntaId' => $id]))
        ->whereNumber('id')
        ->name('preguntas.show');

    Route::view('/partidas', 'partidas.index')->name('partidas.index');
    Route::get('/partidas/{id}', fn (int $id) => view('partidas.show', ['partidaId' => $id]))
        ->whereNumber('id')
        ->name('partidas.show');
});

require __DIR__.'/auth.php';
