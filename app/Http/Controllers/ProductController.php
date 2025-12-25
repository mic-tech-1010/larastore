<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductListResource;
use Illuminate\Http\Request;
use App\Models\Product;
use Laravel\Fortify\Features;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()
            ->published()
            ->paginate(12);

        return Inertia::render('Home', [
            'canRegister' => Features::enabled(Features::registration()),
            'products' => ProductListResource::collection($products)
        ]);
    }

    public function show (Product $product)
    {

    }
}
