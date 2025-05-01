<?php

namespace App\Http\Controllers\Managers\Supermarche;

use App\Http\Controllers\Controller;
use App\Models\Supermarche\Store;
use App\Models\Supermarche\SupermarcheMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpMetaController extends Controller
{
    // Afficher le formulaire d'ajout d'informations supplémentaires
    public function create($id)
    {
        $store = Store::find($id);
        $store->load('metas');
        return Inertia::render('Managers/Supermarche/Store/MetaCreate', [
            'store' => $store,
        ]);
    }

    public function store(Request $request, $id)
    {
        $store = Store::find($id);
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
