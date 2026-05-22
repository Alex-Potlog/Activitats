<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pregunta extends Model
{
    protected $fillable = [
        'enunciat',
        'dificultat',
        'categoria_id',
    ];

    /**
     * Una pregunta pertany a una categoria.
     */
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    /**
     * Una pregunta té tres respostes (només una correcta).
     */
    public function respostes()
    {
        return $this->hasMany(Resposta::class);
    }

    /**
     * Una pregunta pot aparèixer en moltes partides (si es fa servir taula pivot).
     */
    public function partides()
    {
        return $this->belongsToMany(Partida::class);
    }
}
