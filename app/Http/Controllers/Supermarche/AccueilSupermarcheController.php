<?php

namespace App\Http\Controllers\Supermarche;

use App\Http\Controllers\Controller;
use App\Models\Global\PromoBan;
use App\Models\Supermarche\Categorie;
use App\Models\Supermarche\Produit;
use App\Models\Supermarche\SmBanner;
use App\Models\Supermarche\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AccueilSupermarcheController extends Controller
{
    public function index()
    {
        // Récupérer uniquement les produits marqués comme populaires
        $produitsPopulaires = Produit::where('est_populaire', true)
            ->where('statut', 'actif') // Ne récupérer que les produits actifs
            ->with('store')
            ->select('id', 'nom', 'slug', 'prix', 'pourcentage_reduction', 'image_principale','store_id')
            ->take(10) // Limiter à 10 produits
            ->get()
            ->toArray();

        // Récupérer uniquement les produits en promotion
        $bestOffers = Produit::whereNotNull('pourcentage_reduction') // Produits avec un pourcentage de réduction non nul
            ->where('statut', 'actif') // Ne récupérer que les produits actifs
            ->with('store')
            ->select('id', 'nom', 'slug', 'prix', 'pourcentage_reduction', 'image_principale', 'store_id') // Champs nécessaires
            ->take(10) // Limiter à 10 produits
            ->get()
            ->toArray();
        // dd($bestOffers);

        // Récupérer les 20 derniers produits ajoutés
        $nouveauxProduits = Produit::where('statut', 'actif')
            ->with('store')
            ->orderBy('created_at', 'desc') // Trier par date de création décroissante
            ->select('id', 'nom', 'slug', 'prix', 'image_principale','store_id')
            ->take(20) // Limiter à 20 produits
            ->get()
            ->toArray();
        // Récupérer les catégories depuis la base de données
        $categories = Categorie::all();
        $stores = Store::all(); // Récupérer tous les stores

        $ligne1 = PromoBan::where("statut", 1)->where("emplacement", "ligne_1")->get();
        $ligne2 = PromoBan::where("statut", 1)->where("emplacement", "ligne_2")->get();
        $ligne3 = PromoBan::where("statut", 1)->where("emplacement", "ligne_3")->get();
        $gauche = PromoBan::where("statut", 1)->where("emplacement", "gauche")->get();
        $droite = PromoBan::where("statut", 1)->where("emplacement", "droite")->get();
        // Retourner les données à la vue Inertia
        return Inertia::render('Supermarche/SupermarcheAccueil', [
            'produitsPopulaires' => $produitsPopulaires,
            'bestOffers' => $bestOffers,
            'nouveauxProduits' => $nouveauxProduits,
            'categories' => $categories,
            'stores' => $stores,
            'ligne1' => $ligne1,
            'ligne2' => $ligne2,
            'ligne3' => $ligne3,
            'gauche' => $gauche,
            'droite' => $droite,
            'appUrl' => config('app.url'),
        ]);
    }

    public function afficherProduitsParStatut($statut)
    {
        // Définir la requête de base
        $query = Produit::where('statut', 'actif');

        // Filtrer en fonction du statut
        switch ($statut) {
            case 'nouveaux':
                $query->orderBy('created_at', 'desc'); // Trier par date de création décroissante
                break;
            case 'meilleures-offres':
                $query->whereNotNull('pourcentage_reduction'); // Produits avec réduction
                break;
            case 'produits-populaires':
                $query->where('est_populaire', true); // Produits marqués comme populaires
                break;
            default:
                // Rediriger vers une page d'erreur ou la page d'accueil
                return redirect()->route('accueil');
        }

        // Récupérer les produits paginés
        $produits = $query->select('id', 'nom', 'slug', 'prix', 'pourcentage_reduction', 'image_principale','store_id')
            ->with('store')
            ->paginate(20);

        // Retourner la vue Inertia avec les produits et le statut
        return Inertia::render('Supermarche/ProduitsParStatut', [
            'produits' => $produits,
            'statut' => $statut,
            'appUrl' => config('app.url'),
        ]);
    }

    public function show($slug)
    {
        $produit = Produit::where('slug', $slug)->firstOrFail();
        // Charge les relations nécessaires
        $produit->load([
            'store',
            'categories',
            'tags',
            'variations',
            'imagesSecondaires', // Assurez-vous que cette relation est correctement nommée
            'variations.images', // Charger les images des variations
        ]);

        // Formate les URLs des images secondaires
        $produit->imagesSecondaires = $produit->imagesSecondaires->map(function ($image) {
            return [
                'id' => $image->id,
                'url' => Storage::url($image->url), // Utilisez Storage::url pour générer l'URL
            ];
        });

        // Récupère les produits similaires
        $produitsSimilaires = Produit::whereHas('categories', function ($query) use ($produit) {
            $query->whereIn('categories.id', $produit->categories->pluck('id'));
        })
        ->where('produits.id', '!=', $produit->id)
        ->where('statut', 'actif')
        ->select('produits.id', 'nom', 'slug', 'prix', 'pourcentage_reduction', 'image_principale')
        ->get();

        // Retourne la vue Inertia avec les données
        return Inertia::render('Supermarche/ProductPage', [
            'produit' => $produit,
            'produitsSimilaires' => $produitsSimilaires,
            'appUrl' => config('app.url'),
        ]);
    }
}
