<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Like extends Model
{
    protected $table = 'likes';

    protected $fillable = [
        'id',
        'id_usuari',
        'id_experiencia',
        'valoracio',
    ];

    /**
     * Usuari que ha valorat la experiencia.
     */
    public function usuari(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_usuari');
    }

    /**
     * Experiencia valorada.
     */
    public function experiencia(): BelongsTo
    {
        return $this->belongsTo(Experiencia::class, 'id_experiencia');
    }
}
