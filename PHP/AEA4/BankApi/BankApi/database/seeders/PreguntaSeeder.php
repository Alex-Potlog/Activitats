<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Pregunta;
use App\Models\Resposta;
use Illuminate\Database\Seeder;

class PreguntaSeeder extends Seeder
{
    public function run(): void
    {
        $preguntes = [
            // ============ HISTÒRIA ============
            [
                'categoria' => 'Història',
                'enunciat' => 'En quin any va caure el Mur de Berlín?',
                'dificultat' => 'Fàcil',
                'respostes' => [
                    ['text' => '1989', 'es_correcta' => true],
                    ['text' => '1991', 'es_correcta' => false],
                    ['text' => '1985', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Història',
                'enunciat' => 'Qui va ser el primer president dels Estats Units?',
                'dificultat' => 'Fàcil',
                'respostes' => [
                    ['text' => 'George Washington', 'es_correcta' => true],
                    ['text' => 'Thomas Jefferson', 'es_correcta' => false],
                    ['text' => 'Abraham Lincoln', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Història',
                'enunciat' => 'En quin any va començar la Primera Guerra Mundial?',
                'dificultat' => 'Mitjana',
                'respostes' => [
                    ['text' => '1914', 'es_correcta' => true],
                    ['text' => '1918', 'es_correcta' => false],
                    ['text' => '1939', 'es_correcta' => false],
                ],
            ],

            // ============ GEOGRAFIA ============
            [
                'categoria' => 'Geografia',
                'enunciat' => 'Quina és la capital d\'Austràlia?',
                'dificultat' => 'Mitjana',
                'respostes' => [
                    ['text' => 'Canberra', 'es_correcta' => true],
                    ['text' => 'Sydney', 'es_correcta' => false],
                    ['text' => 'Melbourne', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Geografia',
                'enunciat' => 'Quin és el riu més llarg del món?',
                'dificultat' => 'Mitjana',
                'respostes' => [
                    ['text' => 'Amazones', 'es_correcta' => true],
                    ['text' => 'Nil', 'es_correcta' => false],
                    ['text' => 'Yangtsé', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Geografia',
                'enunciat' => 'Quants continents hi ha al món?',
                'dificultat' => 'Fàcil',
                'respostes' => [
                    ['text' => '7', 'es_correcta' => true],
                    ['text' => '5', 'es_correcta' => false],
                    ['text' => '6', 'es_correcta' => false],
                ],
            ],

            // ============ CIÈNCIA ============
            [
                'categoria' => 'Ciència',
                'enunciat' => 'Quin element químic té el símbol "Au"?',
                'dificultat' => 'Fàcil',
                'respostes' => [
                    ['text' => 'Or', 'es_correcta' => true],
                    ['text' => 'Plata', 'es_correcta' => false],
                    ['text' => 'Alumini', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Ciència',
                'enunciat' => 'Quina és la velocitat de la llum en el buit (aprox.)?',
                'dificultat' => 'Difícil',
                'respostes' => [
                    ['text' => '300.000 km/s', 'es_correcta' => true],
                    ['text' => '150.000 km/s', 'es_correcta' => false],
                    ['text' => '1.000.000 km/s', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Ciència',
                'enunciat' => 'Quants ossos té el cos humà adult?',
                'dificultat' => 'Mitjana',
                'respostes' => [
                    ['text' => '206', 'es_correcta' => true],
                    ['text' => '186', 'es_correcta' => false],
                    ['text' => '212', 'es_correcta' => false],
                ],
            ],

            // ============ ESPORTS ============
            [
                'categoria' => 'Esports',
                'enunciat' => 'Cada quants anys se celebren els Jocs Olímpics?',
                'dificultat' => 'Fàcil',
                'respostes' => [
                    ['text' => '4 anys', 'es_correcta' => true],
                    ['text' => '2 anys', 'es_correcta' => false],
                    ['text' => '5 anys', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Esports',
                'enunciat' => 'Quants jugadors hi ha en un equip de futbol al camp?',
                'dificultat' => 'Fàcil',
                'respostes' => [
                    ['text' => '11', 'es_correcta' => true],
                    ['text' => '9', 'es_correcta' => false],
                    ['text' => '10', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Esports',
                'enunciat' => 'En quin esport s\'utilitza una "raqueta" i una "pilota groga"?',
                'dificultat' => 'Fàcil',
                'respostes' => [
                    ['text' => 'Tennis', 'es_correcta' => true],
                    ['text' => 'Bàdminton', 'es_correcta' => false],
                    ['text' => 'Pàdel', 'es_correcta' => false],
                ],
            ],

            // ============ CULTURA GENERAL ============
            [
                'categoria' => 'Cultura general',
                'enunciat' => 'Quants costats té un hexàgon?',
                'dificultat' => 'Fàcil',
                'respostes' => [
                    ['text' => '6', 'es_correcta' => true],
                    ['text' => '5', 'es_correcta' => false],
                    ['text' => '7', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Cultura general',
                'enunciat' => 'En quin idioma es va escriure originàriament la Bíblia (Antic Testament)?',
                'dificultat' => 'Difícil',
                'respostes' => [
                    ['text' => 'Hebreu', 'es_correcta' => true],
                    ['text' => 'Llatí', 'es_correcta' => false],
                    ['text' => 'Grec', 'es_correcta' => false],
                ],
            ],

            // ============ CINEMA ============
            [
                'categoria' => 'Cinema',
                'enunciat' => 'Qui va dirigir la pel·lícula "Pulp Fiction"?',
                'dificultat' => 'Mitjana',
                'respostes' => [
                    ['text' => 'Quentin Tarantino', 'es_correcta' => true],
                    ['text' => 'Martin Scorsese', 'es_correcta' => false],
                    ['text' => 'Steven Spielberg', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Cinema',
                'enunciat' => 'Quina pel·lícula va guanyar l\'Òscar a millor pel·lícula el 2020?',
                'dificultat' => 'Difícil',
                'respostes' => [
                    ['text' => 'Parásits', 'es_correcta' => true],
                    ['text' => '1917', 'es_correcta' => false],
                    ['text' => 'Joker', 'es_correcta' => false],
                ],
            ],

            // ============ MÚSICA ============
            [
                'categoria' => 'Música',
                'enunciat' => 'Quants membres tenia el grup The Beatles?',
                'dificultat' => 'Fàcil',
                'respostes' => [
                    ['text' => '4', 'es_correcta' => true],
                    ['text' => '3', 'es_correcta' => false],
                    ['text' => '5', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Música',
                'enunciat' => 'Quin instrument tocava Jimi Hendrix principalment?',
                'dificultat' => 'Mitjana',
                'respostes' => [
                    ['text' => 'Guitarra elèctrica', 'es_correcta' => true],
                    ['text' => 'Bateria', 'es_correcta' => false],
                    ['text' => 'Baix', 'es_correcta' => false],
                ],
            ],

            // ============ TECNOLOGIA ============
            [
                'categoria' => 'Tecnologia',
                'enunciat' => 'Quina empresa va crear el sistema operatiu Android?',
                'dificultat' => 'Mitjana',
                'respostes' => [
                    ['text' => 'Google', 'es_correcta' => true],
                    ['text' => 'Apple', 'es_correcta' => false],
                    ['text' => 'Microsoft', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Tecnologia',
                'enunciat' => 'Què significa "HTTP"?',
                'dificultat' => 'Difícil',
                'respostes' => [
                    ['text' => 'HyperText Transfer Protocol', 'es_correcta' => true],
                    ['text' => 'High Transfer Text Protocol', 'es_correcta' => false],
                    ['text' => 'HyperTool Transfer Page', 'es_correcta' => false],
                ],
            ],
            [
                'categoria' => 'Tecnologia',
                'enunciat' => 'Qui és el cofundador de Microsoft juntament amb Paul Allen?',
                'dificultat' => 'Fàcil',
                'respostes' => [
                    ['text' => 'Bill Gates', 'es_correcta' => true],
                    ['text' => 'Steve Jobs', 'es_correcta' => false],
                    ['text' => 'Mark Zuckerberg', 'es_correcta' => false],
                ],
            ],
        ];

        $categoriesByName = Categoria::all()->keyBy('nom');

        foreach ($preguntes as $data) {
            $categoria = $categoriesByName->get($data['categoria']);

            $pregunta = Pregunta::create([
                'enunciat' => $data['enunciat'],
                'dificultat' => $data['dificultat'],
                'categoria_id' => $categoria?->id,
            ]);

            foreach ($data['respostes'] as $resposta) {
                Resposta::create([
                    'text' => $resposta['text'],
                    'es_correcta' => $resposta['es_correcta'],
                    'pregunta_id' => $pregunta->id,
                ]);
            }
        }
    }
}
