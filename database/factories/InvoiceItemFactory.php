<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InvoiceItem>
 */
class InvoiceItemFactory extends Factory
{
    protected $model = InvoiceItem::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = fake()->numberBetween(1, 10);
        $rate = fake()->numberBetween(100, 1000);
        $amount = $quantity * $rate;

        return [
            'invoice_id' => Invoice::factory(),
            'description' => fake()->sentence(),
            'quantity' => $quantity,
            'rate' => $rate,
            'amount' => $amount,
        ];
    }
}
