<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;
use App\Mail\ForgotPassword;

class UserController extends Controller
{
    public function createUser(Request $request)
    {


        request()->validate([
            'firstname' => 'required|min:4|max:20|string',
            'lastname' => 'required|min:4|max:20|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|max:50|string|'
        ]);

    
        $user = User::create([
            'firstname' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'), 
            'password' => Hash::make($request->input('password')),
            'user_type' => 0
        ]);


    

        return $user;


    }

    public function login(Request $request)
    {
        
        request()->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:8|max:50|string'
        ]);


        if (!Auth::attempt($request->only('email', 'password'))){
            return response()->json([
                "message" => "Invalid credentials",
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();


        $request->session()->put('user_id', $user->id);

        $token = $user->createToken("user_token")->accessToken;



        return response()->json([
            "Token" => $token,
            "User" => $user,
        ]);
    }


    public function profile($id)
    {
        $user = Auth::user();
        
        if ($user->id !== $id){
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized access'
            ], 403);
        }

        $user_info = User::find($id);

        return response()->json([
            "status" => true,
            "Message" => "Profile Information",
            "User" => $user_info
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

            $userExist->remember_token = Str::random(30);

            $userExist->save();

            Mail::to($userExist->email)->send(new ForgotPassword($userExist));

            return response()->json([
                "message" => "Please check your email",
                "User" => $userExist
            ]);

        } else{
            return response()->json([
                "message" => "User doesn't exist"
            ]);
        }
    }


    public function allUser()
    {
        $users = User::with('roles')->get();

        return response()->json($users);
    }

    public function singleCustomer($id)
    {
        $singleCustomer = User::find($id);

        if (!$singleCustomer){
            return response()->json([
                'message' => 'User not found'
            ]);
        }

        return response()->json(
            $singleCustomer
        );
    }

    public function editUser(Request $request)
    {
        $userExist = User::where('email', $request->input('email'))->first();

        if ($userExist){
            $userExist->firstname = $request->input('firstname');
            $userExist->lastname = $request->input('lastname');
            $userExist->email = $request->input('email');
            $userExist->password = $request->input('password');

            $userExist->save();

            return response()->json([
                'message' => 'user details updated',
                'User' => $userExist
            ]);
        }else{
            return response()->json([
                'message' => 'User not found'
            ]);
        }
    }

    public function deleteUser($id)
    {
        $user = User::find($id);

        $user->delete();

        return response()->json([
            'messages' => 'user deleted'
        ]);
    }
}
