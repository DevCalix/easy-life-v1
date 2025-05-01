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
        Schema::create('ht_promotions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ht_hotel_id')->constrained('ht_hotels')->onDelete('cascade'); // Clé étrangère avec préfixe
            $table->foreignId('ht_chambre_id')->nullable()->constrained('ht_chambres')->onDelete('cascade'); // Clé étrangère avec préfixe
            $table->decimal('pourcentage_reduction', 5, 2);
            $table->date('date_debut');
            $table->date('date_fin');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ht_promotions');
    }
};
