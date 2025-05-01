<?php

namespace App\Http\Controllers\Restaurant;

use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Restaurant\Repas;
use App\Models\Restaurant\Tagrepas;
use App\Http\Controllers\Controller;
use App\Models\Restaurant\Restaurant;
use Illuminate\Support\Facades\Storage;
use App\Models\Restaurant\CategorieRepas;
use App\Http\Requests\Restaurant\StoreRepasRequest;

class RepasController extends Controller
{
    /**
     * Affiche la liste des repas.
     */
    public function index()
    {

        $repas = Repas::with(['restaurant','categorie', 'tags'])->get();
        // Retourner la vue Inertia avec les repas
        return Inertia::render('CommandeRepas/Repas/IndexRepas', [
            'repas' => $repas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = CategorieRepas::all();
        $restaurants = Restaurant::all();
        $tags = Tagrepas::all();

        return Inertia::render('CommandeRepas/Repas/CreateRepas', [
            'categories' => $categories,
            'restaurants' => $restaurants,
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRepasRequest $request)
    {

        // Valider les données de la requête
        $validatedData = $request->validated();

        // Générer un repasId unique
        $validatedData['repasId'] = 'RP' . Str::upper(Str::random(10)); // Génère "RP" + 10 caractères alphanumériques

        // Gérer l'upload de la photo
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('commande-repas/repas', 'public'); // Enregistre la photo dans le dossier "storage/app/public/photos"
            $validatedData['photo'] = $photoPath; // Ajoute le chemin de la photo aux données validées
        }

        $validatedData['slug'] = Str::slug($validatedData['nom'], '-');
        // Créer le repas
        $repas = Repas::create($validatedData);

        // Associer les tags au repas
        if ($request->has('tags')) {
            $repas->tags()->attach($request->tags); // Associe les tags sélectionnés au repas
        }
        // Rediriger avec un message de succès
        return redirect()->route('repas.index')->with('success', 'Repas créé avec succès.');
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
        $repas = Repas::with(['categorie', 'tags', 'restaurant'])->findOrFail($id);
        $categories = CategorieRepas::all();
        $restaurants = Restaurant::all();
        $tags = Tagrepas::all();

        return Inertia::render('CommandeRepas/Repas/EditRepas', [
            'repas' => $repas,
            'categories' => $categories,
            'restaurants' => $restaurants,
            'tags' => $tags,
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRepasRequest $request, string $id)
    {
        $repas = Repas::findOrFail($id);

        $validatedData = $request->validated();

        $repas->update($validatedData);

        if ($request->has('tags')) {
            $repas->tags()->sync($request->tags);
        }

        return redirect()->route('repas.index')->with('success', 'Repas mis à jour avec succès.');
    }

    public function updateImage(Request $request, $id)
    {
        // Trouver le repas par son ID
        $repas = Repas::findOrFail($id);

        // Valider la requête
        $request->validate([
            'photo' => 'required|image|max:2048', // L'image doit être valide et ne pas dépasser 2 Mo
        ]);

        // Vérifier si un fichier image est présent dans la requête
        if ($request->hasFile('photo')) {
            // Supprimer l'ancienne image si elle existe
            if ($repas->photo) {
                // Retirer le préfixe "/storage/" du chemin
                $path = str_replace('/storage/', '', $repas->photo);

                // Vérifier si le fichier existe
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path); // Supprimer le fichier
                } else {
                    \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
                }
            }

            // Enregistrer la nouvelle image
            $photoPath = $request->file('photo')->store('commande-repas/repas', 'public');
            $repas->photo = $photoPath; // Mettre à jour le chemin de l'image dans la base de données
            $repas->save(); // Sauvegarder les modifications
        }

        return redirect()->route('repas.index')->with('success', 'Photo du repas mise à jour avec succès.');

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Trouver le repas par son ID
        $repas = Repas::findOrFail($id);

        // Supprimer l'image associée si elle existe
        if ($repas->photo) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $repas->photo);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Supprimer les tags associés (si vous utilisez une relation many-to-many)
        $repas->tags()->detach();

        // Supprimer le repas de la base de données
        $repas->delete();

        // Rediriger avec un message de succès
        return redirect()->route('repas.index')->with('success', 'Repas supprimé avec succès.');
    }
}
