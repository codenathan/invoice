<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    public function index(): Response
    {
        $invoices = Invoice::with('client')->orderByDesc('date')->paginate(10);

        return Inertia::render('invoice/index', ['invoices' => $invoices]);
    }
}
