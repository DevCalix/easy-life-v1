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
        Schema::create('st_medicaments', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('slug');
            $table->text('description');
            $table->string('image_principale');
            $table->decimal('prix', 10, 2);
            $table->boolean('ordonnance_requise');
            $table->boolean('medicament_urgent')->default(false);
            $table->foreignId('st_pharmacie_id')->constrained('st_pharmacies'); // Lien avec la pharmacie
            $table->timestamps();

            $table->unique(['slug', 'st_pharmacie_id']); // Empêche les doublons pour une même pharmacie
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('st_medicaments');
    }
};
