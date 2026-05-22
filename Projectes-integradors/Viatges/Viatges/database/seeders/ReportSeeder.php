<?php

namespace Database\Seeders;

use App\Models\Experiencia;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReportSeeder extends Seeder
{
    public function run(): void
    {
        $userIds = User::query()->pluck('id')->all();
        $experiencies = Experiencia::query()
            ->select(['id', 'id_usuari_creador', 'estat'])
            ->orderBy('id')
            ->get();

        foreach ($experiencies as $experiencia) {
            $availableUserIds = array_values(array_filter(
                $userIds,
                fn (int $userId): bool => $userId !== $experiencia->id_usuari_creador
            ));

            if (count($availableUserIds) < 2) {
                continue;
            }

            $reportsCount = 0;

            if (in_array($experiencia->estat, ['rebutjat', 'esborrany'], true)) {
                $reportsCount = min(5, count($availableUserIds));
            }

            if ($experiencia->estat === 'publicat' && $experiencia->id % 7 === 0) {
                $reportsCount = min(2, count($availableUserIds));
            }

            for ($index = 0; $index < $reportsCount; $index++) {
                $userId = $availableUserIds[($experiencia->id + ($index * 3)) % count($availableUserIds)];

                Report::firstOrCreate([
                    'id_usuari' => $userId,
                    'id_experiencia' => $experiencia->id,
                ]);
            }
        }
    }
}
