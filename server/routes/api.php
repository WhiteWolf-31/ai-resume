<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\ResumeAnalysisController;
use App\Http\Controllers\AIAnalysisController;
use App\Http\Controllers\ProfileController;



Route::post('/register',
[AuthController::class,'register']);


Route::post('/login',
[AuthController::class,'login']);




Route::middleware('auth:sanctum')->group(function(){



    // Resume Upload

    Route::post(
        '/resume/upload',
        [ResumeController::class,'upload']
    );



    // Resume Analysis Report

    Route::get(
        '/resume/analyze/{id}',
        [ResumeAnalysisController::class,'analyze']
    );



    // Dashboard

    Route::get(
        '/dashboard',
        [ResumeAnalysisController::class,'dashboard']
    );



    // Resume History

    Route::get(
        '/resume/history',
        [ResumeController::class,'history']
    );



    // Delete Resume

    Route::delete(
        '/resume/{id}',
        [ResumeController::class,'destroy']
    );



    // AI Usage

    Route::get(
        '/usage',
        [ResumeController::class,'usage']
    );



    // Profile

    Route::get(
        '/profile',
        [ProfileController::class,'index']
    );



    // AI Models

    Route::get(
        '/ai/models',
        [AIAnalysisController::class,'models']
    );


});