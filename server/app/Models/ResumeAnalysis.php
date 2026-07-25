<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ResumeAnalysis extends Model
{

    protected $fillable = [

        'resume_id',
        'ats_score',
        'summary',
        'skills',
        'strengths',
        'weaknesses',
        'suggestions'

    ];



    protected $casts = [

        'skills'=>'array',
        'strengths'=>'array',
        'weaknesses'=>'array',
        'suggestions'=>'array'

    ];



    public function resume()
    {

        return $this->belongsTo(Resume::class);

    }

}