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
        Schema::create('ht_hotel_equipement', function (Blueprint $table) {
            $table->unsignedBigInteger('ht_hotel_id');
            $table->unsignedBigInteger('ht_equipement_id');
            $table->timestamps();

            // Clés étrangères
            $table->foreign('ht_hotel_id')->references('id')->on('ht_hotels')->onDelete('cascade');
            $table->foreign('ht_equipement_id')->references('id')->on('ht_equipements')->onDelete('cascade');

            // Clé primaire composite
            $table->primary(['ht_hotel_id', 'ht_equipement_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ht_hotel_equipement');
    }
};
