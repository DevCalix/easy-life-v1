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
        Schema::create('ht_hotel_metas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ht_hotel_id')->constrained('ht_hotels')->onDelete('cascade');
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
        Schema::dropIfExists('ht_hotel_metas');
    }
};
