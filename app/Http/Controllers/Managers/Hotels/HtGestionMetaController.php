<?php

namespace App\Http\Controllers\Managers\Hotels;

use App\Http\Controllers\Controller;
use App\Models\HotelReservation\HtHotel;
use App\Models\HotelReservation\HtHotelMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HtGestionMetaController extends Controller
{
    // Afficher le formulaire d'ajout d'informations supplémentaires
    public function create( $id)
    {
        $hotel = HtHotel::find($id);
        $hotel->load('metas');
        return Inertia::render('Managers/Hotels/Hotels/MetaCreate', [
            'hotel' => $hotel,
        ]);
    }

    public function store(Request $request, HtHotel $hotel)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $hotel->metas()->create([
            'cle' => $request->titre,
            'valeur' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Information supplémentaire ajoutée avec succès.');
    }

    // Supprimer une information supplémentaire
    public function destroy(HtHotel $hotel, $meta_id)
    {
        $meta = HtHotelMeta::find($meta_id);
        // dd($meta);
        if (!$meta) {
            return redirect()->back()->with('error', 'Information supplémentaire introuvable.');
        }
        // dd($hotel->id, $meta->id, $meta);
        $meta->delete();
        return redirect()->back()->with('success', 'Information supplémentaire supprimée avec succès.');
    }
}
