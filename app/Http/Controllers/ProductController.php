<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Provider;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $clients = Client::all();
        $providers = Provider::all();
        $products = Product::with(['client', 'provider'])->get();

        return Inertia::render('Products', [
            'clients' => $clients,
            'providers' => $providers,
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'marca' => 'required|string',
            'modelo' => 'required|string',
            'serialNumber' => 'required|string',
            'tipoEquipo' => 'required|string|in:notebook,desktop,aio,monitor',
            'cliente_id' => 'required|exists:clients,id',
            'provider_id' => 'required|exists:providers,id',
            'observaciones' => 'nullable|string',
        ]);

        $product = Product::create($validatedData);

        return response()->json($product);
    }
}