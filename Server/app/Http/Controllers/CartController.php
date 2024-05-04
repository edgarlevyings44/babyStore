<?php

namespace App\Http\Controllers;

use App\Models\Cart;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function getAllCartItems()
    {
        $cartItems = Cart::all();

        return response()->json(
            $cartItems
        );
    }

    public function getAllCartItemsByUserId($userId)
    {
        $cartItems = Cart::where('user_id', $userId)->get();
        return response()->json(
            $cartItems
        );
    }

    public function addItemToCart(Request $request)
    {
      $request->validate([
        'user_id' => 'required|exists:users,id',
        'product_id' => 'required|exists:products,id',
        'quantity' => 'required|integer|min:1',
      ]);

      $cartItem = Cart::create($request->all());

        return response()->json([
            "Message" => "Added an Item to cart"
        ], 201);
    }

    public function editCartItem(Request $request)
    {
       $cartItem = Cart::findOrFail($id);

       $request->validate([
        'quantity' => ['required', 'integer', 'min:1'],
       ]);

       $cartItem->update($request->all());
       return response()->json($cartItem, 200);
    }

    public function deleteCartItem($id)
    {
        $cartItem = Cart::findOrFail($id);

        $cartItem->delete();

        return response()->json([
            'message' => 'Cart deleted'
        ], 204);
    }
}
