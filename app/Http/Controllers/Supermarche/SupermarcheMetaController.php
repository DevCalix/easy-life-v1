<?php

namespace App\Http\Controllers\Supermarche;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Supermarche\Store;
use App\Http\Controllers\Controller;
use App\Models\Supermarche\SupermarcheMeta;

class SupermarcheMetaController extends Controller
{
    // Afficher le formulaire d'ajout d'informations supplémentaires
    public function create(Store $store)
    {
        $store->load('metas');
        return Inertia::render('Supermarche/Store/MetaCreate', [
            'store' => $store,
        ]);
    }

    public function store(Request $request, Store $store)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $store->metas()->create([
            'cle' => $request->titre,
            'valeur' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Information supplémentaire ajoutée avec succès.');
    }

    // Supprimer une information supplémentaire
    public function destroy(Store $store, $meta_id)
    {
        $meta = SupermarcheMeta::find($meta_id);
        if (!$meta) {
            return redirect()->back()->with('error', 'Information supplémentaire introuvable.');
        }
        // dd($store->id, $meta->id, $meta);
        $meta->delete();
        return redirect()->back()->with('success', 'Information supplémentaire supprimée avec succès.');
    }


}
