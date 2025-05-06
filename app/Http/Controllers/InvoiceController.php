<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    public function index(): Response
    {
        $query = Invoice::with('client')->orderByDesc('date');

        if (request()->has('filter') && request('filter') !== 'all') {
            $query->where('status', request('filter'));
        }

        $invoices = $query->paginate(10);

        return Inertia::render('invoice/index', [
            'invoices' => $invoices,
            'filter' => request('filter', 'all')
        ]);
    }

    public function create(): Response
    {
        $clients = Client::orderBy('name')->get(['id', 'name']);

        return Inertia::render('invoice/create', [
            'clients' => $clients
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
           'date' => 'required',
           'client_id' => 'required',
           'items' => 'required',
           'status' => 'required'
        ]);

        $invoice = new Invoice();
        $invoice->client()->associate($request->get('client_id'));
        $invoice->date = $request->get('date');
        $invoice->status = $request->get('status');
        $invoice->save();

        $invoice->items()->createMany($request->get('items'));

        return to_route('invoice.index')->with('success', 'Invoice created successfully.');
    }

    public function edit(Invoice $invoice): Response
    {
        $clients = Client::orderBy('name')->get(['id', 'name']);
        $invoice->load('items');
        $invoice->load('payments');
        return Inertia::render(
            'invoice/edit',
            ['invoice' => $invoice, 'clients' => $clients]
        );
    }

    public function update(Request $request, Invoice $invoice): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
           'date' => 'required',
           'client_id' => 'required',
           'items' => 'required',
           'status' => 'required'
        ]);

        $invoice = new Invoice();
        $invoice->client()->associate($request->get('client_id'));
        $invoice->date = $request->get('date');
        $invoice->status = $request->get('status');
        $invoice->save();

        $invoice->items()->delete();
        $invoice->items()->createMany($request->get('items'));

        return to_route('invoice.index')->with('success', 'Invoice updated successfully.');
    }


}
