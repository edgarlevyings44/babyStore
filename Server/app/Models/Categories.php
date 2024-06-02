<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Categories extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'name'
    ];

    public function products()
    {
        $this->hasMany(Products::class);
    }

    public function toSearchableArray()
    {
        return [ 
            'name' => $this->name,
            'id' => $this->id
        ];
    }

}
