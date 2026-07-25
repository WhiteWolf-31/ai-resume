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
        Schema::create('resume_comparisons', function (Blueprint $table) {

            $table->id();


            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();


            $table->foreignId('old_resume_id')
                  ->constrained('resumes')
                  ->cascadeOnDelete();


            $table->foreignId('new_resume_id')
                  ->constrained('resumes')
                  ->cascadeOnDelete();


            $table->json('improvements');


            $table->timestamps();

        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resume_comparisons');
    }

};