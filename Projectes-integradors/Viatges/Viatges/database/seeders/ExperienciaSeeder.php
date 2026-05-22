<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Experiencia;
use Illuminate\Database\Seeder;

class ExperienciaSeeder extends Seeder
{
    public function run(): void
    {
        $defaultImage = 'https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg';

        // Coordenades reals de llocs emblemàtics de Catalunya i Espanya
        $experiencies = [
            [
                'id_usuari_creador' => 1,
                'id_categories' => ['Senderisme'],
                'titol' => 'Ascens al Pedraforca',
                'contingut' => 'Una de les rutes més espectaculars del Berguedà. El perfil biforcat del Pedraforca és inconfusible des de qualsevol punt de la comarca. La pujada per la canal del Tossals és exigent però el panorama des del cim ho paga tot.',
                'imatge' => $defaultImage,
                'latitud' => 42.2395800,
                'longitud' => 1.7024300,
                'ubicacio_nom' => 'Pedraforca, Berguedà',
                'estat' => 'publicat',
                'data_publicacio' => now()->subDays(10),
            ],
            [
                'id_usuari_creador' => 2,
                'id_categories' => ['Gastronomia', 'Cultura i patrimoni'],
                'titol' => 'Mercat de la Boqueria, Barcelona',
                'contingut' => 'El mercat de Sant Josep de la Boqueria és un dels mercats coberts més antics i emblemàtics d\'Europa. Fruites exòtiques, peixos frescos, embotits artesanals i parades de sucs de colors vibrants el converteixen en una experiència sensorial única.',
                'imatge' => $defaultImage,
                'latitud' => 41.3817700,
                'longitud' => 2.1721200,
                'ubicacio_nom' => 'La Boqueria, Barcelona',
                'estat' => 'publicat',
                'data_publicacio' => now()->subDays(5),
            ],
            [
                'id_usuari_creador' => 3,
                'id_categories' => ['Cultura i patrimoni'],
                'titol' => 'Visita al Monestir de Poblet',
                'contingut' => 'Declarat Patrimoni de la Humanitat per la UNESCO, el Monestir de Poblet és el conjunt monàstic medieval millor conservat del món. La seva arquitectura cistercenca i el panteó dels reis de la Corona d\'Aragó el fan imprescindible.',
                'imatge' => $defaultImage,
                'latitud' => 41.3820300,
                'longitud' => 1.0738700,
                'ubicacio_nom' => 'Monestir de Poblet, Conca de Barberà',
                'estat' => 'publicat',
                'data_publicacio' => now()->subDays(15),
            ],
            [
                'id_usuari_creador' => 1,
                'id_categories' => ['Esports d\'aventura'],
                'titol' => 'Kayak pel Delta de l\'Ebre',
                'contingut' => 'Recórrer els canals del Delta de l\'Ebre en kayak és una experiència inoblidable. Ànecs, flamencs i agrons reials acompanyen el trajecte entre arrossars i llacunes. Ideal per a tots els nivells i perfecte al sortir el sol.',
                'imatge' => $defaultImage,
                'latitud' => 40.7235600,
                'longitud' => 0.8699100,
                'ubicacio_nom' => 'Delta de l\'Ebre, Terres de l\'Ebre',
                'estat' => 'publicat',
                'data_publicacio' => now()->subDays(3),
            ],
            [
                'id_usuari_creador' => 4,
                'id_categories' => ['Relax i natura'],
                'titol' => 'Cap de Creus al capvespre',
                'contingut' => 'El Cap de Creus és el punt més oriental de la Península Ibèrica. Veure com el sol es pon darrere les Illes Medes des dels seus penya-segats és un moment màgic que no s\'oblida. El parc natural ofereix paisatges lunars de gran bellesa.',
                'imatge' => $defaultImage,
                'latitud' => 42.3193900,
                'longitud' => 3.3193900,
                'ubicacio_nom' => 'Cap de Creus, Alt Empordà',
                'estat' => 'publicat',
                'data_publicacio' => now()->subDays(8),
            ],
            [
                'id_usuari_creador' => 5,
                'id_categories' => [], // Sense categoria
                'titol' => 'Fonts del Llobregat',
                'contingut' => 'Un racó poc conegut al Berguedà on neix el riu Llobregat. Accessible en cotxe fins a prop del naixement, és ideal per a una excursió familiar tranquil·la amb els peus a l\'aigua.',
                'imatge' => $defaultImage,
                'latitud' => 42.2680000,
                'longitud' => 2.0041000,
                'ubicacio_nom' => 'Fonts del Llobregat, Berguedà',
                'estat' => 'esborrany',
                'data_publicacio' => null,
            ],
        ];

        $categoryIdByName = Categoria::query()->pluck('id', 'nom')->all();

        $destinacions = [
            ['nom' => 'Vall de Núria, Ripollès', 'lat' => 42.3983000, 'lng' => 2.1537000, 'place_id' => 'ChIJbX6p7VhQpxIRg9x_yY0jw7Q'],
            ['nom' => 'Montserrat, Bages', 'lat' => 41.5956000, 'lng' => 1.8372000, 'place_id' => 'ChIJu0QxjQfppBIR1BzjZxv9R6Y'],
            ['nom' => 'Aigüestortes, Alta Ribagorça', 'lat' => 42.5725000, 'lng' => 0.9967000, 'place_id' => 'ChIJ4Qe6t2IUpRIRF2A40mR5cLk'],
            ['nom' => 'Tossa de Mar, Selva', 'lat' => 41.7200000, 'lng' => 2.9323000, 'place_id' => 'ChIJW2iMIP6PpBIRYjvYdM5m0C0'],
            ['nom' => 'Besalú, Garrotxa', 'lat' => 42.1993000, 'lng' => 2.6997000, 'place_id' => 'ChIJ_7Z5TH5bpBIRNFR4bdj2aDU'],
            ['nom' => 'Siurana, Priorat', 'lat' => 41.2581000, 'lng' => 0.9316000, 'place_id' => 'ChIJW4y3gxQ9pBIRmbgDTVuD06Q'],
            ['nom' => 'Sitges, Garraf', 'lat' => 41.2351000, 'lng' => 1.8116000, 'place_id' => 'ChIJ3WhBBfWVpBIRx0gvf9LtL7A'],
            ['nom' => 'Cadaqués, Alt Empordà', 'lat' => 42.2882000, 'lng' => 3.2786000, 'place_id' => 'ChIJL3W8Q03lpBIRdo4x4GZdr0s'],
            ['nom' => 'Rupit i Pruit, Osona', 'lat' => 42.0240000, 'lng' => 2.4658000, 'place_id' => 'ChIJe5u0e4MhpBIRmjP2G2h-AaA'],
            ['nom' => 'Pals, Baix Empordà', 'lat' => 41.9712000, 'lng' => 3.1481000, 'place_id' => 'ChIJ56wIqkLfpBIRc6CFp8QxfFQ'],
            ['nom' => 'Camprodon, Ripollès', 'lat' => 42.3129000, 'lng' => 2.3648000, 'place_id' => 'ChIJn-Q5aINXpBIRiPyx1h8QnG8'],
            ['nom' => 'Delta de l\'Ebre, Montsià', 'lat' => 40.7400000, 'lng' => 0.7900000, 'place_id' => 'ChIJH6H8nUb3oRIR9VJzgVJf1dA'],
            ['nom' => 'Parc Güell, Barcelona', 'lat' => 41.4145000, 'lng' => 2.1527000, 'place_id' => 'ChIJj61dQgKipBIR4GeTYWZsKWw'],
            ['nom' => 'Girona Barri Vell, Girona', 'lat' => 41.9869000, 'lng' => 2.8249000, 'place_id' => 'ChIJ6a6A0MYXpBIR8fMOWy8uk8w'],
            ['nom' => 'La Molina, Cerdanya', 'lat' => 42.3310000, 'lng' => 1.9384000, 'place_id' => 'ChIJVwH6edrppRIRtSy6P7A0RmQ'],
            ['nom' => 'L\'Escala, Alt Empordà', 'lat' => 42.1244000, 'lng' => 3.1333000, 'place_id' => 'ChIJL6g8kjfepBIRR8KnNQ8vNgU'],
            ['nom' => 'PortAventura, Tarragonès', 'lat' => 41.0877000, 'lng' => 1.1576000, 'place_id' => 'ChIJ4-4Pd0NbpBIRiC8OG8N8qE8'],
            ['nom' => 'Santuari de Queralt, Berguedà', 'lat' => 42.1095000, 'lng' => 1.8439000, 'place_id' => 'ChIJyfvW2nDspRIRn2PjYt3gQGQ'],
            ['nom' => 'Llavorsí, Pallars Sobirà', 'lat' => 42.4979000, 'lng' => 1.2112000, 'place_id' => 'ChIJx0S7D2MUpRIR5vA7T3f9y2E'],
            ['nom' => 'Calella de Palafrugell, Baix Empordà', 'lat' => 41.8916000, 'lng' => 3.1827000, 'place_id' => 'ChIJ9Q2x3xrfpBIR6h7m1FBefQ0'],
            ['nom' => 'Peratallada, Baix Empordà', 'lat' => 41.9755000, 'lng' => 3.0896000, 'place_id' => 'ChIJlyv2xQ7fpBIRhSgq6GJ5j58'],
            ['nom' => 'Parc Nacional d\'Ordesa', 'lat' => 42.6538000, 'lng' => -0.0516000, 'place_id' => 'ChIJX3GqUo1jVQ0R9YQ3Yx8j3ds'],
            ['nom' => 'Albufera de València', 'lat' => 39.3558000, 'lng' => -0.3326000, 'place_id' => 'ChIJz5x0kQxRYA0R5oH9kVx2mQY'],
            ['nom' => 'Picos de Europa', 'lat' => 43.1871000, 'lng' => -4.8127000, 'place_id' => 'ChIJh9Zj_qxWTg0RPt4t95S0W4U'],
        ];

        $categoriesBase = [
            ['Senderisme'],
            ['Gastronomia'],
            ['Cultura i patrimoni'],
            ['Esports d\'aventura'],
            ['Relax i natura'],
            ['Enoturisme'],
            ['Turisme familiar'],
            ['Fotografia'],
            ['Festes locals'],
            ['Història viva'],
            ['Escapades de cap de setmana'],
            ['Miradors i panoràmiques'],
            ['Senderisme', 'Enoturisme'],
            ['Gastronomia', 'Turisme familiar'],
            ['Cultura i patrimoni', 'Història viva'],
            ['Esports d\'aventura', 'Fotografia'],
            ['Relax i natura', 'Escapades de cap de setmana'],
            ['Festes locals', 'Miradors i panoràmiques'],
            ['Senderisme', 'Gastronomia', 'Miradors i panoràmiques'],
            ['Cultura i patrimoni', 'Esports d\'aventura', 'Turisme familiar'],
            ['Relax i natura', 'Fotografia', 'Història viva'],
        ];

        foreach ($destinacions as $index => $destinacio) {
            $seed = $index + 1;
            $estat = 'publicat';
            $dataPublicacio = now()->subDays($seed + 1);

            if ($seed % 9 === 0) {
                $estat = 'esborrany';
                $dataPublicacio = null;
            } elseif ($seed % 13 === 0) {
                $estat = 'rebutjat';
                $dataPublicacio = null;
            }

            $experiencies[] = [
                'id_usuari_creador' => ($seed % 12) + 1,
                'id_categories' => $categoriesBase[$seed % count($categoriesBase)],
                'titol' => 'Escapada de prova '.$seed.' a '.$destinacio['nom'],
                'contingut' => 'Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a '.$destinacio['nom'].'.',
                'imatge' => $defaultImage,
                'latitud' => $destinacio['lat'],
                'longitud' => $destinacio['lng'],
                'ubicacio_nom' => $destinacio['nom'],
                'google_place_id' => $destinacio['place_id'],
                'estat' => $estat,
                'data_publicacio' => $dataPublicacio,
            ];
        }

        foreach ($experiencies as $experienciaData) {
            $categoryNames = $experienciaData['id_categories'] ?? [];
            $categoryIds = array_values(array_filter(array_map(
                fn (string $categoryName): ?int => $categoryIdByName[$categoryName] ?? null,
                $categoryNames
            )));
            unset($experienciaData['id_categories']);

            $matchAttributes = ! empty($experienciaData['google_place_id'])
                ? ['google_place_id' => $experienciaData['google_place_id']]
                : [
                    'titol' => $experienciaData['titol'],
                    'ubicacio_nom' => $experienciaData['ubicacio_nom'],
                    'latitud' => $experienciaData['latitud'],
                    'longitud' => $experienciaData['longitud'],
                ];

            $experiencia = Experiencia::updateOrCreate(
                $matchAttributes,
                $experienciaData
            );
            $experiencia->categories()->sync($categoryIds);
        }
    }
}
