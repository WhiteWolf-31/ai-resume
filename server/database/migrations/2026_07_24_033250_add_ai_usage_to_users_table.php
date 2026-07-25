<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{

    public function up()
    {

        Schema::table('users', function (Blueprint $table) {


            $table->integer('analysis_used')
                  ->default(0);


            $table->integer('analysis_limit')
                  ->default(10);


        });

    }



    public function down()
    {

        Schema::table('users', function (Blueprint $table) {


            $table->dropColumn([
                'analysis_used',
                'analysis_limit'
            ]);


        });

    }

};