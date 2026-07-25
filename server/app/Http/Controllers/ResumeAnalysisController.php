<?php

namespace App\Http\Controllers;

use App\Models\ResumeAnalysis;
use Illuminate\Http\Request;


class ResumeAnalysisController extends Controller
{


    public function analyze($id)
    {

        $analysis = ResumeAnalysis::where(
            'resume_id',
            $id
        )
        ->latest()
        ->first();



        if (!$analysis) {

            return response()->json([

                "message" => "Analysis not found"

            ],404);

        }



        return response()->json([

            "message" => "Analysis fetched successfully",

            "analysis" => $analysis

        ]);

    }





    public function dashboard()
    {


        $user = auth()->user();



        if(!$user){

            return response()->json([

                "message"=>"Unauthenticated"

            ],401);

        }



        $analysis = ResumeAnalysis::with('resume')

            ->whereHas('resume', function($query) use ($user){


                $query->where(

                    'user_id',

                    $user->id

                );


            })

            ->latest()

            ->first();





        if(!$analysis){


            return response()->json([


                "message"=>"No analysis found"


            ],404);


        }





        return response()->json([


            "message"=>"Analysis fetched successfully",


            "analysis"=>$analysis


        ]);



    }


}