<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::create('resume_analyses', function (Blueprint $table) {

        $table->id();

        $table->foreignId('resume_id')
              ->constrained()
              ->cascadeOnDelete();

        $table->integer('ats_score')
              ->nullable();

        $table->text('summary')
              ->nullable();

        $table->json('skills')
              ->nullable();

        $table->json('strengths')
              ->nullable();

        $table->json('weaknesses')
              ->nullable();

        $table->json('suggestions')
              ->nullable();

        $table->timestamps();

    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resume_analyses');
    }
};
