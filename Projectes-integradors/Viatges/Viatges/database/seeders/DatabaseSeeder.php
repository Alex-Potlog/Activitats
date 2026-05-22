<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Ordre important cal respectar les claus foranies
        $this->call([
            UserSeeder::class,
            CategoriaSeeder::class,
            ExperienciaSeeder::class,
            ComentariSeeder::class,
            LikeSeeder::class,
            ReportSeeder::class,
        ]);
    }
}
