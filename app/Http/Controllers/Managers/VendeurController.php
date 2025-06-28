<?php

namespace App\Http\Controllers\Managers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VendeurController extends Controller
{
    public function avantageVendeur()
    {
        return Inertia::render('Managers/Vendeur/AvantagesVendeur');
    }
    public function devenirVendeur()
    {
        $userServices = [];

        if (auth()->check()) {
            $userServices = auth()->user()->services()
                ->get()
                ->map(function ($service) {
                    return [
                        'service_type' => $service->service_type, // On garde le type complet pour le mapping côté front
                    ];
                });
        }

        return Inertia::render('Managers/Vendeur/ServiceSelection', [
            'auth' => [
                'user' => auth()->user() ? [
                    'id' => auth()->id(),
                    'name' => auth()->user()->name
                ] : null
            ],
            'userServices' => $userServices
        ]);
    }

private function mapServiceType($type)
{
    $mapping = [
        'App\\Models\\Supermarche\\Store' => 'supermarche',
        'App\\Models\\Restaurant\\Restaurant' => 'restaurant',
        'App\\Models\\Pharmacie\\Pharmacie' => 'pharmacie',
        'App\\Models\\Hotel\\Hotel' => 'hotel',
    ];

    return $mapping[$type] ?? $type;
}

    public function marketStoreForm()
    {
        return Inertia::render('Managers/Vendeur/MarketStoreForm');
    }
    public function restauStoreForm()
    {
        return Inertia::render('Managers/Vendeur/RestauStoreForm');
    }
    public function pharmacieStoreForm()
    {
        return Inertia::render('Managers/Vendeur/PharmacieStoreForm');
    }
    public function hotelStoreForm()
    {
        return Inertia::render('Managers/Vendeur/HotelStoreForm');
    }

    public function marketDashboard(Request $request)
    {
        $user = $request->user();

        // 1. Récupérer les IDs des stores gérés par l'utilisateur
        $storeIds = $user->services()
            ->where('service_type', 'App\Models\Supermarche\Store')
            ->pluck('service_id');

        // 2. Compter les produits
        $produitsCount = \App\Models\Supermarche\Produit::whereIn('store_id', $storeIds)
            ->count();

        // 3. Récupérer les 3 dernières commandes
        $commandes = \App\Models\Supermarche\Commande::query()
            ->with(['produits' => function($query) use ($storeIds) {
                $query->whereIn('store_id', $storeIds)
                    ->with('store:id,nom');
            }])
            ->whereHas('produits', function($query) use ($storeIds) {
                $query->whereIn('store_id', $storeIds);
            })
            ->latest()
            ->take(3)
            ->get()
            ->map(function($commande) use ($storeIds) {
                $produitsStore = $commande->produits->whereIn('store_id', $storeIds);

                return [
                    'id' => $commande->id,
                    'reference' => $commande->reference,
                    'client' => $commande->nom_client,
                    'statut' => $commande->statut,
                    'date' => $commande->created_at->format('d/m/Y H:i'),
                    'montant' => $produitsStore->sum('pivot.prix_total'),
                    'produits_count' => $produitsStore->count(),
                ];
            });

        return Inertia::render('Managers/Supermarche/MarketDashboard', [
            'produitsCount' => $produitsCount,
            'commandes' => $commandes,
            'auth' => [
                'user' => $user->only('id', 'name', 'email'),
            ],
        ]);
    }
    public function htDashboard()
    {
        return Inertia::render('Managers/Hotel/HtDashboard');
    }
    public function stDashboard()
    {
        return Inertia::render('Managers/Pharmacie/stDashboard');
    }
    public function restauDashboard()
    {
        return Inertia::render('Managers/Restau/stDashboard');
    }
}
