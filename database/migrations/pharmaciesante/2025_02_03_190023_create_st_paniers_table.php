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
        Schema::create('st_paniers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('st_medicament_id');
            $table->unsignedBigInteger('st_variation_medicament_id')->nullable();
            $table->integer('quantite');
            $table->decimal('prix_unitaire', 8, 2);
            $table->decimal('total', 8, 2);
            $table->boolean('ordonnance_requise')->default(false);
            $table->boolean('ordonnance_upload')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('st_medicament_id')->references('id')->on('st_medicaments')->onDelete('cascade');
            $table->foreign('st_variation_medicament_id')->references('id')->on('st_variation_medicaments')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('st_paniers');
    }
};
