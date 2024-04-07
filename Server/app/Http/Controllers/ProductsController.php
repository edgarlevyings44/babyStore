<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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


    //Admin add products

    public function addProduct(Request $request)
    {
        $validator = Validator::make($request->only('name', 'description', 'image_url', 'price','quantity', 'category'),[
            'name' => ['required', 'max:50', 'string'],
            'description' => ['required', 'string'],
            'image_url' => ['required', 'string'],
            'price' => ['required', 'integer'],
            'quantity' => ['required', 'integer'],
            'category' => ['required', 'string']
        ]);

        if ($validator->fails())
        {
            return response()->json([
                $validator->errors()
            ]);
        }

        $product = Products::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'image_url' => $request->input('image_url'),
            'price' => $request->input('price'),
            'quantity' => $request->input('quantity'),
            'category' => $request->input('category')
        ]);

        return response()->json([
            "Message" => "Product Added"
        ]);
    }
}
