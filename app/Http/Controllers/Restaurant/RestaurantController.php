<?php

namespace App\Http\Controllers\Restaurant;

use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Restaurant\Restaurant;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Restaurant\StoreRestaurantRequest;
use App\Http\Requests\Restaurant\UpdateRestaurantImageRequest;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurants = Restaurant::all();
        return Inertia::render('CommandeRepas/Restaurant/RestaurantIndex', [
            'restaurants' => $restaurants
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CommandeRepas/Restaurant/CreateRestaurant');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRestaurantRequest $request)
    {
        // Les données sont déjà validées grâce à la Form Request
        $validatedData = $request->validated();

        // Générer un identifiant aléatoire unique de 10 caractères
        do {
            $randomId = 'restau' . rand(1000000000, 9999999999); // Préfixe + 10 chiffres
        } while (Restaurant::where('random_id', $randomId)->exists());

        // Ajouter l'identifiant généré aux données validées
        $validatedData['random_id'] = $randomId;
        // Créer le restaurant
        $restaurant = Restaurant::create($validatedData);

        // Gérer l'upload de la photo si elle est présente
        if ($request->hasFile('photo_restaurant')) {
            $restaurant->photo_restaurant = $request->file('photo_restaurant')->store('commandeRepas/restaurants', 'public');
            $restaurant->save();
        }

        // Rediriger avec un message de succès
        return redirect()->route('restaurant.index')->with('success', 'Restaurant ajouté avec succès.');
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
    public function edit(Restaurant $restaurant)
    {
        return Inertia::render('CommandeRepas/Restaurant/EditRestaurant', [
            'restaurant' => $restaurant,
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRestaurantRequest $request, Restaurant $restaurant)
    {
        // Valider les données avec la Form Request
        $validatedData = $request->validated();

        // Mettre à jour les données du restaurant
        $restaurant->update($validatedData);

        return redirect()->route('restaurant.index')->with('success', 'Informations du restaurant mises à jour avec succès.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        // Supprimer l'image associée si elle existe
        if ($restaurant->photo_restaurant) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $restaurant->photo_restaurant);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Supprimer le restaurant
        $restaurant->delete();

        // Rediriger avec un message de succès
        return redirect()->route('restaurant.index')->with('success', 'Restaurant supprimé avec succès.');
    }

    public function updateImage(UpdateRestaurantImageRequest $request, Restaurant $restaurant)
    {
        // Valider les données avec la Form Request
        $validatedData = $request->validated();

        // Supprimer l'ancienne photo si elle existe
        // Supprimer l'image associée si elle existe
        if ($restaurant->photo_restaurant) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $restaurant->photo_restaurant);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Enregistrer la nouvelle photo
        $restaurant->photo_restaurant = $request->file('photo_restaurant')->store('commandeRepas/restaurants', 'public');
        $restaurant->save();

        return redirect()->route('restaurant.edit', $restaurant->id)->with('success', 'Photo du restaurant mise à jour avec succès.');
    }
}
