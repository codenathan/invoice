<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = Client::withCount('invoices')->orderBy('name')->paginate(10);

        return Inertia::render('client/index', ['clients' => $clients]);
    }

    public function create(): Response
    {
        return Inertia::render('client/create');
    }

    public function store(Request $request): RedirectResponse
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

        return to_route('client.index')
                ->with('success', 'Client created successfully.');
    }

    public function edit(Client $client): Response
    {
        return Inertia::render('client/edit', ['client' => $client]);
    }

    public function update(Request $request, Client $client): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'address_line_1' => 'string|nullable',
            'address_line_2' => 'string|nullable',
            'city' => 'string|nullable',
            'state' => 'string|nullable',
            'postal_code' => 'string|nullable',
            'notes' => 'string|nullable'
        ]);

        $client->update($request->all());

        return to_route('client.index')
                ->with('success', 'Client updated successfully.');
    }

    public function destroy(Client $client): RedirectResponse
    {
        $client->delete();

        return to_route('client.index')
                ->with('success', 'Client deleted successfully.');
    }
}
