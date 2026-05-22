<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Resposta extends Model
{
    protected $fillable = [
        'text',
        'es_correcta',
        'pregunta_id',
    ];

    protected $casts = [
        'es_correcta' => 'boolean',
    ];

    /**
     * Una resposta pertany a una pregunta.
     */
    public function pregunta(): BelongsTo
    {
        return $this->belongsTo(Pregunta::class);
    }
}
