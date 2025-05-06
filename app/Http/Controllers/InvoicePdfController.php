<?php

namespace App\Http\Controllers;

use App\Models\BusinessSetting;
use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class InvoicePdfController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Invoice $invoice)
    {
        $data = [
            'invoice' => $invoice,
            'client' => $invoice->client,
            'businessSetting' => BusinessSetting::first(),
        ];

        $pdf = Pdf::loadView('pdfs.invoice',$data );


        return $pdf->download('invoice_'.$invoice->id.'.pdf');
    }
}
