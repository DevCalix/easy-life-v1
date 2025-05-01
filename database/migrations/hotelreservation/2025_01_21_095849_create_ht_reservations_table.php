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
        Schema::create('ht_reservations', function (Blueprint $table) {
            $table->id(); // ID de la réservation
            $table->foreignId('ht_hotel_id')->constrained('ht_hotels')->onDelete('cascade'); // Clé étrangère vers ht_hotels
            $table->foreignId('ht_chambre_id')->constrained('ht_chambres')->onDelete('cascade'); // Clé étrangère vers ht_chambres
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null'); // Clé étrangère vers users (si l'utilisateur est connecté)
            $table->date('date_arrivee'); // Date d'arrivée
            $table->date('date_depart'); // Date de départ
            $table->integer('nombre_personnes'); // Nombre de personnes
            $table->decimal('prix', 10, 2); // Prix de la chambre au moment de la réservation
            $table->string('numero_piece'); // Numéro de la pièce d'identité
            $table->string('piece_identite')->nullable(); // Chemin du fichier uploadé (peut être null)
            $table->string('nom'); // Nom du client
            $table->string('email');
            $table->string('telephone');
            $table->text('raison_sejour')->nullable();
            $table->string('statut')->default('en_attente');
            $table->string('reservation_key')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ht_reservations');
    }
};
