<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Invoice;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $clients = Client::count();
        $invoices = Invoice::count();
        $paidInvoices = Invoice::where('status', 'paid')->count();

        $stats = [
          'totalClients' => $clients,
          'totalInvoices' => $invoices,
          'totalPaidInvoices' => $paidInvoices
        ];


        return Inertia::render('dashboard', compact('stats'));
    }
}
