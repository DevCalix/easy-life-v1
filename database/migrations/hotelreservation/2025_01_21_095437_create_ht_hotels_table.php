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
        Schema::create('ht_hotels', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('type_etablissement'); // Hôtel, Maison d'hôtes, B&B, etc.
            $table->string('adresse');
            $table->string('numero_appartement_etage')->nullable(); // Facultatif
            $table->string('ville');
            $table->string('pays_region'); // Pays ou région
            $table->string('telephone');
            $table->string('email');
            $table->text('description')->nullable();
            $table->string('repas_offerts')->nullable(); // Petit-déjeuner compris, etc.
            $table->string('parking')->nullable(); // Oui, gratuitement / Oui, moyennant un supplément / Non
            $table->time('horaires_arrivee_de')->nullable(); // Heure d'arrivée (de)
            $table->time('horaires_arrivee_a')->nullable(); // Heure d'arrivée (à)
            $table->time('horaires_depart_de')->nullable(); // Heure de départ (de)
            $table->time('horaires_depart_a')->nullable(); // Heure de départ (à)
            $table->boolean('accepte_enfants')->default(false); // Accepte les enfants ?
            $table->string('accepte_animaux')->nullable(); // Oui / Sur demande / Non
            $table->boolean('fumer')->default(false); // Fumer autorisé ?
            $table->float('note')->default(0);
            $table->string('image_principale')->nullable(); // Image principale
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ht_hotels');
    }
};
