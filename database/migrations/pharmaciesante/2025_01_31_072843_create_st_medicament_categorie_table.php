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
        Schema::create('st_medicament_categorie', function (Blueprint $table) {
            $table->id();
            $table->foreignId('st_medicament_id')->constrained('st_medicaments')->onDelete('cascade');
            $table->foreignId('st_categorie_id')->constrained('st_categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('st_medicament_categorie');
    }
};
