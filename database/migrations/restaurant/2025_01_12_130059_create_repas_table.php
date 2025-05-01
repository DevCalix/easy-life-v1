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
        Schema::create('repas', function (Blueprint $table) {
            $table->id();
            $table->string('repasId', 12)->unique();
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade'); // Associe le repas à un restaurant
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade'); // Associe le repas à un restaurant
            $table->string('nom'); // Nom du repas
            $table->string('slug')->unique();
            $table->text('description')->nullable(); // Description du repas
            $table->decimal('prix', 10, 2); // Prix sans réduction
            $table->integer('reduction')->nullable(); // Pourcentage de réduction (ex. 10 pour 10%)
            $table->decimal('prix_reduit', 10, 2)->nullable(); // Prix après réduction
            $table->decimal('rating', 3, 2)->nullable(); // Note moyenne
            $table->boolean('est_populaire')->nullable()->default(false);
            $table->string('photo')->nullable(); // Chemin ou URL de l'image
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repas');
    }
};
