<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categoria_experiencia', function (Blueprint $table) {
            $table->foreignId('id_experiencia')->constrained('experiencies')->cascadeOnDelete();
            $table->foreignId('id_categoria')->constrained('categorias')->cascadeOnDelete();
            $table->timestamps();

            $table->primary(['id_experiencia', 'id_categoria']);
        });

        if (Schema::hasColumn('experiencies', 'id_categoria')) {
            $now = now();

            DB::table('experiencies')
                ->whereNotNull('id_categoria')
                ->select(['id', 'id_categoria'])
                ->orderBy('id')
                ->chunk(500, function ($experiencies) use ($now): void {
                    foreach ($experiencies as $experiencia) {
                        DB::table('categoria_experiencia')->insertOrIgnore([
                            'id_experiencia' => $experiencia->id,
                            'id_categoria' => $experiencia->id_categoria,
                            'created_at' => $now,
                            'updated_at' => $now,
                        ]);
                    }
                });

            Schema::table('experiencies', function (Blueprint $table) {
                $table->dropConstrainedForeignId('id_categoria');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasColumn('experiencies', 'id_categoria')) {
            Schema::table('experiencies', function (Blueprint $table) {
                $table->foreignId('id_categoria')->nullable()->after('id_usuari_creador')->constrained('categorias')->nullOnDelete();
            });
        }

        $defaultCategories = DB::table('categoria_experiencia')
            ->select('id_experiencia', DB::raw('MIN(id_categoria) as id_categoria'))
            ->groupBy('id_experiencia')
            ->get();

        foreach ($defaultCategories as $relation) {
            DB::table('experiencies')
                ->where('id', $relation->id_experiencia)
                ->update(['id_categoria' => $relation->id_categoria]);
        }

        Schema::dropIfExists('categoria_experiencia');
    }
};
