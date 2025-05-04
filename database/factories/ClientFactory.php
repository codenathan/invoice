<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<Client>
 */
class ClientFactory extends Factory
{
    protected $model = Client::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'address_line_1' => fake()->streetAddress(),
            'address_line_2' => '',
            'city' => fake()->city(),
            'state' => '',
            'postal_code' => fake()->postcode(),
            'notes' => ''
        ];
    }
}
