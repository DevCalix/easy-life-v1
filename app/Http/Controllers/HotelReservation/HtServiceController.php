<?php

namespace App\Http\Controllers\HotelReservation;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\HotelReservation\HtService;

class HtServiceController extends Controller
{
    // Lister tous les services
    public function index()
    {
        $services = HtService::all();
        return response()->json($services);
    }

    // Ajouter un nouveau service
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|unique:ht_services,nom',
        ]);

        $service = HtService::create([
            'nom' => $request->nom,
        ]);

        return response()->json($service, 201);
    }
}
