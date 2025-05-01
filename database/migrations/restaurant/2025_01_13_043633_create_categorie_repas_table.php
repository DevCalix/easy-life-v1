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
        Schema::create('categorie_repas', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->unique(); // Nom de la catégorie (ex : "Pizza", "Burger")
            $table->string('slug')->unique();
            $table->string('description')->nullable(); // Description de la catégorie
            $table->string('image')->nullable(); // Image de la catégorie (URL ou chemin)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categorie_repas');
    }
};
