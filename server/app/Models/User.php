<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{

    use HasApiTokens;


    protected $fillable = [

        'name',
        'email',
        'password',
        'analysis_used',
        'analysis_limit',
        'analysis_reset_at'

    ];



    protected $hidden = [

        'password',
        'remember_token',

    ];



    protected $casts = [

        'analysis_used' => 'integer',

        'analysis_limit' => 'integer',

        'analysis_reset_at' => 'datetime',

    ];

}