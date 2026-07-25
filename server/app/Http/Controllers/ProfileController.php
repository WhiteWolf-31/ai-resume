<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resume;

class ProfileController extends Controller
{

    public function index()
    {

        $user = auth()->user();


        $resumeCount = Resume::where(
            'user_id',
            $user->id
        )->count();



        return response()->json([

            "user"=>[

                "name"=>$user->name,

                "email"=>$user->email,

                "created_at"=>$user->created_at

            ],


            "statistics"=>[

                "total_resumes"=>$resumeCount,

                "analysis_used"=>$user->analysis_used,

                "analysis_limit"=>$user->analysis_limit,

                "remaining"=>$user->analysis_limit - $user->analysis_used

            ]

        ]);

    }

}