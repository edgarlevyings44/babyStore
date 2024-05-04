<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image_url',
        'quantity',
        'category_id',
    ];

    public function user ()
    {
        return $this->belongsTo(User::class);
    }

    public function product ()
    {
        return $this->belongsTo(Product::class);
    }
}
