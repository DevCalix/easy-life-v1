<?php

namespace App\Http\Controllers\Pharmacie;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PharmacieSante\StCommande;

class StCommandeController extends Controller
{
    public function index()
    {
        // Récupérer toutes les commandes avec leurs détails
        $commandes = StCommande::with(['details.medicament', 'pharmacie', 'user'])
        ->orderBy('created_at', 'desc')
        ->paginate(10);
        // dd($commandes);
        return Inertia::render('PharmacieSante/Commandes/CommandesResume',[
            'commandes' => $commandes,
        ]);
    }

    /**
     * Afficher les détails d'une commande spécifique.
     */
    public function afficherCommande(StCommande $commande)
    {
        // Charger les détails de la commande avec les médicaments associés
        $commande->load(['user', 'details.medicament.pharmacie']);

        return Inertia::render('PharmacieSante/Commandes/AfficherCommande', [
            'commande' => $commande,
        ]);
    }

    // Mettre à jour le statut de la commande
    public function updateStatut(Request $request, StCommande $commande)
    {
        // dd($request->json()->all());
        // Valider le statut
        $request->validate([
            'statut' => 'required|in:en cours,livrée,annulée',
        ]);
        // Mettre à jour le statut de la commande
        $commande->update([
            'statut' => $request->statut,
        ]);

        return redirect()->back()->with('success', 'Statut de la commande mis à jour avec succès.');
    }
}
