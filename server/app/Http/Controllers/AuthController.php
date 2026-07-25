<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(Request $request)
    {

        $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:6'
        ]);


        $user = User::create([

            'name'=>$request->name,

            'email'=>$request->email,

            'password'=>Hash::make($request->password)

        ]);


        return response()->json([

            'message'=>'User created successfully',

            'user'=>$user

        ]);

    }



    public function login(Request $request)
    {

        $request->validate([

            'email'=>'required',

            'password'=>'required'

        ]);


        $user = User::where(
            'email',
            $request->email
        )->first();



        if(!$user || !Hash::check(
            $request->password,
            $user->password
        )){


            return response()->json([

                'message'=>'Invalid login details'

            ],401);


        }



        $token = $user->createToken(
            'auth_token'
        )->plainTextToken;



        return response()->json([

            'message'=>'Login successful',

            'token'=>$token,

            'user'=>$user

        ]);

    }

}