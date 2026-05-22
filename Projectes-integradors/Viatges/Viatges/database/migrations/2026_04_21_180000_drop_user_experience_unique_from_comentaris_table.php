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
        Schema::table('comentaris', function (Blueprint $table) {
            $table->dropForeign(['id_usuari']);
            $table->dropForeign(['id_experiencia']);

            $table->dropUnique('comentaris_id_usuari_id_experiencia_unique');

            $table->index('id_usuari', 'comentaris_id_usuari_index');
            $table->index('id_experiencia', 'comentaris_id_experiencia_index');

            $table->foreign('id_usuari')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('id_experiencia')->references('id')->on('experiencies')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comentaris', function (Blueprint $table) {
            $table->dropForeign(['id_usuari']);
            $table->dropForeign(['id_experiencia']);

            $table->dropIndex('comentaris_id_usuari_index');
            $table->dropIndex('comentaris_id_experiencia_index');

            $duplicates = DB::table('comentaris')
                ->select('id_usuari', 'id_experiencia', DB::raw('MIN(id) as keep_id'))
                ->groupBy('id_usuari', 'id_experiencia')
                ->havingRaw('COUNT(*) > 1')
                ->get();

            foreach ($duplicates as $duplicate) {
                DB::table('comentaris')
                    ->where('id_usuari', $duplicate->id_usuari)
                    ->where('id_experiencia', $duplicate->id_experiencia)
                    ->where('id', '!=', $duplicate->keep_id)
                    ->delete();
            }

            $table->unique(['id_usuari', 'id_experiencia']);

            $table->foreign('id_usuari')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('id_experiencia')->references('id')->on('experiencies')->cascadeOnDelete();
        });
    }
};
