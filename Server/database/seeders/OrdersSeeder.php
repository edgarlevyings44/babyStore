<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $first_order = [
            [
                'id' => 1,
                'user_id' => 4,
                'tax' => 0,
                'total_amount' => 0,
                'updated_at' => now(),
                'created_at' => now()
            ],
        ];


        DB::table('orders')->insert($first_order);
    }
}
