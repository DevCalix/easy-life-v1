<?php

namespace App\Http\Controllers\Managers\Restau;

use App\Http\Controllers\Controller;
use App\Models\Restaurant\RepasCommande;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RepasCommandeMgsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $perPage = $request->input('perPage', 10);

        // Récupérer les restaurants gérés par l'utilisateur
        $restaurantIds = $user->services()
            ->where('service_type', 'App\Models\Restaurant\Restaurant')
            ->pluck('service_id');

        // Construire la requête de base pour les commandes
        $query = RepasCommande::with(['details.repas', 'details.variation'])
            ->whereHas('details.repas', function($q) use ($restaurantIds) {
                $q->whereIn('restaurant_id', $restaurantIds);
            });

        // Filtres
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('reference', 'like', "%{$search}%")
                  ->orWhere('nom_client', 'like', "%{$search}%")
                  ->orWhere('email_client', 'like', "%{$search}%");
            });
        }

        if ($request->filled('statut')) {
            $query->where('statut', $request->input('statut'));
        }

        // Pagination avec transformation des données
        $commandes = $query->latest()
            ->paginate($perPage)
            ->through(function($commande) use ($restaurantIds) {
                // Filtrer les détails pour ne garder que ceux des restaurants du propriétaire
                $filteredDetails = $commande->details->filter(function($detail) use ($restaurantIds) {
                    return in_array($detail->repas->restaurant_id, $restaurantIds->toArray());
                });

                // Recalculer le montant total basé sur les détails filtrés
                $montantTotal = $filteredDetails->sum('prix_total');

                return [
                    'id' => $commande->id,
                    'reference' => $commande->reference,
                    'client' => [
                        'nom' => $commande->nom_client,
                        'email' => $commande->email_client,
                        'telephone' => $commande->telephone_client,
                    ],
                    'montant_total' => $montantTotal,
                    'statut' => $commande->statut,
                    'date' => $commande->created_at->format('d/m/Y H:i'),
                    'details' => $filteredDetails->map(function($detail) {
                        return [
                            'repas_nom' => $detail->repas->nom,
                            'variation_nom' => $detail->variation->nom ?? 'Standard',
                            'quantite' => $detail->quantite,
                            'prix_unitaire' => $detail->prix_unitaire,
                            'prix_total' => $detail->prix_total,
                            'image' => $detail->repas->image_principale,
                        ];
                    }),
                ];
            });

        return Inertia::render('Managers/Restaurant/CommandesIndex', [
            'commandes' => $commandes,
            'filters' => $request->only(['search', 'statut']),
            'statutOptions' => [
                'en_attente' => 'En attente',
                'en_cours' => 'En cours',
                'livree' => 'Livrée',
                'annulee' => 'Annulée',
            ],
        ]);
    }
}
