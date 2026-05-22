<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comentaris', function (Blueprint $table) {
            $table->id();
            $table->unique(['id_usuari', 'id_experiencia']);

            $table->foreignId('id_usuari')->constrained('users')->cascadeOnDelete();
            $table->foreignId('id_experiencia')->constrained('experiencies')->cascadeOnDelete();
            $table->text('contingut');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comentaris');
    }
};
