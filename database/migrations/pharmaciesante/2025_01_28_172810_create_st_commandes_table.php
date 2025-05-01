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
        Schema::create('st_commandes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('transaction_ref')->nullable();
            $table->decimal('montant_total', 10, 2)->nullable();
            $table->string('nom_client');
            $table->string('email_client');
            $table->string('telephone_client');
            $table->json('produits')->nullable();
            $table->enum('statut', ['en cours', 'livrée', 'annulée'])->default('en cours');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('st_commandes');
    }
};
