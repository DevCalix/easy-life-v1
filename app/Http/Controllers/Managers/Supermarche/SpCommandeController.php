<?php

namespace App\Http\Controllers\Managers\Supermarche;

use App\Http\Controllers\Controller;
use App\Models\Supermarche\Commande;
use App\Models\Supermarche\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpCommandeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $perPage = 5; // Nombre d'éléments par page

        // 1. Récupérer les IDs des stores gérés par l'utilisateur
        $storeIds = $user->services()
            ->where('service_type', Store::class)
            ->pluck('service_id');

        // 2. Construire la requête de base
        $query = Commande::query()
            ->with(['produits' => function($query) use ($storeIds) {
                $query->whereIn('store_id', $storeIds)
                      ->with('store:id,nom');
            }])
            ->whereHas('produits', function($query) use ($storeIds) {
                $query->whereIn('store_id', $storeIds);
            });

        // 3. Appliquer les filtres
        if ($request->filled('search')) {
            $search = $request->input('search');

            $query->where(function($q) use ($search) {
                $q->where('reference', 'like', "%{$search}%")
                  ->orWhere('nom_client', 'like', "%{$search}%")
                  ->orWhereHas('produits', function($q) use ($search) {
                      $q->where('nom', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('statut')) {
            $query->where('statut', $request->input('statut'));
        }

        // 4. Paginer les résultats
        $commandes = $query->latest()
            ->paginate($perPage)
            ->through(function($commande) use ($storeIds) {
                $produitsStore = $commande->produits->whereIn('store_id', $storeIds);

                return [
                    'id' => $commande->id,
                    'reference' => $commande->reference,
                    'client' => [
                        'nom' => $commande->nom_client,
                        'email' => $commande->email_client,
                        'telephone' => $commande->telephone_client,
                    ],
                    'montant_total' => $commande->montant_total,
                    'statut' => $commande->statut,
                    'date' => $commande->created_at->format('d/m/Y H:i'),
                    'produits' => $produitsStore->map(function($produit) {
                        return [
                            'id' => $produit->id,
                            'nom' => $produit->nom,
                            'image' => $produit->image_principale,
                            'store' => [
                                'id' => $produit->store_id,
                                'nom' => $produit->store->nom,
                            ],
                            'quantite' => $produit->pivot->quantite,
                            'prix_unitaire' => $produit->pivot->prix_unitaire,
                            'prix_total' => $produit->pivot->prix_total,
                        ];
                    }),
                    'montant_store' => $produitsStore->sum('pivot.prix_total'),
                ];
            });

        return Inertia::render('Managers/Supermarche/CommandesIndex', [
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
