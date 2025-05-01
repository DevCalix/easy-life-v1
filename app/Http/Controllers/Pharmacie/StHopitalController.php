<?php

namespace App\Http\Controllers\Pharmacie;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PharmacieSante\StImage;
use Illuminate\Support\Facades\Storage;
use App\Models\PharmacieSante\StHopital;
use App\Http\Requests\PharmacieSante\StHopitalRequest;

class StHopitalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hopitaux = StHopital::all();
        return Inertia::render('PharmacieSante/Hopitals/HopitalIndex',[
            'hopitaux' => $hopitaux,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('PharmacieSante/Hopitals/HopitalCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StHopitalRequest $request)
    {
        // Valider les données du formulaire
        $validatedData = $request->validated();

        // Gérer l'upload de l'image principale
        if ($request->hasFile('image_principale')) {
            $imagePath = $request->file('image_principale')->store('pharmacie-sante/hopitals', 'public');
            $validatedData['image_principale'] = $imagePath;
        }

        // Créer une nouvelle instance de StPharmacie avec les données validées
        $hopital = StHopital::create($validatedData);

        // Rediriger vers la liste des pharmacies avec un message de succès
        return redirect()->route('hopitaux.index')
                         ->with('success', 'L\'hôpital a été créée avec succès.');
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
        $hopital = StHopital::findOrFail($id);
        return Inertia::render('PharmacieSante/Hopitals/HopitalEdit', [
            'hopital' => $hopital
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StHopitalRequest $request, string $id)
    {
        // Valider les données du formulaire
        $validatedData = $request->validated();
        $hopital = StHopital::findOrFail($id);

        // Mettre à jour la pharmacie avec les nouvelles données
        $hopital->update($validatedData);

        // Rediriger vers la liste des pharmacies avec un message de succès
        return redirect()->route('hopitaux.index')
                        ->with('success', 'L\'hôpital a été mise à jour avec succès.');
    }

    /**
     * Afficher le formulaire de gestion des images de l'hôtel.
     */
    public function showImages(string $id)
    {
        $hopital = StHopital::with('images')->findOrFail($id);

        return Inertia::render('PharmacieSante/Hopitals/HopitalsImages', [
            'hopital' => $hopital,
        ]);
    }

    /**
     * Mettre à jour l'image principale de l'hôtel.
     */
    public function updateImagePrincipale(Request $request, string $id)
    {
        $hopital = StHopital::findOrFail($id);

        // Valider la requête
        $request->validate([
            'image_principale' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Supprimer l'ancienne image si elle existe
        if ($hopital->image_principale) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $hopital->image_principale);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Stocker la nouvelle image
        $imagePath = $request->file('image_principale')->store('pharmacie-sante/hopitals', 'public');
        $hopital->update(['image_principale' => $imagePath]);

        return redirect()->back()->with('success', 'Image principale mise à jour avec succès !');
    }

    /**
     * Ajouter des images secondaires à l'hôtel.
     */
    public function addImageSecondaire(Request $request, string $id)
    {
        $hopital = StHopital::findOrFail($id);

        // Valider la requête
        $request->validate([
            'images_secondaires' => 'required|array',
            'images_secondaires.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Traiter chaque image
        foreach ($request->file('images_secondaires') as $file) {
            $imagePath = $file->store('pharmacie-sante/hopitals/images-secondaires', 'public');

            // Enregistrer l'image dans la base de données
            StImage::create([
                'st_hopital_id' => $hopital->id,
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
        $hopital = StHopital::findOrFail($id);

        // Supprimer l'ancienne image si elle existe
        if ($hopital->image_principale) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $hopital->image_principale);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Supprimer les images secondaires associées
        foreach ($hopital->images as $image) {
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
        $hopital->delete();

        // Rediriger avec un message de succès
        return redirect()->route('hopitaux.index')->with('success', 'Hôpital supprimé avec succès !');
    }
}
