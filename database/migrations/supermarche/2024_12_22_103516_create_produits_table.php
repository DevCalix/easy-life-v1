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
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->onDelete('cascade');
            $table->string('nom');
            $table->string('slug')->unique();
            $table->text('description_courte')->nullable();
            $table->text('description')->nullable();
            $table->decimal('prix', 10, 2);
            $table->string('image_principale')->nullable();
            $table->boolean('is_variable')->default(false);
            $table->enum('statut', ['actif', 'épuisé'])->default('actif');
            $table->boolean('est_populaire')->nullable()->default(false);
            $table->decimal('pourcentage_reduction', 5, 2)->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
