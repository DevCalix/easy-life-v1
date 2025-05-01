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
        Schema::create('repas_commande_paniers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(); // Pour les utilisateurs connectés
            $table->string('session_id')->nullable(); // Pour les utilisateurs non connectés
            $table->unsignedBigInteger('repas_id'); // Référence au repas
            $table->unsignedBigInteger('variation_id')->nullable(); // Référence à la variation (optionnelle)
            $table->integer('quantite')->default(1); 

            // Clés étrangères
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('repas_id')->references('id')->on('repas')->onDelete('cascade');
            $table->foreign('variation_id')->references('id')->on('variation_repas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repas_commande_paniers');
    }
};
