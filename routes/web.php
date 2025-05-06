<?php

use App\Http\Controllers\BusinessSettingController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\InvoicePdfController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('client', ClientController::class);
    Route::resource('invoice', InvoiceController::class);

    Route::get('invoice/{invoice}/pdf', InvoicePdfController::class)->name('invoice.pdf');

    Route::get('invoice/{invoice}/payment', [PaymentController::class, 'index'])->name('invoice.payment');
    Route::post('invoice/{invoice}/payment', [PaymentController::class, 'store'])->name('payment.store');
    Route::delete('payment/{payment}', [PaymentController::class, 'destroy'])
        ->name('payment.destroy');
    Route::patch('payment/{payment}', [PaymentController::class, 'update'])->name('payment.update');

    Route::get('business-setting', [BusinessSettingController::class, 'index'])->name('business-setting.index');
    Route::patch('business-setting', [BusinessSettingController::class, 'update'])->name('business-setting.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
