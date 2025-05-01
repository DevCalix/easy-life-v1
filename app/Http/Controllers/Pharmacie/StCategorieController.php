<?php

namespace App\Http\Controllers\Pharmacie;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\PharmacieSante\StCategorie;
use App\Http\Requests\PharmacieSante\StoreStCategorieRequest;

class StCategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Récupérer toutes les catégories existantes
        $categories = StCategorie::all();
        return Inertia::render('PharmacieSante/Categories/CreateCategorie', [
            'categories' => $categories,
        ]);
    }

    /**
     * Enregistre une nouvelle catégorie dans la base de données.
     */
    public function store(StoreStCategorieRequest $request)
    {
        // Valider les données du formulaire
        $validatedData = $request->validated();

        // Gérer l'upload de l'image principale
        if ($request->hasFile('image_principale')) {
            $imagePath = $request->file('image_principale')->store('pharmacie-sante/medoc-categories', 'public');
            $validatedData['image_principale'] = $imagePath;
        }

        // Créer une nouvelle instance de StCategorie avec les données validées
        StCategorie::create($validatedData);

        // Rediriger vers la liste des catégories avec un message de succès
        return redirect()->route('medoc-categorie.create')
                         ->with('success', 'La catégorie a été créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Supprimer un hôtel et toutes ses images associées.
     */
    public function destroy(string $id)
    {
        try {
            // Trouver l'hôtel par son ID
        $categorie = StCategorie::findOrFail($id);

        // Supprimer l'ancienne image si elle existe
        if ($categorie->image_principale) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $categorie->image_principale);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Supprimer l'hôtel
        $categorie->delete();

        // Rediriger vers la liste des catégories avec un message de succès
        return redirect()->route('medoc-categorie.create')
                         ->with('success', 'La catégorie a été supprimée avec succès.');
        } catch (\Exception $e) {
            // Gérer les erreurs (par exemple, si la catégorie n'existe pas)
            return redirect()->back()
            ->withErrors(['error' => 'Une erreur est survenue lors de la suppression de la catégorie.']);
        }
    }

}
