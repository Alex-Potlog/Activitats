<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['nom' => 'Història',        'descripcio' => 'Preguntes sobre fets, personatges i èpoques històriques.'],
            ['nom' => 'Geografia',       'descripcio' => 'Capitals, països, rius i continents del món.'],
            ['nom' => 'Ciència',         'descripcio' => 'Física, química, biologia i descobriments científics.'],
            ['nom' => 'Esports',         'descripcio' => 'Futbol, bàsquet, tennis i altres disciplines.'],
            ['nom' => 'Cultura general', 'descripcio' => 'Preguntes variades de coneixement general.'],
            ['nom' => 'Cinema',          'descripcio' => 'Pel·lícules, directors i actors clàssics i moderns.'],
            ['nom' => 'Música',          'descripcio' => 'Cantants, grups, instruments i estils musicals.'],
            ['nom' => 'Tecnologia',      'descripcio' => 'Informàtica, programació i mons digitals.'],
        ];

        foreach ($categories as $data) {
            Categoria::updateOrCreate(['nom' => $data['nom']], $data);
        }
    }
}
