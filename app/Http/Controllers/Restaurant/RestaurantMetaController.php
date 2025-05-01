<?php

namespace App\Http\Controllers\Restaurant;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Restaurant\Restaurant;
use App\Models\Restaurant\RestaurantMeta;

class RestaurantMetaController extends Controller
{
    // Afficher le formulaire d'ajout d'informations supplémentaires
    public function create(Restaurant $restaurant)
    {
        $restaurant->load('metas');
        return Inertia::render('CommandeRepas/Restaurant/MetaCreate', [
            'restaurant' => $restaurant,
        ]);
    }

    public function store(Request $request, Restaurant $restaurant)
    {
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
    public function destroy(Restaurant $restaurant, $meta_id)
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
