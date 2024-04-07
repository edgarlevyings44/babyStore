<?php

use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    "middleware" => ["auth:api"]
], function(){
    Route::get('/profile', [UserController::class, 'profile']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::put('/forgot', [UserController::class, 'forgotPassword']);
});


Route::get('/products', [ProductsController::class, 'getProduct']);
Route::get('/products/{id}', [ProductsController::class, 'singleProduct']);

Route::post('/createuser', [UserController::class, 'createUser']);
Route::post('/login', [UserController::class, 'login']);

