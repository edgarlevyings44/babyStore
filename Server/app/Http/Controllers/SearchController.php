<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\User;
use App\Models\Categories;


class SearchController extends Controller
{
    public function searchAllModels(Request $request)
    {
        $query = $request->input('query');

        $products = Products::search($query)->get();
        $users = User::search($query)->get();
        $Catergories = Categories::search($query)->get();

        $results = [
            'products' => $products,
            'users' => $users,
            'Catergories' => $Catergories
        ];

        return response()->json(
            $results
        );
    }

    public function searchProducts(Request $request)
    {
        $query = $request->input('query');

        $products = Products::search($query)->get();

        return response()->json(
            $products
        );
    }
}