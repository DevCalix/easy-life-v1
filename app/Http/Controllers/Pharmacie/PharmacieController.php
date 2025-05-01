<?php

namespace App\Http\Controllers\Pharmacie;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PharmacieSante\StImage;
use Illuminate\Support\Facades\Storage;
use App\Models\PharmacieSante\StPharmacie;
use App\Http\Requests\PharmacieSante\StPharmacieRequest;
use App\Http\Requests\PharmacieSante\StUpdatePharmacieRequest;

class PharmacieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pharmacies = StPharmacie::all();
        return Inertia::render('PharmacieSante/Pharmacie/PharmacieIndex',[
            'pharmacies' => $pharmacies,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('PharmacieSante/Pharmacie/PharmacieCreate');
    }

    /**
     * Enregistre une nouvelle pharmacie dans la base de données.
     */
    public function store(StPharmacieRequest $request)
    {
        // Valider les données du formulaire
        $validatedData = $request->validated();

        // Gérer l'upload de l'image principale
        if ($request->hasFile('image_principale')) {
            $imagePath = $request->file('image_principale')->store('pharmacie-sante/pharmacies', 'public');
            $validatedData['image_principale'] = $imagePath;
        }

        // Créer une nouvelle instance de StPharmacie avec les données validées
        $pharmacie = StPharmacie::create($validatedData);

        // Rediriger vers la liste des pharmacies avec un message de succès
        return redirect()->route('pharmacie.index')
                         ->with('success', 'La pharmacie a été créée avec succès.');
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
    public function edit(StPharmacie $pharmacie)
    {
        // $pharmacie = StPharmacie::findOrFail($id);

        return Inertia::render('PharmacieSante/Pharmacie/PharmacieEdit', [
            'pharmacie' => $pharmacie
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StUpdatePharmacieRequest $request, StPharmacie $pharmacie)
    {
        // Valider les données du formulaire
        $validatedData = $request->validated();

        // Vérifier si une nouvelle image a été uploadée
        if ($request->hasFile('image_principale')) {
            // Supprimer l'ancienne image si elle existe
            if ($pharmacie->image_principale) {
                Storage::disk('public')->delete($pharmacie->image_principale);
            }

            // Enregistrer la nouvelle image
            $imagePath = $request->file('image_principale')->store('pharmacies', 'public');
            $validatedData['image_principale'] = $imagePath;
        }

        // Mettre à jour la pharmacie avec les nouvelles données
        $pharmacie->update($validatedData);

        // Rediriger vers la liste des pharmacies avec un message de succès
        return redirect()->route('pharmacie.index')
                        ->with('success', 'La pharmacie a été mise à jour avec succès.');
    }

    /**
     * Afficher le formulaire de gestion des images de l'hôtel.
     */
    public function showImages(string $id)
    {
        $pharmacie = StPharmacie::with('images')->findOrFail($id);

        return Inertia::render('PharmacieSante/Pharmacie/PharmacieImages', [
            'pharmacie' => $pharmacie,
        ]);
    }

    /**
     * Mettre à jour l'image principale de l'hôtel.
     */
    public function updateImagePrincipale(Request $request, string $id)
    {
        $pharmacie = StPharmacie::findOrFail($id);

        // Valider la requête
        $request->validate([
            'image_principale' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Supprimer l'ancienne image si elle existe
        if ($pharmacie->image_principale) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $pharmacie->image_principale);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Stocker la nouvelle image
        $imagePath = $request->file('image_principale')->store('pharmacie-sante/pharmacies', 'public');
        $pharmacie->update(['image_principale' => $imagePath]);

        return redirect()->back()->with('success', 'Image principale mise à jour avec succès !');
    }

    /**
     * Ajouter des images secondaires à l'hôtel.
     */
    public function addImageSecondaire(Request $request, string $id)
    {
        $pharmacie = StPharmacie::findOrFail($id);

        // Valider la requête
        $request->validate([
            'images_secondaires' => 'required|array',
            'images_secondaires.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Traiter chaque image
        foreach ($request->file('images_secondaires') as $file) {
            $imagePath = $file->store('pharmacie-sante/pharmacies/images-secondaires', 'public');

            // Enregistrer l'image dans la base de données
            StImage::create([
                'st_pharmacie_id' => $pharmacie->id,
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
     * Supprimer une pharmacie et toutes ses images associées.
     */
    public function destroy(string $id)
    {
        // Trouver l'hôtel par son ID
        $pharmacie = StPharmacie::findOrFail($id);

        // Supprimer l'ancienne image si elle existe
        if ($pharmacie->image_principale) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $pharmacie->image_principale);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Supprimer les images secondaires associées
        foreach ($pharmacie->images as $image) {
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
        $pharmacie->delete();

        // Rediriger avec un message de succès
        return redirect()->route('pharmacie.index')->with('success', 'Pharmacie supprimé avec succès !');
    }
}
