<?php

namespace App\Http\Controllers\Managers\Restau;

use App\Http\Controllers\Controller;
use App\Http\Requests\Restaurant\CategorieRepasRequest;
use App\Models\Restaurant\CategorieRepas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategorieMgsController extends Controller
{
    /**
     * Affiche la liste des catégories.
     */
    public function index()
    {
        // Récupérer toutes les catégories
        $categories = auth()->user()->categoriesRepas()->get(); 
        return Inertia::render('Managers/Repas/CategorieRepas/IndexCategorie', [
            'categories' => $categories,
        ]);
    }

    /**
     * Affiche le formulaire de création d'une catégorie.
     */
    public function create()
    {
        return Inertia::render('Managers/Repas/CategorieRepas/CreateCategorie');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategorieRepasRequest $request)
    {
        // Les données sont déjà validées grâce à la Form Request
        $validatedData = $request->validated();

        // Enregistrer l'image si elle est présente
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('commande-repas/categorie-repas', 'public');
        }

        // Ajouter le slug basé sur le nom
        $validatedData['slug'] = Str::slug($validatedData['nom'], '-');

        // Ajouter le chemin de l'image si elle est présente
        if ($imagePath) {
            $validatedData['image'] = $imagePath;
        }

        // Créer la catégorie
        $categorie = CategorieRepas::create($validatedData);
        // Association à l'utilisateur connecté
        auth()->user()->categoriesRepas()->attach($categorie->id);

        // Rediriger avec un message de succès
        return redirect()->route('mgs-categorie-repas.index')->with('success', 'Catégorie ajoutée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Affiche le formulaire d'édition d'une catégorie.
     */
    public function edit($id)
    {
        $categorieRepas = CategorieRepas::findOrFail($id);
        // dd($categorieRepas->toArray());
        return Inertia::render('Managers/Repas/CategorieRepas/EditCategorie', [
            'categorie' => $categorieRepas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategorieRepasRequest $request, $id)
    {
        // Les données sont déjà validées grâce à la Form Request
        $validatedData = $request->validated();

        // Générer et ajouter le slug basé sur le nom
        $validatedData['slug'] = Str::slug($validatedData['nom'], '-');
        // dd($validatedData);
        $categorieRepas = CategorieRepas::findOrFail($id);
        // Mettre à jour la catégorie
        $categorieRepas->update($validatedData);

        // Rediriger avec un message de succès
        return redirect()->route('mgs-categorie-repas.index')->with('success', 'Informations mises à jour avec succès.');
    }

    public function updateImage(Request $request, $id)
    {
        // Valider l'image
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);
        $categorieRepas = CategorieRepas::findOrFail($id);
        // Supprimer l'ancienne image si elle existe
        if ($categorieRepas->image) {
            $oldImagePath = str_replace('/storage/', '', $categorieRepas->image);
            Storage::disk('public')->delete($oldImagePath);
        }

        // Enregistrer la nouvelle image
        $newImagePath = $request->file('image')->store('commandeRepas/categorie-repas', 'public');
        $categorieRepas->image = '/storage/' . $newImagePath;
        $categorieRepas->save();

        // Rediriger avec un message de succès
        return redirect()->route('mgs-categorie-repas.index')->with('success', 'Image mise à jour avec succès.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Trouver la catégorie à supprimer
        $categorieRepas = CategorieRepas::findOrFail($id);

        // Supprimer l'image associée si elle existe
        if ($categorieRepas->image) {
            // Supprimer le fichier image du stockage
            $imagePath = str_replace('/storage/', '', $categorieRepas->image);
            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        // Supprimer la catégorie de la base de données
        $categorieRepas->delete();

        // Rediriger avec un message de succès
        return redirect()->route('mgs-categorie-repas.index')->with('success', 'Catégorie supprimée avec succès.');
    }
}
