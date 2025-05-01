<?php

namespace App\Http\Controllers\Pharmacie;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use App\Http\Controllers\Controller;
use App\Models\PharmacieSante\StImage;
use Illuminate\Support\Facades\Storage;
use App\Models\PharmacieSante\StCategorie;
use App\Models\PharmacieSante\StPharmacie;
use App\Models\PharmacieSante\StMedicament;
use App\Models\PharmacieSante\StVariationMedicament;
use App\Http\Requests\PharmacieSante\StMedicamentRequest;
use App\Http\Requests\PharmacieSante\StoreVariationRequest;

class StMedicamentController extends Controller
{
    /**
     * Affiche la liste des médicaments.
     */
    public function index()
    {
        // Récupérer tous les médicaments et pharmacies
        $medicaments = StMedicament::with('pharmacie', 'categories')->orderBy('created_at', 'desc')->get();
        $pharmacies = StPharmacie::select('id', 'nom')->get();

        // Retourner la vue Inertia avec toutes les données
        return Inertia::render('PharmacieSante/Medicaments/MedicamentIndex', [
            'medicaments' => $medicaments,
            'pharmacies' => $pharmacies,
        ]);
    }



    /**
     * Affiche le formulaire de création de médicament.
     */
    public function create()
    {
        // Récupérer les pharmacies et les catégories pour les listes déroulantes
        $pharmacies = StPharmacie::all();
        $categories = StCategorie::all();

        return inertia('PharmacieSante/Medicaments/MedicamentCreate', [
            'pharmacies' => $pharmacies,
            'categories' => $categories,
        ]);
    }

