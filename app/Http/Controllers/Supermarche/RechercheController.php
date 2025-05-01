<?php

namespace App\Http\Controllers\Supermarche;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Supermarche\Produit;
use App\Http\Controllers\Controller;

class RechercheController extends Controller
{
    public function index(Request $request)
    {
        // Récupérer le terme de recherche depuis la requête
        $term = $request->query('q');

        // Effectuer la recherche dans la base de données
        $produits = Produit::with(['categories', 'tags', 'imagesSecondaires','store']) // Charger les relations
            ->where(function ($query) use ($term) {
                $query->where('nom', 'LIKE', "%{$term}%")
                    ->orWhere('description_courte', 'LIKE', "%{$term}%")
                    ->orWhere('description', 'LIKE', "%{$term}%")
                    ->orWhereHas('categories', function ($q) use ($term) {
                        $q->where('nom', 'LIKE', "%{$term}%");
                    })
                    ->orWhereHas('tags', function ($q) use ($term) {
                        $q->where('nom', 'LIKE', "%{$term}%");
                    });
            })
            ->where('statut', 'actif') // Filtrer uniquement les produits actifs
            ->get();
            // dd($produits);
        // Retourner les résultats à la vue Inertia
        return Inertia::render('Supermarche/Recherche', [
            'produits' => $produits,
            'term' => $term,
            'appUrl' => config('app.url'),
        ]);
    }
}
