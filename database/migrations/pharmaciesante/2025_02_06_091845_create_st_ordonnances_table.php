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
        Schema::create('st_ordonnances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('st_commande_id')->nullable()->constrained('st_commandes')->onDelete('cascade');
            $table->foreignId('st_medicament_id')->constrained('st_medicaments')->onDelete('cascade');
            $table->string('fichier_ordonnance');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('st_ordonnances');
    }
};
