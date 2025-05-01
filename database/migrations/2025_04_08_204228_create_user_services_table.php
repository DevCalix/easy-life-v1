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
        Schema::create('user_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('service_type'); // ex: App\Models\Restaurant
            $table->unsignedBigInteger('service_id'); // ID du service réel (restaurant_id, etc.)

            $table->string('code_marchand')->unique(); // identifiant unique du service géré par le user
            $table->string('role')->default('owner');
            $table->timestamps();

            // Index composite pour les recherches optimisées
            $table->index(['user_id', 'service_type', 'service_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_services');
    }
};
