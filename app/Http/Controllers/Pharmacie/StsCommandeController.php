<?php

namespace App\Http\Controllers\Pharmacie;

use App\Http\Controllers\Controller;
use App\Models\PharmacieSante\StCommande;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StsCommandeController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        // 1. Récupérer les IDs des pharmacies du propriétaire
        $pharmacieIds = $user->services()
            ->where('service_type', 'App\Models\PharmacieSante\StPharmacie')
            ->pluck('service_id');

        // 2. Récupérer les commandes contenant au moins un médicament de ces pharmacies
        $commandes = StCommande::with(['user:id,name'])
            ->whereHas('details.medicament', function($query) use ($pharmacieIds) {
                $query->whereIn('st_pharmacie_id', $pharmacieIds);
            })
            ->with(['details' => function($query) use ($pharmacieIds) {
                $query->whereHas('medicament', function($q) use ($pharmacieIds) {
                    $q->whereIn('st_pharmacie_id', $pharmacieIds);
                })->with(['medicament.pharmacie']);
            }])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // 3. Pour chaque commande, recalculer le montant total uniquement pour les produits du propriétaire
        $commandes->getCollection()->transform(function ($commande) use ($pharmacieIds) {
            $filteredDetails = $commande->details->filter(function($detail) use ($pharmacieIds) {
                return in_array($detail->medicament->st_pharmacie_id, $pharmacieIds->toArray());
            });
            
            $commande->montant_total = $filteredDetails->sum(function($detail) {
                return $detail->prix * $detail->quantite;
            });
            
            return $commande;
        });

        return Inertia::render('Managers/PharmacieSante/Commandes/CommandesResume', [
            'commandes' => $commandes,
        ]);
    }

    public function afficherCommande(StCommande $commande)
{
    $user = auth()->user();
    
    // Récupérer les IDs des pharmacies du propriétaire
    $pharmacieIds = $user->services()
        ->where('service_type', 'App\Models\PharmacieSante\StPharmacie')
        ->pluck('service_id');

    // Charger la commande avec les détails valides
    $commande->load([
        'user:id,name,email',
        'details' => function($query) use ($pharmacieIds) {
            $query->whereHas('medicament', function($q) use ($pharmacieIds) {
                $q->whereIn('st_pharmacie_id', $pharmacieIds);
            })
            ->with(['medicament' => function($q) use ($pharmacieIds) {
                $q->whereIn('st_pharmacie_id', $pharmacieIds)
                  ->with('pharmacie:id,nom');
            }]);
        }
    ]);

    // Filtrer les détails invalides
    $filteredDetails = $commande->details->filter(function($detail) {
        return $detail->medicament && $detail->medicament->pharmacie;
    });

    if ($filteredDetails->isEmpty()) {
        abort(403, "Cette commande ne contient aucun produit valide de votre pharmacie");
    }

    // Calculer le montant total valide
    $montantTotal = $filteredDetails->sum(function($detail) {
        return $detail->prix * $detail->quantite;
    });

    return Inertia::render('Managers/PharmacieSante/Commandes/AfficherCommande', [
        'commande' => [
            'id' => $commande->id,
            'user' => $commande->user,
            'statut' => $commande->statut,
            'created_at' => $commande->created_at,
            'montant_total' => $montantTotal,
            'details' => $filteredDetails->map(function($detail) {
                return [
                    'id' => $detail->id,
                    'quantite' => $detail->quantite,
                    'prix' => $detail->prix,
                    'medicament' => [
                        'id' => $detail->medicament->id,
                        'nom' => $detail->medicament->nom,
                        'pharmacie' => [
                            'id' => $detail->medicament->pharmacie->id,
                            'nom' => $detail->medicament->pharmacie->nom
                        ]
                    ]
                ];
            })->values()->toArray()
        ]
    ]);
}

    // Mettre à jour le statut de la commande
    public function updateStatut(Request $request, $id)
    {
       $commande = StCommande::all();
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
