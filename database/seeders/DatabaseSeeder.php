<?php

namespace Database\Seeders;

use App\Models\InvoiceItem;
use App\Models\Payment;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Sakees',
            'email' => 'sakees@codenathan.com',
            'password' => Hash::make('vL6E6sEb5*ZUe8W%OEf7'),
        ]);

         User::factory(10)->create();

         InvoiceItem::factory(10)->create();

         Payment::factory(10)->create();


    }
}
