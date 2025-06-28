<?php

namespace App\Http\Controllers\Pharmacie;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\PharmacieSante\StMedecin;
use App\Http\Requests\PharmacieSante\StoreMedecinRequest;
use App\Http\Requests\PharmacieSante\UpdateMedecinRequest;

class StMedecinController extends Controller
{
    // Afficher la liste des médecins
    public function index()
    {
        $medecins = StMedecin::all();
        return Inertia::render('PharmacieSante/Medecins/Index', [
            'medecins' => $medecins,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userId = Auth::id();

        // Vérifier si le médecin existe déjà pour l'utilisateur connecté
        $medecinExiste = StMedecin::where('user_id', $userId)->exists();

        if ($medecinExiste) {
            // Rediriger ou retourner une erreur / message d'alerte
            return redirect()->route('profile.stUser')->with('error', 'Vous êtes déjà inscrit comme médecin.');
        }
        return Inertia::render('PharmacieSante/Medecin/MedecinCreate');
    }

    // Enregistrer un nouveau médecin
    public function store(StoreMedecinRequest $request)
    {
        $data = $request->validated();

        // Gérer l'upload de l'image
        if ($request->hasFile('image_principale')) {
            $data['image_principale'] = $request->file('image_principale')->store('pharmacie-sante/medecins', 'public');
        }

        // Associer le médecin à l'utilisateur connecté
        $data['user_id'] = Auth::id();
        $medecin = StMedecin::create($data);

        if ($medecin) {
            // Redirection vers la page d'édition du spécialiste de santé
            return redirect()->route('profile.stUser')
                             ->with('success', 'Bienvenue dans la communauté des médecins engagés !
                                Votre expertise fait la différence, et nous sommes fiers de vous accueillir. Ensemble, aidons encore plus de patients à mieux vivre.');
        }

        return redirect()->back()->with('error', 'Erreur lors de l\'ajout du médecin.');
    }

    // Afficher les détails d'un médecin
    public function show($id)
    {
        $medecin = StMedecin::findOrFail($id);
        return Inertia::render('PharmacieSante/Medecins/Show', [
            'medecin' => $medecin,
        ]);
    }

    // Afficher le formulaire de modification
    public function edit($id)
    {
        Auth::user()->medecin;
        $medecin = Auth::user()->medecin;
        if (!$medecin) {
            return redirect()->route('accueil.pharmacie')->with('error', 'Vous devez être inscrit comme médecin pour accéder à cette page.');
        }
        return Inertia::render('PharmacieSante/Medecin/StMedecinProfileEdit', [
            'medecin' => $medecin,
        ]);
    }

    // Mettre à jour un médecin
    public function update(UpdateMedecinRequest $request, $id)
    {
        // Récupérer le médecin associé à l'utilisateur connecté
        $medecin = Auth::user()->medecin;

        // Vérifie l'unicité de l'email
        $existingMedecin = StMedecin::where('email', $request->email)
        ->where('id', '!=', $id)
        ->first();

        if ($existingMedecin) {
            return back()->withErrors(['email' => 'Cette adresse email est déjà utilisée.'])->withInput();
        }

        // Mettre à jour les données
        $medecin->update($request->validated());

        return redirect()->back()->with('success', 'Profil mis à jour avec succès.');
    }

    // Mettre à jour l'image de profil du médecin
    public function updateProfileImage(Request $request)
    {
        // Récupérer le médecin associé à l'utilisateur connecté
        $medecin = Auth::user()->medecin;
        // Valider l'image
        $request->validate([
            'image_principale' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Supprimer l'ancienne image si elle existe
        if ($medecin->image_principale) {
            Storage::disk('public')->delete($medecin->image_principale);
        }


        // Enregistrer la nouvelle image
        $medecin->image_principale = $request->file('image_principale')->store('pharmacie-sante/medecins', 'public');
        $medecin->save();

        return redirect()->back()->with('success', 'Photo de profil mise à jour avec succès.');
    }

    // Supprimer un médecin
    public function destroy($id)
    {
        $medecin = StMedecin::findOrFail($id);

        // Supprimer l'image associée
        if ($medecin->image_principale) {
            Storage::disk('public')->delete($medecin->image_principale);
        }

        $medecin->delete();

        return redirect()->route('medecins.index')->with('success', 'Médecin supprimé avec succès.');
    }

}
