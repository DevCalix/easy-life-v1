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
        Schema::create('repas_tagrepas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('repas_id')->constrained('repas')->onDelete('cascade'); // Clé étrangère vers la table 'repas'
            $table->foreignId('tagrepas_id')->constrained('tagrepas')->onDelete('cascade'); // Clé étrangère vers la table 'tagrepas'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repas_tagrepas');
    }
};
