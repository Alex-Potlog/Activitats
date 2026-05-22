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
        Schema::table('experiencies', function (Blueprint $table) {
            $table->string('google_place_id')->nullable()->after('ubicacio_nom');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('experiencies', function (Blueprint $table) {
            $table->dropColumn('google_place_id');
        });
    }
};
