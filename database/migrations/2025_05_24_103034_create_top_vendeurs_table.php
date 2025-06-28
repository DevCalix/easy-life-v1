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
        Schema::create('top_vendeurs', function (Blueprint $table) {
            $table->id();
            $table->string('section');
            $table->string('nom');
            $table->string('description')->nullable();
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
        Schema::dropIfExists('top_vendeurs');
    }
};
