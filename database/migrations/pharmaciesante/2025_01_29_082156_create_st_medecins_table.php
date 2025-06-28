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
        Schema::create('st_medecins', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('user_id');
            $table->string('specialite');
            $table->string('adresse');
            $table->string('telephone');
            $table->string('email')->nullable();
            $table->string('carte')->nullable();
            $table->string('image_principale')->nullable();
            $table->decimal('note', 3, 2)->nullable()->default(0);
            $table->string('type')->default('généraliste');
            $table->integer('nombre_d_annee_experience')->nullable();
            $table->text('a_propos')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('st_medecins');
    }
};
