<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Resume;
use App\Models\ResumeAnalysis;


class AIAnalysisController extends Controller
{

    public function analyze(Request $request)
    {

        // Find uploaded resume
        $resume = Resume::find($request->resume_id);


        if (!$resume) {

            return response()->json([
                "message" => "Resume not found"
            ], 404);

        }


        // Resume extracted text
        $resumeText = $request->resume_text;


        if (!$resumeText) {

            return response()->json([
                "message" => "Resume text is required"
            ], 400);

        }



        // Send request to Groq AI
        $response = Http::connectTimeout(30)
->timeout(180)
->withHeaders([

            "Authorization" => "Bearer " . env('GROQ_API_KEY'),

            "Content-Type" => "application/json"

        ])
        ->timeout(120)
        ->post(

            "https://api.groq.com/openai/v1/chat/completions",

            [

               "model" => "llama-3.1-8b-instant",


                "messages" => [

                    [

                        "role" => "system",

                        "content" => 
                        "You are an expert ATS resume analyzer. 
                        Always return only valid JSON."

                    ],


                    [

                        "role" => "user",

                        "content" => 

                        "Analyze this resume.

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations.

Use this exact format:

{
    \"ats_score\": 85,

    \"summary\": \"Short summary about candidate\",

    \"skills\": [
        \"React\",
        \"Laravel\",
        \"PHP\"
    ],

    \"strengths\": [
        \"Good development skills\"
    ],

    \"weaknesses\": [
        \"Need more testing knowledge\"
    ],

    \"suggestions\": [
        \"Add more projects\"
    ]
}


Resume:

".$resumeText

                    ]

                ]

            ]

        );



        // Check Groq error

        if ($response->failed()) {


            return response()->json([

                "message" => "Groq API Error",

                "error" => $response->json()

            ], $response->status());


        }




        // Get AI response text

        $aiContent = $response['choices'][0]['message']['content'];



        // Convert JSON string into array

        $analysis = json_decode($aiContent, true);



        // Check JSON conversion

        if (!$analysis) {


            return response()->json([

                "message" => "AI did not return valid JSON",

                "raw_response" => $aiContent

            ]);

        }




        // Save result

        $saveAnalysis = ResumeAnalysis::create([


            "resume_id" => $resume->id,


            "ats_score" => $analysis['ats_score'] ?? null,


            "summary" => $analysis['summary'] ?? null,


            "skills" => $analysis['skills'] ?? [],


            "strengths" => $analysis['strengths'] ?? [],


            "weaknesses" => $analysis['weaknesses'] ?? [],


            "suggestions" => $analysis['suggestions'] ?? []


        ]);





        return response()->json([

            "message" => "Resume analyzed successfully",

            "analysis" => $saveAnalysis

        ]);


    }

}