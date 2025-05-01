<?php

namespace App\Http\Controllers\Managers\Restau;

use App\Http\Controllers\Controller;
use App\Http\Requests\Restaurant\StoreRestaurantRequest;
use App\Http\Requests\Restaurant\UpdateRestaurantImageRequest;
use App\Models\Managers\UserService;
use App\Models\Restaurant\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RestauManagersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        // Récupérer les ID des stores dont l'utilisateur est gestionnaire
        $restaurantIds = $user->services()
            ->where('service_type', Restaurant::class)
            ->pluck('service_id');

        // Récupérer les stores complets à partir des IDs
        $restaurants = Restaurant::whereIn('id', $restaurantIds)->get();
        return Inertia::render('Managers/Restaurant/RestaurantIndex', [
            'restaurants' => $restaurants
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Managers/Restaurant/CreateRestaurant');
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

        UserService::create([
            'user_id' => auth()->id(),
            'service_type' => Restaurant::class,
            'service_id' => $restaurant->id,
            'code_marchand' => Str::uuid(), // Génère un identifiant unique
            'role' => 'owner', // Rôle de propriétaire
        ]);

        // Rediriger avec un message de succès
        return redirect()->route('mgs-restaurant.index')->with('success', 'Restaurant ajouté avec succès.');
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
    public function edit($randomId)
    {
        $restaurant = Restaurant::where('random_id', $randomId)->firstOrFail();
        return Inertia::render('Managers/Restaurant/EditRestaurant', [
            'restaurant' => $restaurant,
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRestaurantRequest $request, $randomId)
    {
        $restaurant = Restaurant::where('random_id', $randomId)->firstOrFail();
        // Valider les données avec la Form Request
        $validatedData = $request->validated();

        // Mettre à jour les données du restaurant
        $restaurant->update($validatedData);

        return redirect()->route('mgs-restaurant.index')->with('success', 'Informations du restaurant mises à jour avec succès.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $restaurant = Restaurant::findOrFail($id);
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
        return redirect()->route('mgs-restaurant.index')->with('success', 'Restaurant supprimé avec succès.');
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

        return redirect()->route('mgs-restaurant.edit', $restaurant->random_id)->with('success', 'Photo du restaurant mise à jour avec succès.');
    }
}
