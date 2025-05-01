<?php

namespace App\Http\Controllers\HotelReservation;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\HotelReservation\HtHotel;
use App\Models\HotelReservation\HtImage;
use App\Http\Requests\HotelReservation\StoreHtHotelRequest;

class HtHotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer tous les hôtels depuis la base de données
        $hotels = HtHotel::all();

        // Passer les hôtels à la vue via Inertia
        return Inertia::render('HotelReservation/Hotels/IndexHotel', [
            'hotels' => $hotels,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('HotelReservation/Hotels/CreateHotel');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHtHotelRequest $request)
    {
        // Les données sont déjà validées par StoreHtHotelRequest
        $validatedData = $request->validated();

        // Convertir le tableau "repas_offerts" en JSON
        if (isset($validatedData['repas_offerts'])) {
            $validatedData['repas_offerts'] = json_encode($validatedData['repas_offerts']);
        }

        // Gestion de l'image principale
        if ($request->hasFile('image_principale')) {
            // Stocker l'image dans le dossier "public/reservation-hotel/hotels"
            $imagePath = $request->file('image_principale')->store('reservation-hotel/hotels', 'public');
            $validatedData['image_principale'] = $imagePath;
        }

        // Création de l'hôtel
        $hotel = HtHotel::create($validatedData);

        // Attacher les équipements sélectionnés à l'hôtel
        if (isset($validatedData['equipements'])) {
            $hotel->equipements()->attach($validatedData['equipements']);
        }

        // Attacher les services sélectionnés à l'hôtel
        if (isset($validatedData['services'])) {
            $hotel->services()->attach($validatedData['services']);
        }

        // Redirection avec un message de succès
        return redirect()->route('hotels.index')->with('success', 'Hôtel créé avec succès !');
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
        // Récupérer l'hôtel avec ses relations
        $hotel = HtHotel::with([
            'equipements', // Équipements de l'hôtel
            'services',    // Services de l'hôtel
            'chambres',    // Chambres de l'hôtel
        ])->findOrFail($id);

        return Inertia::render('HotelReservation/Hotels/EditHotel', [
            'hotel' => $hotel,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreHtHotelRequest $request, string $id)
    {
        // Récupérer l'hôtel à mettre à jour
        $hotel = HtHotel::findOrFail($id);

        // Les données sont déjà validées par StoreHtHotelRequest
        $validatedData = $request->validated();
        // dd($request->toArray());

        // Convertir le tableau "repas_offerts" en JSON
        if (isset($validatedData['repas_offerts'])) {
            $validatedData['repas_offerts'] = json_encode($validatedData['repas_offerts']);
        }

        // Mettre à jour les relations many-to-many (équipements et services)
        if (isset($validatedData['equipements'])) {
            $hotel->equipements()->sync($validatedData['equipements']);
        }

        if (isset($validatedData['services'])) {
            $hotel->services()->sync($validatedData['services']);
        }

        // Mise à jour de l'hôtel
        $hotel->update($validatedData);

        // Redirection avec un message de succès
        return redirect()->route('hotels.index')->with('success', 'Hôtel mis à jour avec succès !');
    }

    /**
     * Afficher le formulaire de gestion des images de l'hôtel.
     */
    public function showImages(string $id)
    {
        $hotel = HtHotel::with('images')->findOrFail($id);

        return Inertia::render('HotelReservation/Hotels/HotelImages', [
            'hotel' => $hotel,
        ]);
    }

    /**
     * Mettre à jour l'image principale de l'hôtel.
     */
    public function updateImagePrincipale(Request $request, string $id)
    {
        $hotel = HtHotel::findOrFail($id);

        // Valider la requête
        $request->validate([
            'image_principale' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Supprimer l'ancienne image si elle existe
        if ($hotel->image_principale) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $hotel->image_principale);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Stocker la nouvelle image
        $imagePath = $request->file('image_principale')->store('reservation-hotel/hotels', 'public');
        $hotel->update(['image_principale' => $imagePath]);

        return redirect()->back()->with('success', 'Image principale mise à jour avec succès !');
    }

    /**
     * Ajouter des images secondaires à l'hôtel.
     */
    public function addImageSecondaire(Request $request, string $id)
    {
        $hotel = HtHotel::findOrFail($id);

        // Valider la requête
        $request->validate([
            'images_secondaires' => 'required|array',
            'images_secondaires.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Traiter chaque image
        foreach ($request->file('images_secondaires') as $file) {
            $imagePath = $file->store('reservation-hotel/hotels/images-secondaires', 'public');

            // Enregistrer l'image dans la base de données
            HtImage::create([
                'ht_hotel_id' => $hotel->id,
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



    /**
     * Supprimer un hôtel et toutes ses images associées.
     */
    public function destroy(string $id)
    {
        // Trouver l'hôtel par son ID
        $hotel = HtHotel::findOrFail($id);

        // Supprimer l'ancienne image si elle existe
        if ($hotel->image_principale) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $hotel->image_principale);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Supprimer les images secondaires associées
        foreach ($hotel->images as $image) {
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
        $hotel->delete();

        // Rediriger avec un message de succès
        return redirect()->route('hotels.index')->with('success', 'Hôtel supprimé avec succès !');
    }

}
