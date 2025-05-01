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
        Schema::create('st_promotions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('st_medicament_id')->constrained('st_medicaments')->onDelete('cascade');
            $table->decimal('reduction', 5, 2);
            $table->date('date_debut');
            $table->date('date_fin');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('st_promotions');
    }
};
