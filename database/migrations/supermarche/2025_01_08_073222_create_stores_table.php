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
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // Nom du restaurant
            $table->text('adresse'); // Adresse complète
            $table->string('coordonnees_map')->nullable(); // Coordonnées sous forme "latitude,longitude"
            $table->string('numero_telephone')->nullable(); // Numéro de téléphone
            $table->text('horaires_ouverture')->nullable(); // Horaires d'ouverture
            $table->decimal('rating', 3, 2)->nullable(); // Note moyenne du restaurant (exemple : 4.5)
            $table->string('photo_restaurant')->nullable(); // Photo du restaurant (URL ou chemin)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
