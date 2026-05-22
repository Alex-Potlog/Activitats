<?php

namespace Database\Seeders;

use App\Models\Experiencia;
use App\Models\Like;
use App\Models\User;
use Illuminate\Database\Seeder;

class LikeSeeder extends Seeder
{
    public function run(): void
    {
        $userIds = User::query()->pluck('id')->all();
        $experiencies = Experiencia::query()
            ->select(['id', 'id_usuari_creador', 'estat'])
            ->where('estat', 'publicat')
            ->orderBy('id')
            ->get();

        foreach ($experiencies as $experiencia) {
            $availableUserIds = array_values(array_filter(
                $userIds,
                fn (int $userId): bool => $userId !== $experiencia->id_usuari_creador
            ));

            if (count($availableUserIds) === 0) {
                continue;
            }

            $reactionsCount = min(10, count($availableUserIds));

            for ($index = 0; $index < $reactionsCount; $index++) {
                $userId = $availableUserIds[($experiencia->id + ($index * 2)) % count($availableUserIds)];
                $valoracio = (($experiencia->id + $index) % 6 === 0) ? -1 : 1;

                Like::updateOrCreate(
                    [
                        'id_usuari' => $userId,
                        'id_experiencia' => $experiencia->id,
                    ],
                    [
                        'valoracio' => $valoracio,
                    ]
                );
            }
        }
    }
}
