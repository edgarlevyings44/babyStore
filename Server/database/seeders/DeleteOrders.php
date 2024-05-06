<?php

namespace Database\Seeders;

use App\Models\Orders;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeleteOrders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Orders::truncate();
    }
}
