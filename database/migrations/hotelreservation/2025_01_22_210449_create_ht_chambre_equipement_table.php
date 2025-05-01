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
        Schema::create('ht_chambre_equipement', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ht_chambre_id')->constrained('ht_chambres')->onDelete('cascade');
            $table->foreignId('ht_equipement_id')->constrained('ht_equipements')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ht_chambre_equipement');
    }
};
