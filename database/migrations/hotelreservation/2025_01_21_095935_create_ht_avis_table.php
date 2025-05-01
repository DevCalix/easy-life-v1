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
        Schema::create('ht_avis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ht_hotel_id')->constrained('ht_hotels')->onDelete('cascade'); // Clé étrangère avec préfixe
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->float('note');
            $table->text('commentaire')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ht_avis');
    }
};
