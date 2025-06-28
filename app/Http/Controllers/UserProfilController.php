<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UserProfilePhotoRequest;
use App\Models\Supermarche\Commande;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserProfilController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $user = $request->user();

        // Formater les produits pour chaque commande
        // $commandes = Commande::all();
        return Inertia::render('UserProfile/UserProfil', [
            'user' => $user->load('profile'),

        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $user->load('profile');
        return Inertia::render('UserProfile/CreateInfoProfil', [
            'user' => $user,
            'profile' => $user->profile,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UpdateProfileRequest $request)
    {
        try {
            $data = $this->prepareProfileData($request);

            $profile = Auth::user()->profile()->create($data);

            return redirect()->back()->with('success', 'Profil créé avec succès!');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la création du profil');
        }

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

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfileRequest $request, $id)
    {
        try {
            $profile = UserProfile::findOrFail($id);

            // Vérification que l'utilisateur peut modifier ce profil
            if ($profile->user_id !== Auth::id()) {
                abort(403);
            }

            $data = $this->prepareProfileData($request);

            // Supprimer l'ancienne photo si une nouvelle est fournie
            if ($request->hasFile('photo_profil') && $profile->photo_profil) {
                Storage::disk('public')->delete($profile->photo_profil);
            }

            $profile->update($data);

            return back()->with('success', 'Profil mis à jour avec succès!');

        } catch (\Exception $e) {
            return back()->with('success', 'Erreur lors de la mise à jour du profil');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    protected function prepareProfileData($request)
    {
        $data = $request->validated();

        // Gestion de l'upload de la photo
        if ($request->hasFile('photo_profil')) {
            $path = $request->file('photo_profil')->store('profiles', 'public');
            $data['photo_profil'] = $path;
        }

        // Nettoyage des données
        unset($data['photo_profil']); // On ne garde que le chemin

        return $data;
    }

     public function updatePhoto(UserProfilePhotoRequest $request, $id)
    {
        try {
            $profile = UserProfile::findOrFail($id);

            // Vérification des permissions
            if ($profile->user_id !== Auth::id()) {
                abort(403);
            }

            // Supprimer l'ancienne photo si elle existe
            if ($profile->photo_profil) {
                Storage::disk('public')->delete($profile->photo_profil);
            }

            // Enregistrer la nouvelle photo
            $path = $request->file('photo_profil')->store('profiles', 'public');
            $profile->photo_profil = $path;
            $profile->save();

            return back()->with('success', 'Photo de profil mise à jour avec succès!');

        } catch (\Exception $e) {
            return back()->with('success', 'Erreur lors de la mise à jour de la photo de profil');
        }
    }
}
