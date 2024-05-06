<?php

namespace App\Http\Controllers;

use App\Models\SelectedGoods;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SelectedProductsController extends Controller
{
    public function create(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;

        $product_id = $request->input('product_id');
        $existingProduct = SelectedGoods::where('user_id', $user_id)->where('product_id', $product_id)->first();

        if($existingProduct){
            $existingProduct->quantity += 1;
            $existingProduct->save();

            return response()->json($existingProduct);
        }else{
            $newProduct = SelectedGoods::create([
                'user_id' => $user_id,
                'product_id' => $product_id,
                'name' => $request->input('name'),
                'price' => $request->input('price'),
                'quantity' => $request->input('quantity')
            ]);

            return response()->json($newProduct);
        }
    }
}
