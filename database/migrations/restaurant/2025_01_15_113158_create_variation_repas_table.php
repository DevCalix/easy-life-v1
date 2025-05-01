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
        Schema::create('variation_repas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('repas_id')->constrained('repas')->onDelete('cascade'); // Clé étrangère vers la table `repas`
            $table->string('type_variation'); // type de la variation (ex: "Petite", "Grande", "Spicy")
            $table->string('valeur_variation'); // Nom de la variation (ex: "Petite", "Grande", "Spicy")
            $table->decimal('prix', 8, 2); // Prix de la variation
            $table->string('image_variation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variation_repas');
    }
};
