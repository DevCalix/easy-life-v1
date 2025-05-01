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
        Schema::create('ht_images', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->foreignId('ht_hotel_id')->nullable()->constrained('ht_hotels')->onDelete('cascade'); // Clé étrangère avec préfixe
            $table->foreignId('ht_chambre_id')->nullable()->constrained('ht_chambres')->onDelete('cascade'); // Clé étrangère avec préfixe
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ht_images');
    }
};
