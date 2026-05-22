<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PartidaController;
use App\Http\Controllers\PreguntaController;
use App\Http\Controllers\RespostaController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->name('api.')->group(function () {
    // Dios no sabia que ho podiem fer amb una linea que bendicion, pensava que només el resource es podia fer servir
    Route::apiResource('categorias', CategoryController::class);
    Route::apiResource('preguntas', PreguntaController::class);
    Route::apiResource('preguntas.respostas', RespostaController::class)->shallow();
    Route::apiResource('partidas', PartidaController::class);
});
