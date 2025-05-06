<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index(Invoice $invoice)
    {
        $payments = $invoice->payments;

        return Inertia::render('invoice/payment', [
            'invoice' => $invoice,
            'payments' => $payments
        ]);
    }

    public function store(Request $request, Invoice $invoice)
    {
        $request->validate([
            'date' => 'required|date',
            'amount' => 'required|numeric',
            'description' => 'required|string'
        ]);

        $payment = new Payment();
        $payment->invoice()->associate($invoice);
        $payment->fill($request->all());
        $payment->save();

        return to_route('invoice.payment', $payment->invoice)->with('success', 'Payment created successfully.');
    }

    public function update(Request $request, Payment $payment)
    {
        $request->validate([
            'date' => 'required|date',
            'amount' => 'required|numeric',
            'description' => 'required|string'
        ]);

        $payment->update($request->all());

        return to_route('invoice.payment', $payment->invoice)->with('success', 'Payment updated successfully.');
    }

    public function destroy(Payment $payment)
    {
        $invoice = $payment->invoice;
        $payment->delete();

        return to_route('invoice.payment', $invoice)->with('success', 'Payment deleted successfully.');
    }
}
