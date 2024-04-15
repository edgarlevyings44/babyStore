<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function createUser(Request $request)
    {
        $validator = Validator::make($request->only('firstname', 'lastname', 'email', 'password', 'user_type'),[
            'firstname' => ['required', 'min:2', 'max:50', 'string'],
            'lastname' => ['required', 'min:2', 'max:50', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8', 'max:255', 'string']
        ]);

        if($validator->fails())
        {
            return response()->json($validator->errors(), 400);
        }


        $user = User::create([
            'firstname' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'user_type' => $request->input('user_type')
        ]);


        return response()->json([
            "status" => 200,
            "message" => "User created",
            "User Details" => $user,
            "User" => [
                'user Type' => $user->user_type
            ]
        ]);


    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->only('email', 'password'), [
            'email' => ['required', 'email', 'exists:users,email'],
            'password' => ['required', 'min:8', 'max:255', 'string']
        ]);

        if ($validator->fails())
        {
            return response()->json($validator->errors(), 400);
        }

        if (!Auth::attempt($request->only('email', 'password'))){
            return response()->json([
                "message" => "Invalid credentials",
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();


        $request->session()->put('user_id', $user->id);

        $token = $user->createToken("user_token")->accessToken;

        return response()->json([
            "message" => "Logged in",
            "Token" => $token,
            "User" => $user,
        ]);
    }


    public function profile()
    {
        $user = Auth::user();

        return response()->json([
            "status" => true,
            "Message" => "Profile Information",
            "User" => $user
        ]);
    }

    public function logout(Request $request)
    {

        $request->session()->forget('user_id');

        auth()->user()->token()->revoke();

        return response()->json([
            "message" => "Logged Out"
        ]);
    }

    public function forgotPassword(Request $request)
    {

        $userExist = User::where('email', $request->input('email'))->first();

        if ($userExist){

            $userExist->password = Hash::make($request->input('password'));

            $userExist->save();

            return response()->json([
                "message" => "Password changed",
                "User" => $userExist
            ]);

        } else{
            return response()->json([
                "message" => "User doesn't exist"
            ]);
        }
    }
}
