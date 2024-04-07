<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function getProduct()
    {
        $products = Products::all();

        return response()->json([
            $products
        ]);
    }

    public function singleProduct($id)
    {
        $singleProduct = Products::find($id);

        if (!$singleProduct){
            return response()->json([
                "message" => "Product not found"
            ]);
        }

        return response()->json([
            $singleProduct
        ]);
    }
}
