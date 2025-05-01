<?php

namespace App\Http\Controllers\Managers\Supermarche;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProduitRequest;
use App\Models\Supermarche\Categorie;
use App\Models\Supermarche\Produit;
use App\Models\Supermarche\Store;
use App\Models\Supermarche\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SpProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * Affiche la liste des produits.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $user = auth()->user();

        // Récupérer tous les store_id dont l'utilisateur est gestionnaire
        $storeIds = $user->services()
            ->where('service_type', Store::class)
            ->pluck('service_id');

        // Récupérer uniquement les produits liés à ces magasins
        $produits = Produit::with(['categories', 'tags', 'store'])
            ->whereIn('store_id', $storeIds)
            ->get();

        // Passer les données à Inertia
        return Inertia::render('Managers/Supermarche/Produits/Index', [
            'produits' => $produits,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('Managers/Supermarche/Produits/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProduitRequest $request)
    {
        // dd($request->validated());
        // Les données sont automatiquement validées avant d'arriver ici
        $validated = $request->validated();

        // Gestion de l'image principale
        if ($request->hasFile('image_principale')) {
            $path = $request->file('image_principale')->store('supermache/produits/image_principale', 'public');
            $validated['image_principale'] = $path;
        }

        // Création du produit
        $produit = Produit::create($validated);

        // Association des relations
        if (!empty($validated['category_id'])) {
            $produit->categories()->attach($validated['category_id']);
        }

        if (!empty($validated['tags'])) {
            $produit->tags()->attach($validated['tags']);
        }

        // Retourner une réponse
        return redirect()
            ->route('mds-produits.index')
            ->with('success', 'Produit ajouté avec succès.');
    }

    /**
     * Display the specified resource.
     */
    // Affiche la page du produit
    public function show(Produit $produit)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {   
        $produit = Produit::findOrFail($id);	
        // Récupérer toutes les catégories, tags et stores
        $categories = Categorie::all();
        $tags = Tag::all();
        $stores = Store::all();

        // Charger les relations nécessaires
        $produit->load('categories', 'tags', 'store');
        return Inertia::render('Managers/Supermarche/Produits/Edit', [
            'produit' => $produit,
            'categories' => $categories,
            'tags' => $tags,
            'stores' => $stores, // Passer les magasins à la vue
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreProduitRequest $request, $id)
    {
        $produit = Produit::findOrFail($id);
        // Les données sont automatiquement validées avant d'arriver ici
        $validated = $request->validated();
        // Gestion de l'image principale
        if ($request->hasFile('image_principale')) {
            $path = $request->file('image_principale')->store('produits', 'public');
            $validated['image_principale'] = $path;
        }

        // Mise à jour du produit

        $produit->update($validated);

        // Synchronisation des relations
        if (!empty($validated['category_id'])) {
            $produit->categories()->sync([$validated['category_id']]); // Remplace les catégories existantes par la nouvelle
        } else {
            $produit->categories()->detach(); // Supprime toutes les catégories si aucun ID n'est fourni
        }

        if (!empty($validated['tags'])) {
            $produit->tags()->sync($validated['tags']); // Remplace les tags existants par les nouveaux
        } else {
            $produit->tags()->detach(); // Supprime tous les tags si aucun n'est fourni
        }
        // Retourner une réponse
        return redirect()
            ->route('mds-produits.index')
            ->with('success', 'Produit mis à jour avec succès.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
            $produit = Produit::findOrFail($id);
            $produit->delete();

            return redirect()->route('mds-produits.index')->with('success', 'Produit supprimé avec succès.');

    }


    public function editImage($id)
    {
        $produit = Produit::findOrFail($id);
        // Renvoyer la vue avec les données du produit
        return Inertia::render('Managers/Supermarche/Produits/EditImage', [
            'produit' => $produit,
            'appUrl' => config('app.url'),
        ]);
    }
    public function updateImage(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);
        // dd($request->file('image_principale'));
        // Valider uniquement l'image
        $request->validate([
            'image_principale' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Supprimer l'ancienne image si elle existe
        if ($produit->image_principale) {
            Storage::disk('public')->delete($produit->image_principale);
        }

        // Enregistrer la nouvelle image
        $imagePath = $request->file('image_principale')->store('produits', 'public');

        // Mettre à jour uniquement le champ `image_principale`
        $produit->update([
            'image_principale' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Image mise à jour avec succès.');
    }
}
