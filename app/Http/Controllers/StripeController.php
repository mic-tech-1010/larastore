<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StripeController extends Controller
{

    public function success() {

    }

    public function failure() {

    }

    public function webhook(Request $request)
    {
        // Handle Stripe webhook events here
    }
}
