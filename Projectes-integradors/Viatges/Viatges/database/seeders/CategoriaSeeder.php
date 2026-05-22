<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $categorias = [
            [
                'nom' => 'Senderisme',
                'descripcio' => 'Rutes a peu per muntanyes, boscos i camins naturals.',
            ],
            [
                'nom' => 'Gastronomia',
                'descripcio' => 'Experiències culinàries, restaurants i productes locals.',
            ],
            [
                'nom' => 'Cultura i patrimoni',
                'descripcio' => 'Visites a monuments, museus i llocs d\'interès històric.',
            ],
            [
                'nom' => 'Esports d\'aventura',
                'descripcio' => 'Activitats com escalada, kayak, parapent i ciclisme de muntanya.',
            ],
            [
                'nom' => 'Relax i natura',
                'descripcio' => 'Parcs naturals, platges i espais per desconnectar.',
            ],
            [
                'nom' => 'Enoturisme',
                'descripcio' => 'Cellers, tastos de vi i rutes entre vinyes.',
            ],
            [
                'nom' => 'Turisme familiar',
                'descripcio' => 'Plans adaptats per gaudir amb infants de totes les edats.',
            ],
            [
                'nom' => 'Fotografia',
                'descripcio' => 'Miradors i localitzacions ideals per capturar paisatges únics.',
            ],
            [
                'nom' => 'Festes locals',
                'descripcio' => 'Firetes, tradicions i celebracions populars del territori.',
            ],
            [
                'nom' => 'Història viva',
                'descripcio' => 'Jaciments, rutes medievals i espais amb valor històric.',
            ],
            [
                'nom' => 'Escapades de cap de setmana',
                'descripcio' => 'Propostes curtes per desconnectar sense fer un viatge llarg.',
            ],
            [
                'nom' => 'Miradors i panoràmiques',
                'descripcio' => 'Punts elevats amb vistes destacades de costa, vall i muntanya.',
            ],
        ];

        foreach ($categorias as $categoriaData) {
            Categoria::updateOrCreate(
                ['nom' => $categoriaData['nom']],
                $categoriaData
            );
        }
    }
}
