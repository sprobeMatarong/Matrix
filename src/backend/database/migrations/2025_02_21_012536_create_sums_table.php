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
        Schema::create('sums', function (Blueprint $table) {
            $table->id();
            $table->decimal('number1', 10,2);
            $table->decimal('number2',10,2);
            $table->decimal('result',10,2);
            $table->timestamps();
        });
    }   

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sums');
    }
};
