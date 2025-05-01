<?php

namespace App\Http\Controllers\Pharmacie;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PharmacieSante\StMedecin;
use App\Models\PharmacieSante\StRdvMedical;

class StRdvMedicalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    // Afficher le formulaire de rendez-vous
    public function create(StMedecin $medecin)
    {
        return Inertia::render('PharmacieSante/RDV/PrendreRendezVousForm', [
            'medecin' => $medecin,
        ]);
    }

    // Enregistrer le rendez-vous
    public function store(Request $request)
    {
        $request->validate([
            'st_medecin_id' => 'required|exists:st_medecins,id',
            'date' => 'required|date',
            'heure' => 'required|date_format:H:i',
            'message' => 'nullable|string|max:500',
        ]);

        // Créer le rendez-vous
        StRdvMedical::create([
            'user_id' => auth()->id(),
            'st_medecin_id' => $request->st_medecin_id,
            'date' => $request->date,
            'heure' => $request->heure,
            'message' => $request->message,
            'statut' => 'en_attente', // Par défaut, le statut est "en_attente"
        ]);

        return redirect()->route('prendre-rendez-vous.create', ['medecin' => $request->st_medecin_id])->with('success', 'Votre demande de rendez-vous a été envoyée avec succès ! Veuillez revenir plutard consulté le statut dans votre espace membre.');
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function confirmerForm(StRdvMedical $rdv)
    {
        return Inertia::render('PharmacieSante/Profil/ConfirmerRendezVous', [
            'rdv' => $rdv,
        ]);
    }

    public function confirmer(Request $request, StRdvMedical $rdv)
    {
        $request->validate([
            'date' => 'required',
            'heure' => 'required',
        ]);

        $rdv->update([
            'date' => $request->date,
            'heure' => $request->heure,
            'statut' => 'confirmé',
        ]);

        return redirect()->route('profile.stUser')->with('success', 'Rendez-vous confirmé avec succès !');
    }

    public function annuler(StRdvMedical $rdv)
    {
        $rdv->update([
            'statut' => 'annulé',
        ]);

        return redirect()->route('profile.stUser')->with('success', 'Rendez-vous annulé avec succès !');
    }
}
