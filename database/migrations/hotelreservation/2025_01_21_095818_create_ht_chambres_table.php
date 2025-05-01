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
        Schema::create('ht_chambres', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ht_hotel_id')->constrained('ht_hotels')->onDelete('cascade'); // Clé étrangère
            $table->string('numero_chambre'); // Numéro de la chambre
            $table->string('type'); // Type de chambre (Simple, Double, Suite, etc.)
            $table->decimal('prix_par_nuit', 8, 2); // Prix par nuit
            $table->integer('capacite'); // Capacité (nombre de personnes)
            $table->integer('lits_disponibles'); // Nombre de lits disponibles
            $table->text('description')->nullable(); // Description de la chambre
            $table->boolean('est_disponible')->default(true); // Disponibilité
            $table->string('image_principale')->nullable(); // Image principale
            $table->timestamps();

            // Index unique composite
            $table->unique(['ht_hotel_id', 'numero_chambre']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ht_chambres');
    }
};
