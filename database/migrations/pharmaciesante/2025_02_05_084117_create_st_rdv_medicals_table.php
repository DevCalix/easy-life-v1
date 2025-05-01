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
        Schema::create('st_rdv_medicals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('st_medecin_id')->constrained('st_medecins')->onDelete('cascade');
            $table->date('date')->nullable();
            $table->time('heure')->nullable();
            $table->text('message')->nullable();
            $table->enum('statut', ['en_attente', 'confirmé', 'annulé'])->default('en_attente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('st_rdv_medicals');
    }
};
