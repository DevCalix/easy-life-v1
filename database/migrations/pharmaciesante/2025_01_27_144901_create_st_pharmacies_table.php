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
        Schema::create('st_pharmacies', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('adresse');
            $table->string('heures_ouverture');
            $table->string('telephone');
            $table->text('lien_carte')->nullable();
            $table->string('image_principale');
            $table->decimal('note', 3, 2)->nullable();
            $table->boolean('pharmacie_de_garde')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('st_pharmacies');
    }
};
