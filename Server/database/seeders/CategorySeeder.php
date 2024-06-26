<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categories::create(['name' => 'car_seats']);
        Categories::create(['name' => 'feeding']);
        Categories::create(['name' => 'gifts']);
        Categories::create(['name' => 'strollers']);
    }
}
