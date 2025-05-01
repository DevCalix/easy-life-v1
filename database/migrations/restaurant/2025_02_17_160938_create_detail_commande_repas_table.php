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
        Schema::create('detail_commande_repas', function (Blueprint $table) {
            $table->id(); // Clé primaire auto-incrémentée
            $table->unsignedBigInteger('commande_id'); // Clé étrangère vers la table des commandes
            $table->unsignedBigInteger('repas_id'); // Clé étrangère vers la table des repas
            $table->unsignedBigInteger('variation_id')->nullable(); // Clé étrangère vers la table des variations (nullable)
            $table->integer('quantite'); // Quantité du repas commandé
            $table->decimal('prix_unitaire', 10, 2); // Prix unitaire du repas ou de la variation
            $table->decimal('prix_total', 10, 2); // Prix total (quantité * prix_unitaire)
            $table->timestamps(); // Colonnes created_at et updated_at

            // Clés étrangères
            $table->foreign('commande_id')->references('id')->on('repas_commandes')->onDelete('cascade');
            $table->foreign('repas_id')->references('id')->on('repas')->onDelete('cascade');
            $table->foreign('variation_id')->references('id')->on('variation_repas')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_commande_repas');
    }
};
