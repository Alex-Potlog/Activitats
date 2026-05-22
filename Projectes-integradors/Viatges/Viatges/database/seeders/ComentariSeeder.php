<?php

namespace Database\Seeders;

use App\Models\Comentari;
use App\Models\Experiencia;
use App\Models\User;
use Illuminate\Database\Seeder;

class ComentariSeeder extends Seeder
{
    public function run(): void
    {
        $missatges = [
            'Molt bona proposta. L\'he guardat per fer-la aquest cap de setmana.',
            'Experiència súper recomanable, especialment si hi vas d\'hora.',
            'Ruta fàcil de seguir i amb molt bons punts per fer fotos.',
            'Hi tornaria sens dubte. Gràcies per compartir tots els detalls!',
            'La descripció és molt útil, m\'ha ajudat a planificar la sortida.',
            'Ambient molt agradable i zona ideal per anar-hi en grup.',
            'Ens va encantar l\'itinerari, sobretot el tram final amb les vistes.',
            'Molt bona relació entre esforç i recompensa, repetirem segur.',
            'Perfecte per una escapada curta, ben explicat i molt pràctic.',
            'Hem seguit les recomanacions i tot ha anat rodat.',
            'Experiència completa: paisatge, tranquil·litat i bon ambient.',
            'La zona està molt ben conservada, val molt la pena visitar-la.',
            'Informació clara i útil; ens ha ajudat a evitar hores punta.',
            'Planificació ideal per anar-hi en parella o amb amistats.',
        ];

        $userIds = User::query()->pluck('id')->all();
        $experiencies = Experiencia::query()
            ->select(['id', 'id_usuari_creador', 'estat'])
            ->where('estat', 'publicat')
            ->orderBy('id')
            ->get();

        foreach ($experiencies as $experiencia) {
            $availableUserIds = array_values(array_filter(
                $userIds,
                fn(int $userId): bool => $userId !== $experiencia->id_usuari_creador
            ));

            if (count($availableUserIds) === 0) {
                continue;
            }

            $commenterSlots = min(2, count($availableUserIds));
            $commentsCount = 4;

            for ($index = 0; $index < $commentsCount; $index++) {
                $userId = $availableUserIds[($experiencia->id + ($index % $commenterSlots)) % count($availableUserIds)];
                $message = $missatges[($experiencia->id + $index) % count($missatges)];

                Comentari::firstOrCreate([
                    'id_usuari' => $userId,
                    'id_experiencia' => $experiencia->id,
                    'contingut' => $message,
                ]);
            }
        }
    }
}
