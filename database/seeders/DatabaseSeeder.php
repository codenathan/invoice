<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Invoice;
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

        $clients = Client::factory(20)->create();

        $invoices = collect();

        for ($i = 0; $i < 20; $i++) {
            $invoice = Invoice::factory()->create([
                'client_id' => $clients->random()->id,
            ]);

            // Create 1–5 invoice items
            InvoiceItem::factory(rand(1, 5))->create([
                'invoice_id' => $invoice->id,
            ]);

            // Create 0–2 payments
            Payment::factory(rand(0, 2))->create([
                'invoice_id' => $invoice->id,
            ]);

            $invoices->push($invoice);
        }


    }
}
