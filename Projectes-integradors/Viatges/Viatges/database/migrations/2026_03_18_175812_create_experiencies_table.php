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
        Schema::create('experiencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_usuari_creador')->constrained('users')->cascadeOnDelete();
            $table->foreignId('id_categoria')->nullable()->constrained('categorias')->nullOnDelete();
            $table->string('titol');
            $table->text('contingut');
            $table->string('imatge');               // URL de Cloudinary
            $table->decimal('latitud', 10, 7);
            $table->decimal('longitud', 10, 7);
            $table->string('ubicacio_nom')->nullable(); // Ej: "Picos de Europa"
            $table->enum('estat', ['esborrany', 'publicat', 'rebutjat'])->default('publicat');
            $table->timestamp('data_publicacio')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiencies');
    }
};
