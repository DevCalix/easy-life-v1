<?php

namespace App\Http\Controllers\Supermarche;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Supermarche\Store;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Supermarche\StoreRequest;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stores = Store::all();
        return Inertia::render('Supermarche/Store/IndexStore', [
            'stores' => $stores,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Supermarche/Store/CreateStore');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        // Validation des données via StoreRequest
        $validated = $request->validated();

        // Gestion de l'upload de l'image si elle est présente
        if ($request->hasFile('photo_store')) {
            $path = $request->file('photo_store')->store('supermarche/stores', 'public');
            // $validated['photo_store'] = Storage::url($path); // Génère l'URL publique de l'image
            $validated['photo_store'] = $path;
        }

        // Création du store dans la base de données
        $store = Store::create($validated);

        // Redirection avec un message de succès
        return redirect()->route('stores.create')
            ->with('success', 'Magasin ajouté avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Store $store)
    {
        $store->load('metas');
        // Récupérer les produits associés au magasin
        $produits = $store->produits()
        ->with('categories', 'tags',) // Charger les relations
        ->where('produits.statut', 'actif')
        ->select('produits.id', 'produits.nom', 'produits.slug', 'produits.prix', 'produits.pourcentage_reduction', 'produits.image_principale')
        ->get();

        // Retourner la vue Inertia avec les données
        return Inertia::render('Supermarche/ProduitsParStore', [
            'store' => $store,
            'produits' => $produits,
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Store $store)
    {
        // $store = Store::findOrFail($id);
        return Inertia::render('Supermarche/Store/EditStore', [
            'store' => $store,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, string $id)
    {
        $store = Store::findOrFail($id);

        // Validation des données entrantes
        $validated = $request->validated();

        // Gestion de l'upload de l'image
        if ($request->hasFile('photo_store')) {
            $path = $request->file('photo_store')->store('supermarche/stores', 'public');
            $validated['photo_store'] = Storage::url($path);
        }

        // Mise à jour du store
        $store->update($validated);

        return redirect()->route('stores.index')
            ->with('success', 'Store mis à jour avec succès.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $store = Store::findOrFail($id);
        $store->delete();

        return redirect()->route('stores.index')
            ->with('success', 'Store supprimé avec succès.');
    }

    public function updateImage(Request $request, Store $store)
    {
        $request->validate([
            'photo_store' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('photo_store')) {
            // Supprimer l'ancienne image si elle existe
            if ($store->photo_store) {
                Storage::disk('public')->delete($store->photo_store);
            }

            // Enregistrer la nouvelle image
            $path = $request->file('photo_store')->store('supermarche/stores', 'public');
            $store->photo_store = $path;
            $store->save();
        }

        return redirect()->back()->with('success', 'Image mise à jour avec succès.');
    }

    public function fetchStore()
    {
        return response()->json(Store::all());
    }
}
