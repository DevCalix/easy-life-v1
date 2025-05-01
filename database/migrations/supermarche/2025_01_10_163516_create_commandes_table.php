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
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique(); // Référence unique de la commande
            $table->foreignId('utilisateur_id')->nullable()->constrained('users')->onDelete('set null'); // ID de l'utilisateur (si connecté)
            $table->string('nom_client'); // Nom du client
            $table->string('email_client'); // Email du client
            $table->string('telephone_client'); // Téléphone du client
            $table->decimal('montant_total', 10, 2); // Montant total de la commande
            $table->string('statut')->default('en_attente'); // Statut de la commande (en_attente, payée, annulée)
            $table->timestamps(); // created_at et updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
