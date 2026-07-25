<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resume;
use App\Models\ResumeAnalysis;
use Illuminate\Support\Facades\Http;
use Smalot\PdfParser\Parser;
use Illuminate\Support\Facades\Storage;


class ResumeController extends Controller
{

    public function upload(Request $request)
    {
// Check AI usage limit

$user = auth()->user();


// Reset credits after 24 hours

$this->resetAIUsage($user);



if($user->analysis_used >= $user->analysis_limit){

    return response()->json([

        "message" => "AI analysis limit reached. Try again after reset time."

    ],403);

}


        // Upload PDF

        $file = $request->file('resume');


        $path = $file->store(
            'resumes',
            'public'
        );



        // Save Resume Information

        $resume = Resume::create([

            "user_id" => auth()->id(),

            "file_name" => $file->getClientOriginalName(),

            "file_path" => $path

        ]);




        /*
        ==========================
        Extract PDF Text
        ==========================
        */


        try {

            $parser = new Parser();


            $pdf = $parser->parseFile(

                storage_path(
                    'app/public/'.$path
                )

            );


            $resumeText = $pdf->getText();


        } catch(\Exception $e) {


            return response()->json([

                "message" => "PDF reading failed",

                "error" => $e->getMessage()

            ],500);

        }



        // Check extracted text

        if(empty(trim($resumeText))){

            return response()->json([

                "message"=>"Could not extract text from PDF"

            ],400);

        }




        /*
        ==========================
        Send Resume To Groq AI
        ==========================
        */


        $response = Http::withHeaders([


            "Authorization" =>
            "Bearer ".env('GROQ_API_KEY'),


            "Content-Type" =>
            "application/json"


        ])
        ->timeout(120)
        ->post(

            "https://api.groq.com/openai/v1/chat/completions",

            [

                "model"=>"llama-3.3-70b-versatile",


                "messages"=>[


                    [

                        "role"=>"system",

                        "content"=>

                        "You are an expert ATS resume analyzer.
                        Analyze only the provided resume.
                        Do not create fake information.
                        Return only valid JSON."

                    ],



                    [

                        "role"=>"user",

                        "content"=>"

                        Analyze this resume.

                        Extract the actual information from this CV.

                        Return ONLY this JSON format:

                        {
                          \"ats_score\":80,
                          \"summary\":\"candidate summary\",
                          \"skills\":[],
                          \"strengths\":[],
                          \"weaknesses\":[],
                          \"suggestions\":[]
                        }


                        Resume Content:

                        ".$resumeText

                    ]

                ]

            ]

        );




        if($response->failed()){


            return response()->json([

                "message"=>"Groq AI Error",

                "error"=>$response->json()

            ],500);

        }





        /*
        ==========================
        Decode AI Response
        ==========================
        */


        $content = $response['choices'][0]['message']['content'];



        // Remove markdown JSON blocks

        $content = str_replace(
            ["```json","```"],
            "",
            $content
        );


        $aiResult = json_decode(

            trim($content),

            true

        );



        if(!$aiResult){


            return response()->json([

                "message"=>"AI JSON format error",

                "response"=>$content

            ],500);


        }





        /*
        ==========================
        Save AI Analysis
        ==========================
        */


        $analysis = ResumeAnalysis::create([


            "resume_id"=>$resume->id,


            "ats_score"=>$aiResult['ats_score'] ?? 0,


            "summary"=>$aiResult['summary'] ?? "",


            "skills"=>$aiResult['skills'] ?? [],


            "strengths"=>$aiResult['strengths'] ?? [],


            "weaknesses"=>$aiResult['weaknesses'] ?? [],


            "suggestions"=>$aiResult['suggestions'] ?? []


        ]);

        $user->increment('analysis_used');




        return response()->json([


            "message"=>"Resume uploaded and analyzed successfully",


            "resume"=>$resume,


            "analysis"=>$analysis


        ]);



    }
public function history()
{


    $resumes = Resume::where(
        'user_id',
        auth()->id()
    )
    ->with('analysis')
    ->orderBy(
        'created_at',
        'desc'
    )
    ->get();



    return response()->json([

        "message"=>"Resume history fetched successfully",

        "resumes"=>$resumes

    ]);


}

public function destroy($id)
{
    $resume = Resume::where('id', $id)
        ->where('user_id', auth()->id())
        ->first();

    if (!$resume) {
        return response()->json([
            "message" => "Resume not found"
        ], 404);
    }

    // Delete AI analysis
    ResumeAnalysis::where('resume_id', $resume->id)->delete();

    // Delete PDF
    if (Storage::disk('public')->exists($resume->file_path)) {
        Storage::disk('public')->delete($resume->file_path);
    }

    // Delete resume record
    $resume->delete();

    return response()->json([
        "message" => "Resume deleted successfully"
    ]);
}

public function usage()
{

    $user = auth()->user();


    $this->resetAIUsage($user);



    return response()->json([

        "analysis_used" => $user->analysis_used,

        "analysis_limit" => $user->analysis_limit,

        "remaining" => 
        $user->analysis_limit - $user->analysis_used,

        "reset_at" =>
        $user->analysis_reset_at

    ]);

}

private function resetAIUsage($user)
{

    if(
        !$user->analysis_reset_at ||
        now()->greaterThan($user->analysis_reset_at)
    ){

        $user->analysis_used = 0;

        $user->analysis_reset_at = now()->addHours(24);

        $user->save();

    }

}
}