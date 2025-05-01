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
        Schema::create('st_images', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->unsignedBigInteger('st_medicament_id')->nullable();
            $table->unsignedBigInteger('st_pharmacie_id')->nullable();
            $table->unsignedBigInteger('st_hopital_id')->nullable();
            $table->timestamps();

            // Clés étrangères
            $table->foreign('st_medicament_id')->references('id')->on('st_medicaments')->onDelete('cascade');
            $table->foreign('st_pharmacie_id')->references('id')->on('st_pharmacies')->onDelete('cascade');
            $table->foreign('st_hopital_id')->references('id')->on('st_hopitals')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('st_images');
    }
};
