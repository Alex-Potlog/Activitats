<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $table = 'reports';

    protected $fillable = [
        'id',
        'id_usuari',
        'id_experiencia',
    ];

    /**
     * Usuari que ha reportat l'experiencia.
     */
    public function usuari()
    {
        return $this->belongsTo(User::class, 'id_usuari');
    }

    /**
     * Experiencia a la qual pertany el report.
     */
    public function experiencia()
    {
        return $this->belongsTo(Experiencia::class, 'id_experiencia');
    }
}
