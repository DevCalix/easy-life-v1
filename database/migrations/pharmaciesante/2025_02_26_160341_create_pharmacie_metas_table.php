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
        Schema::create('pharmacie_metas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('st_pharmacie_id')->constrained('st_pharmacies')->onDelete('cascade');
            $table->string('cle');
            $table->text('valeur');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pharmacie_metas');
    }
};
