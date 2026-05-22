<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Experiencia extends Model
{
    protected $table = 'experiencies';

    protected $fillable = [
        'id_usuari_creador',
        'titol',
        'contingut',
        'imatge',
        'latitud',
        'longitud',
        'ubicacio_nom',
        'google_place_id',
        'data_publicacio',
        'estat',
    ];

    protected $casts = [
        'user_reaction' => 'integer',
    ];

    /**
     * Usuari que ha creat l'experiència.
     */
    public function usuari(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_usuari_creador');
    }

    /**
     * Categories de l'experiència.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Categoria::class, 'categoria_experiencia', 'id_experiencia', 'id_categoria')
            ->withTimestamps();
    }

    /**
     * Comentaris de l'experiència.
     */
    public function comentaris(): HasMany
    {
        return $this->hasMany(Comentari::class, 'id_experiencia');
    }

    /**
     * Likes de l'experiencia
     */
    public function likes(): HasMany
    {
        return $this->hasMany(Like::class, 'id_experiencia');
    }

    /**
     * Reports de l'experiencia.
     */
    public function reports(): HasMany
    {
        return $this->hasMany(Report::class, 'id_experiencia');
    }
}
