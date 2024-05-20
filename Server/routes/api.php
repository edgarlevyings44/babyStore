<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\SelectedProductsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MpesaController;
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




Route::get('/products', [ProductsController::class, 'getProduct']);
Route::get('/products/{id}', [ProductsController::class, 'singleProduct']);

Route::post('/register', [UserController::class, 'createUser']);
Route::post('/login', [UserController::class, 'login']);



Route::group([
    "middleware" => ["auth:api"]
], function(){
    Route::get('/profile/{id}', [UserController::class, 'profile']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::put('/forgot', [UserController::class, 'forgotPassword']);
    Route::post('/order', [OrderController::class, 'createOrder']);
    Route::post('/addcart', [SelectedProductsController::class, 'create']);
    
    
    
});


Route::group([
    "middleware" => ["auth:api", "admin"]
], function(){
    Route::get('/admin/products', [ProductsController::class, 'getproduct']);
    Route::post('/admin/addproduct', [ProductsController::class, 'addProduct']);
    Route::get('/admin/users', [UserController::class,'allUser']);
    Route::get('/admin/singlecustomer/{id}', [UserController::class, 'singleCustomer']);
    Route::put('admin/updateuser', [UserController::class, 'editUser']);
    Route::delete('/admin/deleteuser/{id}', [UserController::class, 'deleteUser']);
    Route::delete('/admin/deleteproduct/{id}', [ProductsController::class, 'deleteProduct']);
    Route::put('/admin/updateproduct', [ProductsController::class,'editProduct']);

    //orders
    Route::get('/number', [OrderController::class, 'numberOfOrders']);
});

// Mpesa
Route::get('/mpesa/access-token', [MpesaController::class, 'getAccessToken']);
Route::post('/mpesa/stk-push', [MpesaController::class, 'stkPush']);






