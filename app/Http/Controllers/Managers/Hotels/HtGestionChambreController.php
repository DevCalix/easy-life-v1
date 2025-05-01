<?php

namespace App\Http\Controllers\Managers\Hotels;

use App\Http\Controllers\Controller;
use App\Http\Requests\HotelReservation\StoreHtChambreRequest;
use App\Http\Requests\HotelReservation\UpdateHtChambreRequest;
use App\Models\HotelReservation\HtChambre;
use App\Models\HotelReservation\HtEquipement;
use App\Models\HotelReservation\HtHotel;
use App\Models\HotelReservation\HtImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HtGestionChambreController extends Controller
{
    /**
     * Affiche la liste des chambres.
     */
    public function index()
    {
        $user = auth()->user();

        // Récupérer tous les store_id dont l'utilisateur est gestionnaire
        $hotelIds = $user->services()
            ->where('service_type', HtHotel::class)
            ->pluck('service_id');

        // Récupérer uniquement les produits liés à ces magasins
        $chambres = HtChambre::with(['hotel', 'equipements'])
            ->whereIn('ht_hotel_id', $hotelIds)
            ->get();

        // dd($chambres);
        // Passer les chambres au composant React
        return Inertia::render('Managers/Hotels/Chambres/IndexChambre', [
            'chambres' => $chambres,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();

        // Récupère les IDs des stores liés à l'utilisateur via UserService
        $hotelIds = $user->services()
            ->where('service_type', HtHotel::class)
            ->pluck('service_id');

        // Récupère les hotels correspondants
        $hotels = HtHotel::whereIn('id', $hotelIds)->get();

        // Passer les hôtels au composant React
        return Inertia::render('Managers/Hotels/Chambres/CreateChambre', [
            'hotels' => $hotels,
        ]);
    }

    /**
     * Enregistre une nouvelle chambre dans la base de données.
     */
    public function store(StoreHtChambreRequest $request)
    {
        // Les données sont déjà validées par StoreHtChambreRequest
        $validatedData = $request->validated();

        // Gestion de l'image principale
        if ($request->hasFile('image_principale')) {
            // Stocker l'image dans le dossier "public/reservation-hotel/chambres"
            $imagePath = $request->file('image_principale')->store('reservation-hotel/chambres', 'public');
            $validatedData['image_principale'] = $imagePath;
        }

        // Création de la chambre
        $chambre = HtChambre::create($validatedData);

        // Attacher les équipements sélectionnés à la chambre
        if (isset($validatedData['equipements'])) {
            $chambre->equipements()->attach($validatedData['equipements']);
        }

        // Redirection avec un message de succès
        return redirect()->route('mgs-chambres.index')->with('success', 'Chambre créée avec succès !');
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
        // Récupérer la chambre à éditer
        $chambre = HtChambre::with(['hotel', 'equipements'])->findOrFail($id);

        $user = auth()->user();

        // Récupère les IDs des stores liés à l'utilisateur via UserService
        $hotelIds = $user->services()
            ->where('service_type', HtHotel::class)
            ->pluck('service_id');

        // Récupère les hotels correspondants
        $hotels = HtHotel::whereIn('id', $hotelIds)->get();

        // Récupérer la liste des équipements disponibles
        $equipements = HtEquipement::all();

        // Retourner la vue d'édition avec les données nécessaires
        return inertia('Managers/Hotels/Chambres/EditChambre', [
            'chambre' => $chambre,
            'hotels' => $hotels,
            'equipements' => $equipements,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHtChambreRequest $request, string $id)
    {
        // Valider les données du formulaire
        $validatedData = $request->validated();

        // Récupérer la chambre à mettre à jour
        $chambre = HtChambre::findOrFail($id);

        // Mettre à jour les données de la chambre
        $chambre->update($validatedData);

        // Synchroniser les équipements
        if (isset($validatedData['equipements'])) {
            $chambre->equipements()->sync($validatedData['equipements']);
        }


        // Rediriger avec un message de succès
        return redirect()->route('mgs-chambres.index')->with('success', 'Chambre mise à jour avec succès.');
    }

    /**
     * Afficher le formulaire de gestion des images de l'hôtel.
     */
    public function showImages(string $id)
    {
        $chambre = HtChambre::with('images')->findOrFail($id);

        return Inertia::render('Managers/Hotels/Chambres/ChambresImages', [
            'chambre' => $chambre,
        ]);
    }

    /**
     * Mettre à jour l'image principale de l'hôtel.
     */
    public function updateImagePrincipale(Request $request, string $id)
    {
        $chambre = HtChambre::findOrFail($id);

        // Valider la requête
        $request->validate([
            'image_principale' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Supprimer l'ancienne image si elle existe
        if ($chambre->image_principale) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $chambre->image_principale);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Stocker la nouvelle image
        $imagePath = $request->file('image_principale')->store('reservation-hotel/chambres', 'public');
        $chambre->update(['image_principale' => $imagePath]);

        return redirect()->back()->with('success', 'Image principale mise à jour avec succès !');
    }

    /**
     * Ajouter des images secondaires à l'hôtel.
     */
    public function addImageSecondaire(Request $request, string $id)
    {
        $chambre = HtChambre::findOrFail($id);

        // Valider la requête
        $request->validate([
            'images_secondaires' => 'required|array',
            'images_secondaires.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Traiter chaque image
        foreach ($request->file('images_secondaires') as $file) {
            $imagePath = $file->store('reservation-hotel/chambres/images-secondaires', 'public');

            // Enregistrer l'image dans la base de données
            HtImage::create([
                'ht_chambre_id' => $chambre->id,
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
        $image = HtImage::findOrFail($id);

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

    public function destroy(string $id)
    {
        // Trouver la chambre par son ID
        $chambre = HtChambre::findOrFail($id);

        // Supprimer l'image principale si elle existe
        if ($chambre->image_principale) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $chambre->image_principale);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Supprimer les images secondaires associées (si elles existent)
        foreach ($chambre->images as $image) {
            // Supprimer l'ancienne image si elle existe
            if ($image->url) {
                // Retirer le préfixe "/storage/" du chemin
                $path = str_replace('/storage/', '', $image->url);

                // Vérifier si le fichier existe
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path); // Supprimer le fichier
                } else {
                    Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
                }
            }
            $image->delete(); // Supprimer l'entrée de la base de données
        }

        // Supprimer les relations (réservations, équipements, etc.)
        $chambre->reservations()->delete(); // Supprimer les réservations associées
        $chambre->equipements()->detach(); // Détacher les équipements (relation many-to-many)

        // Supprimer la chambre
        $chambre->delete();

        // Rediriger avec un message de succès
        return redirect()->route('chambres.index')->with('success', 'Chambre supprimée avec succès !');
    }
}