    /**
     * Enregistre un nouveau médicament dans la base de données.
     */
    public function store(StMedicamentRequest $request)
    {
        // Valider les données du formulaire
        $validatedData = $request->validated();

        // Gérer l'upload de l'image principale
        if ($request->hasFile('image_principale')) {
            $imagePath = $request->file('image_principale')->store('pharmacie-sante/medicaments', 'public');
            $validatedData['image_principale'] = $imagePath;
        }

        // Créer une nouvelle instance de StMedicament avec les données validées
        $medicament = StMedicament::create($validatedData);

        // Associer les catégories au médicament
        if (!empty($validatedData['categories'])) {
            $medicament->categories()->sync($request->categories);
        }

        // Rediriger vers la liste des médicaments avec un message de succès
        return redirect()->route('medicaments.index')
                         ->with('success', 'Le médicament a été créé avec succès.');
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
    public function edit(StMedicament $medicament)
    {
        // Récupérer les pharmacies et les catégories pour les listes déroulantes
        $pharmacies = StPharmacie::all();
        $categories = StCategorie::all();
        // Charger la relation avec les catégories
        $medicament->load('categories');

        // Passer le médicament, les pharmacies et les catégories à la vue
        return Inertia::render('PharmacieSante/Medicaments/MedicamentEdit', [
            'medicament' => $medicament,
            'pharmacies' => $pharmacies,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StMedicamentRequest $request, string $id)
    {
        // Trouver le médicament ou retourner une erreur 404
        $medicament = StMedicament::findOrFail($id);

        // Récupérer les données validées
        $validatedData = $request->validated();

        // Mettre à jour les informations du médicament
        $medicament->update($validatedData);

        // Mettre à jour les catégories associées
        if (!empty($validatedData['categories'])) {
            $medicament->categories()->sync($validatedData['categories']);
        } else {
            $medicament->categories()->detach(); // Supprime les anciennes associations si aucune catégorie sélectionnée
        }

        // Redirection avec message de succès
        return redirect()->route('medicaments.index')
                        ->with('success', 'Le médicament a été mis à jour avec succès.');
    }

    /**
     * Afficher le formulaire de gestion des images de l'hôtel.
     */
    public function showImages(string $id)
    {
        $medicament = StMedicament::with('images')->findOrFail($id);

        return Inertia::render('PharmacieSante/Medicaments/MedicamentsImages', [
            'medicament' => $medicament,
        ]);
    }

    /**
     * Mettre à jour l'image principale de l'hôtel.
     */
    public function updateImagePrincipale(Request $request, string $id)
    {
        $medicament = StMedicament::findOrFail($id);

        // Valider la requête
        $request->validate([
            'image_principale' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Supprimer l'ancienne image si elle existe
        if ($medicament->image_principale) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $medicament->image_principale);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Stocker la nouvelle image
        $imagePath = $request->file('image_principale')->store('pharmacie-sante/medicaments', 'public');
        $medicament->update(['image_principale' => $imagePath]);

        return redirect()->back()->with('success', 'Image principale mise à jour avec succès !');
    }

    /**
     * Ajouter des images secondaires à l'hôtel.
     */
    public function addImageSecondaire(Request $request, string $id)
    {
        $medicament = StMedicament::findOrFail($id);

        // Valider la requête
        $request->validate([
            'images_secondaires' => 'required|array',
            'images_secondaires.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Traiter chaque image
        foreach ($request->file('images_secondaires') as $file) {
            $imagePath = $file->store('pharmacie-sante/medicaments/images-secondaires', 'public');

            // Enregistrer l'image dans la base de données
            StImage::create([
                'st_medicament_id' => $medicament->id,
                'url' => $imagePath,
            ]);
        }

        return redirect()->back()->with('success', 'Images secondaires ajoutées avec succès !');
    }

    /**
     * Supprimer une image secondaire.
     */
    public function deleteImageSecondaire(string $id)
    {
        // Trouver l'image secondaire par son ID
        $image = StImage::findOrFail($id);

        // Supprimer l'ancienne image si elle existe
        if ($image->url) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $image->url);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Supprimer l'entrée de la base de données
        $image->delete();

        // Rediriger avec un message de succès
        return redirect()->back()->with('success', 'Image secondaire supprimée avec succès !');
    }

    /**
     * Afficher le formulaire de gestion des images de l'hôtel.
     */
    public function showVariations(string $id)
    {
        $medicament = StMedicament::with('variations')->findOrFail($id);

        return Inertia::render('PharmacieSante/Medicaments/MedicamentsVariations', [
            'medicament' => $medicament,
        ]);
    }

    public function storeVariations(StoreVariationRequest $request, StMedicament $medicament)
    {
        // Récupération des données validées
        $validatedData = $request->validated();
        // Enregistrement des variations
        foreach ($validatedData['variations'] as $variation) {
            // Vérifier si la variation existe déjà
            $existingVariation = $medicament->variations()
                ->where('type_variation', $variation['type_variation'])
                ->where('valeur_variation', $variation['valeur_variation'])
                ->first();

            // Gérer l'upload de l'image variation pour chaque variation
            $imagePath = null;
            if (!empty($variation['image_variation']) && $variation['image_variation'] instanceof UploadedFile) {
                $imagePath = $variation['image_variation']->store('pharmacie-sante/medicaments/variations', 'public');
            }

            // Si la variation n'existe pas, l'ajouter
            if (!$existingVariation) {
                $medicament->variations()->create([
                    'type_variation' => $variation['type_variation'],
                    'valeur_variation' => $variation['valeur_variation'],
                    'prix' => $variation['prix'],
                    'image_variation' => $imagePath, // Ajout de l'image si disponible
                ]);
            }
        }

        // Rediriger avec un message de succès
        return redirect()->back()->with('success', 'Les variations ont été enregistrées avec succès.');
    }


    public function destroyVariation(StVariationMedicament $variation)
    {
        // Supprimer la variation
        $variation->delete();

        // Rediriger avec un message de succès
        return redirect()->back()->with('success', 'La variation a été supprimée avec succès.');
    }


    /**
     * Supprimer une pharmacie et toutes ses images associées.
     */
    public function destroy(string $id)
    {
        // Trouver l'hôtel par son ID
        $medicament = StMedicament::findOrFail($id);

        // Supprimer l'ancienne image si elle existe
        if ($medicament->image_principale) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $medicament->image_principale);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Supprimer les images secondaires associées
        foreach ($medicament->images as $image) {
            // Supprimer l'ancienne image si elle existe
            if ($image->url) {
                // Retirer le préfixe "/storage/" du chemin
                $path = str_replace('/storage/', '', $image->url);

                // Vérifier si le fichier existe
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path); // Supprimer le fichier
                } else {
                    \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
                }
            }
            $image->delete(); // Supprimer l'entrée de la base de données
        }

        // Supprimer l'hôtel
        $medicament->delete();

        // Rediriger avec un message de succès
        return redirect()->route('medicaments.index')->with('success', 'Medicaments supprimé avec succès !');
    }
}
