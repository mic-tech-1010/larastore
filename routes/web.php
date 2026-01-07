<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StripeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Guest Routes
Route::get('/', [ProductController::class, 'index'])->name('home');

Route::get('/product/{product:slug}', [ProductController::class, 'show'])->name('product.show');

Route::controller(CartController::class)->group(function () {
    Route::get('/cart', 'index')->name('cart.index');
    Route::post('/cart/add/{product}', 'store')->name('cart.store');
    Route::put('/cart/{product}', 'update')->name('cart.update');
    Route::delete('/cart/{product}', 'destroy')->name('cart.destroy');
});

Route::post('/stripe/webhook', [StripeController::class, 'webhook'])
    ->name('stripe.webhook');

// Auth routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::post('/cart/checkout', [CartController::class, 'checkout'])
        ->name('cart.checkout');

    Route::get('stripe/success', [StripeController::class, 'success'])
        ->name('stripe.success');

    Route::get('stripe/failure', [StripeController::class, 'failure'])
        ->name('stripe.failure');
});

require __DIR__ . '/settings.php';
