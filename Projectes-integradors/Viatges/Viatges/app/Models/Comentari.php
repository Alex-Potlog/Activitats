<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentari extends Model
{
    protected $table = 'comentaris';

    protected $fillable = [
        'id',
        'id_usuari',
        'id_experiencia',
        'contingut',
    ];

    /**
     * Usuari que ha escrit el comentari.
     */
    public function usuari()
    {
        return $this->belongsTo(User::class, 'id_usuari');
    }

    /**
     * Experiència a la qual pertany el comentari.
     */
    public function experiencia()
    {
        return $this->belongsTo(Experiencia::class, 'id_experiencia');
    }
}
