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
        Schema::create('section_accueils', function (Blueprint $table) {
            $table->id();
            $table->string('section');
            $table->string('nom_produit');
            $table->decimal('prix', 10, 2)->nullable();;
            $table->decimal('prix_promotion', 10, 2)->nullable();
            $table->decimal('pourcentage_promotion', 5, 2)->nullable();
            $table->string('image');
            $table->string('lien_redirection');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section_accueils');
    }
};
