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
        Schema::create('st_variation_medicaments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('st_medicament_id')->constrained('st_medicaments')->onDelete('cascade'); // Lien avec le médicament
            $table->string('type_variation'); // Ex: "Contenance", "Dosage", "Forme"
            $table->string('valeur_variation'); // Ex: "500mg", "Sirop 250ml", "Comprimé"
            $table->decimal('prix', 10, 2)->nullable(); // Prix spécifique pour cette variation
            $table->string('image_variation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('st_variation_medicaments');
    }
};
