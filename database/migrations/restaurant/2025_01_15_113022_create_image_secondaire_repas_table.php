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
        Schema::create('image_secondaire_repas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('repas_id')->constrained('repas')->onDelete('cascade'); // Clé étrangère vers la table `repas`
            $table->string('url_image'); // URL ou chemin de l'image secondaire
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_secondaire_repas');
    }
};
