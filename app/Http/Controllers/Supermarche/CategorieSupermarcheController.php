<?php

namespace App\Http\Controllers\Supermarche;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Supermarche\Categorie;
use Illuminate\Support\Facades\Storage;

class CategorieSupermarcheController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Categorie::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Récupérer toutes les catégories
        $categories = Categorie::all();
        return Inertia::render('Supermarche/Categories/CategoriesCreate',[
            'categories' => $categories,
            'success' => session('success'),
            'error' => session('error'),
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation des données entrantes
        $validated = $request->validate([
            'nom' => 'required|string|max:255|unique:categories,nom',
            'description' => 'nullable|string|max:500',
        ]);

        // Création de la catégorie (le slug est généré automatiquement par le modèle)
        $category = Categorie::create([
            'nom' => $validated['nom'],
            'description' => $request->input('description', ''), // Valeur par défaut : chaîne vide
        ]);

        // Retourner la catégorie créée en JSON
        return response()->json($category);
    }

    /**
     * Enregistrer une nouvelle catégorie.
     */
    public function storeNewCategorie(Request $request)
    {
        // Validation des données
        $validated = $request->validate([
            'nom' => 'required|string|max:255|unique:categories,nom',
            'description' => 'nullable|string|max:500',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // Validation pour l'image
        ]);

        // Gestion de l'upload de l'image
        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('supermarche/produits/categories', 'public'); // Stocke l'image dans le dossier public/storage/categories
            $validated['image_url'] = $path; // Génère l'URL publique de l'image
        }

        // Création de la catégorie
        Categorie::create($validated);

        // Retourner une réponse JSON pour Inertia
        return redirect()->route('categories.newCreate')
            ->with('success', 'Catégorie ajoutée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        // Récupérer la catégorie par son slug
        $categorie = Categorie::where('slug', $slug)->firstOrFail();

        // Récupérer les produits associés à cette catégorie
        $produits = $categorie->produits()->with('store')->get();

        return Inertia::render('Supermarche/CategorieProduits', [
            'categorie' => $categorie,
            'produits' => $produits,
            'appUrl' => config('app.url'),
        ]);
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
        // Trouver la catégorie par son ID
        $categorie = Categorie::find($id);

        // Vérifier si la catégorie existe
        if (!$categorie) {
            return redirect()->route('categories.index')->with('error', 'Catégorie non trouvée');
        }

        try {
            // Validation des données
            $validated = $request->validate([
                'nom' => 'required|string|max:255',
                'description' => 'nullable|string',
                'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            // Gestion de l'image
            if ($request->hasFile('image_url')) {
                // Supprimer l'ancienne image si elle existe
                if ($categorie->image_url) {
                    $oldImagePath = str_replace('/storage/', '', $categorie->image_url);
                    Storage::disk('public')->delete($oldImagePath);
                }

                // Enregistrer la nouvelle image
                $path = $request->file('image_url')->store('supermarche/produits/categories', 'public');
                $validated['image_url'] = Storage::url($path);
            }

            // Mettre à jour la catégorie
            $categorie->update($validated);

            // Rediriger avec un message de succès
            return redirect()->route('categories.newCreate')->with('success', 'Catégorie mise à jour avec succès');
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Retourner les erreurs de validation
            return redirect()->back()
                ->withErrors($e->validator)
                ->withInput();
        } catch (\Exception $e) {
            // Gérer les autres erreurs
            return redirect()->back()
                ->with('error', 'Une erreur est survenue lors de la mise à jour de la catégorie.')
                ->withInput();
        }
    }

    public function updateImage(Request $request, Categorie $categorie)
    {
        // Valider l'image
        $request->validate([
            'image_url' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Supprimer l'ancienne image si elle existe
        if ($categorie->image_url) {
            Storage::disk('public')->delete($categorie->image_url);
        }

        // Enregistrer la nouvelle image
        $path = $request->file('image_url')->store('supermarche/produits/categories', 'public');
        $categorie->update(['image_url' => Storage::url($path)]);

        return redirect()->back()->with('success', 'Image mise à jour avec succès.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Trouver la catégorie par son ID
        $categorie = Categorie::find($id);

        // Vérifier si la catégorie existe
        if (!$categorie) {
            return redirect()->back()->with('error', 'Catégorie non trouvée');
        }

        // Supprimer l'image associée si elle existe
        if ($categorie->image_url) {
            // Récupérer le chemin relatif de l'image (en enlevant "/storage/")
            $imagePath = str_replace('/storage/', '', $categorie->image_url);

            // Supprimer l'image du dossier de stockage
            Storage::disk('public')->delete($imagePath);
        }

        // Supprimer la catégorie de la base de données
        $categorie->delete();

        // Retourner une réponse Inertia avec un message de succès
        return redirect()->back()->with('success', 'Catégorie supprimée avec succès');
    }

}
