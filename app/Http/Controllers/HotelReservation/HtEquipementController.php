<?php

namespace App\Http\Controllers\HotelReservation;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\HotelReservation\HtEquipement;

class HtEquipementController extends Controller
{
    // Lister tous les équipements
    public function index()
    {
        $equipements = HtEquipement::all();
        return response()->json($equipements);
    }

    // Ajouter un nouvel équipement
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|unique:ht_equipements,nom',
        ]);

        $equipement = HtEquipement::create([
            'nom' => $request->nom,
        ]);

        return response()->json($equipement, 201);
    }
}
