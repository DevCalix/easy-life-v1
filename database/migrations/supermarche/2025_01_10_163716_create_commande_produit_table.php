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
        Schema::create('commande_produit', function (Blueprint $table) {
            $table->id();
            $table->foreignId('commande_id')->constrained()->onDelete('cascade'); // ID de la commande
            $table->foreignId('produit_id')->constrained()->onDelete('cascade'); // ID du produit
            $table->integer('quantite'); // Quantité du produit
            $table->decimal('prix_unitaire', 10, 2); // Prix unitaire du produit
            $table->decimal('prix_total', 10, 2); // Prix total (quantité * prix_unitaire)
            $table->timestamps(); // created_at et updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commande_produit');
    }
};
