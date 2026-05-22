<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Categoria extends Model
{
    protected $fillable = [
        'nom',
        'descripcio',
    ];

    public function experiencies(): BelongsToMany
    {
        return $this->belongsToMany(Experiencia::class, 'categoria_experiencia', 'id_categoria', 'id_experiencia');
    }
}
