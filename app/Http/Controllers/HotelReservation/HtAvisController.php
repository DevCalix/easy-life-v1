<?php

namespace App\Http\Controllers\HotelReservation;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\HotelReservation\HtAvis;
use App\Models\HotelReservation\HtHotel;

class HtAvisController extends Controller
{
    // Afficher le formulaire de création d'avis
    public function create(HtHotel $hotel)
    {
        return Inertia::render('HotelReservation/Avis/AvisForm', [
            'hotel' => $hotel,
        ]);
    }

    // Enregistrer un nouvel avis
    public function store(Request $request, HtHotel $hotel)
    {
        // Valider les données
        $request->validate([
            'note' => 'required|numeric|min:1|max:5',
            'commentaire' => 'required|string|max:1000',
        ]);

        // Créer l'avis
        HtAvis::create([
            'ht_hotel_id' => $hotel->id,
            'user_id' => Auth::id(), // Utilisateur connecté
            'note' => $request->note,
            'commentaire' => $request->commentaire,
        ]);

        // Rediriger avec un message de succès
        return redirect()->back()->with('success', 'Votre avis a été enregistré avec succès !');
    }
}
