<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = Client::all();

        return Inertia::render('client/index', ['clients' => $clients]);
    }

    public function create(): Response
    {
        return Inertia::render('client/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'address_line_1' => 'string|nullable',
            'address_line_2' => 'string|nullable',
            'city' => 'string|nullable',
            'state' => 'string|nullable',
            'postal_code' => 'string|nullable',
            'notes' => 'string|nullable'
        ]);

        Client::create($data);

        return to_route('client.index');
    }
}
