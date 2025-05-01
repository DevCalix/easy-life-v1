<?php

namespace App\Http\Controllers\Managers\Restau;

use App\Http\Controllers\Controller;
use App\Models\Restaurant\Restaurant;
use App\Models\Restaurant\RestaurantMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RestauMetaController extends Controller
{
    // Afficher le formulaire d'ajout d'informations supplémentaires
    public function create($randomId)
    {
        $restaurant = Restaurant::where('random_id', $randomId)->first();
        $restaurant->load('metas');
        return Inertia::render('Managers/Restaurant/MetaCreate', [
            'restaurant' => $restaurant,
        ]);
    }

    public function store(Request $request, $randomId)
    {
        $restaurant = Restaurant::where('random_id', $randomId)->first();
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $restaurant->metas()->create([
            'cle' => $request->titre,
            'valeur' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Information supplémentaire ajoutée avec succès.');
    }

    // Supprimer une information supplémentaire
    public function destroy($randomId, $meta_id)
    {
        $meta = RestaurantMeta::find($meta_id);
        if (!$meta) {
            return redirect()->back()->with('error', 'Information supplémentaire introuvable.');
        }
        // dd($store->id, $meta->id, $meta);
        $meta->delete();
        return redirect()->back()->with('success', 'Information supplémentaire supprimée avec succès.');
    }
}
