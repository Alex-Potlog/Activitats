<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partida extends Model
{
    protected $fillable = [
        'valoracio',
        'user_id',    // Si la partida pertany a un usuari
    ];

    protected $casts = [
        'valoracio' => 'integer',
    ];

    /**
     * Una partida pertany a un usuari autènticat (Punt 5).
     */
    public function usuari()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relació amb les preguntes associades a aquesta partida.
     */
    public function preguntes()
    {
        return $this->belongsToMany(Pregunta::class)->withTimestamps();
    }
}
