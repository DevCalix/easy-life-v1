<?php

namespace App\Http\Controllers\Pharmacie;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PharmacieSante\StPharmacie;
use App\Models\PharmacieSante\PharmacieMeta;

class PharmacieMetaController extends Controller
{
    // Afficher le formulaire d'ajout d'informations supplémentaires
    public function create(StPharmacie $pharmacie)
    {
        $pharmacie->load('metas');
        return Inertia::render('PharmacieSante/Pharmacie/MetaCreate', [
            'pharmacie' => $pharmacie,
        ]);
    }

    public function store(Request $request, StPharmacie $pharmacie)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $pharmacie->metas()->create([
            'cle' => $request->titre,
            'valeur' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Information supplémentaire ajoutée avec succès.');
    }

    // Supprimer une information supplémentaire
    public function destroy(StPharmacie $pharmacie, $meta_id)
    {
        $meta = PharmacieMeta::find($meta_id);
        if (!$meta) {
            return redirect()->back()->with('error', 'Information supplémentaire introuvable.');
        }
        // dd($store->id, $meta->id, $meta);
        $meta->delete();
        return redirect()->back()->with('success', 'Information supplémentaire supprimée avec succès.');
    }

}
