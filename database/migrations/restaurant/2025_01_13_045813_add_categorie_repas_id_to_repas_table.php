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
        Schema::table('repas', function (Blueprint $table) {
            $table->foreignId('categorie_repas_id')->nullable()->constrained('categorie_repas')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('repas', function (Blueprint $table) {
            //
        });
    }
};
