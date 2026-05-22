<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $fillable = [
        'nom',
        'descripcio',
    ];


    /**
     * Una categoria té moltes preguntes.
     */
    public function preguntes()
    {
        return $this->hasMany(Pregunta::class);
    }
}
