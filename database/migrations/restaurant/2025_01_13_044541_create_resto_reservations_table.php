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
        Schema::create('resto_reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade'); // Associe la réservation à un restaurant
            $table->foreignId('user_id')->constrained()->onDelete('cascade');// Associe la réservation à un utilisateur
            $table->string('nom_client'); // Nom du client
            $table->string('numero_telephone')->nullable(); // Numéro de téléphone du client
            $table->date('date_reservation'); // Date de la réservation
            $table->time('heure_reservation'); // Heure de la réservation
            $table->integer('nombre_personnes'); // Nombre de personnes pour la réservation
            $table->string('statut')->default('en attente'); // Statut de la réservation (exemple : "en attente", "confirmée", "annulée")
            $table->text('commentaire')->nullable(); // Commentaires ou demandes spéciales du client
            $table->string('cle_reservation')->unique(); // Clé de réservation unique
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resto_reservations');
    }
};
