<?php

namespace App\Http\Controllers\Pharmacie;

use App\Http\Controllers\Controller;
use App\Models\PharmacieSante\PharmacieMeta;
use App\Models\PharmacieSante\StPharmacie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StPharmaMetaController extends Controller
{
    
    // Afficher le formulaire d'ajout d'informations supplémentaires
    public function create($id)
    {
        $pharmacie = StPharmacie::find($id);
        $pharmacie->load('metas');
        return Inertia::render('Managers/PharmacieSante/Pharmacie/MetaCreate', [
            'pharmacie' => $pharmacie,
        ]);
    }

    public function store(Request $request, $id)
    {
        $pharmacie = StPharmacie::find($id);
        
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
    public function destroy($id, $meta_id)
    {
        $pharmacie = StPharmacie::find($id);
        $meta = PharmacieMeta::find($meta_id);
        if (!$meta) {
            return redirect()->back()->with('error', 'Information supplémentaire introuvable.');
        }
        // dd($store->id, $meta->id, $meta);
        $meta->delete();
        return redirect()->back()->with('success', 'Information supplémentaire supprimée avec succès.');
    }
}
