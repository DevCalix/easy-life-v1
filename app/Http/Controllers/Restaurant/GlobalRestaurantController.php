<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\Global\PromoBan;
use App\Models\Restaurant\CategorieRepas;
use App\Models\Restaurant\Repas;
use App\Models\Restaurant\Restaurant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GlobalRestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer les catégories depuis la base de données
        $categories = CategorieRepas::all();

        // Récupérer les repas avec des réductions ou des offres spéciales
        $meilleuresOffres = Repas::whereNotNull('reduction')->with('restaurant')->get();

        // Récupérer les restaurants populaires (par exemple, ceux avec les meilleures notes)
        $restaurantsPopulaires = Restaurant::orderBy('rating', 'desc') // Trie par note décroissante
            ->limit(20) // Limite à 20 restaurants
            ->get();

        // Récupérer les repas populaires (par exemple, ceux avec les meilleures notes ou les plus commandés)
        $repasPopulaires = Repas::where('est_populaire', true)
        ->with('restaurant')
        ->limit(20) // Limite à 20 repas
        ->get();

        $ligne1 = PromoBan::where("statut", 1)->where("emplacement", "resto_ligne_1")->get();
        $ligne2 = PromoBan::where("statut", 1)->where("emplacement", "resto_ligne_2")->get();
        $ligne3 = PromoBan::where("statut", 1)->where("emplacement", "resto_ligne_3")->get();
        $gauche = PromoBan::where("statut", 1)->where("emplacement", "resto_gauche")->get();
        $droite = PromoBan::where("statut", 1)->where("emplacement", "resto_droite")->get();

        return Inertia::render('CommandeRepas/AccueilResto', [
            'categories' => $categories,
            'meilleuresOffres' => $meilleuresOffres,
            'restaurantsPopulaires' => $restaurantsPopulaires,
            'repasPopulaires' => $repasPopulaires,
            'ligne1' => $ligne1,
            'ligne2' => $ligne2,
            'ligne3' => $ligne3,
            'gauche' => $gauche,
            'droite' => $droite,
        ]);
    }



    public function afficherRepasParCategorie($slug)
    {
        // Récupérer la catégorie par son slug
        $categorie = CategorieRepas::where('slug', $slug)->firstOrFail();
        // Récupérer les repas associés à cette catégorie
        $repas = Repas::where('categorie_repas_id', $categorie->id)->get();

        // Passer les données à la vue Inertia
        return Inertia::render('CommandeRepas/CategorieRepas/RepasParCategorie', [
            'categorie' => $categorie,
            'repas' => $repas,
        ]);
    }

    /**
     * Affiche la page de détail d'un repas.
     */

     public function detailRepas($slug)
{
    // Récupérer le repas par son slug avec les relations nécessaires
    $repas = Repas::where('slug', $slug)
        ->with([
            'imagesSecondairesRepas',
            'variations',
            'restaurant',
            'categorie',
            'tags',
        ])
        ->firstOrFail();

    // Récupérer les repas similaires (même catégorie)
    $repasSimilaire = Repas::where('categorie_repas_id', $repas->categorie_repas_id)
        ->where('id', '!=', $repas->id) // Exclure le repas actuel
        ->with('restaurant')
        ->limit(20)
        ->get();

    // Récupérer les boissons du même restaurant
    $boissons = Repas::where('restaurant_id', $repas->restaurant_id)
        ->whereHas('categorie', function ($query) {
            $query->where('nom', 'Boissons'); // Filtrer par catégorie "Boissons"
        })
        ->with('restaurant')
        ->get();

    // Formater les données pour la vue Inertia
    $formattedRepas = [
        'id' => $repas->id,
        'nom' => $repas->nom,
        'description' => $repas->description,
        'prix' => $repas->prix_reduit ? $repas->prix_reduit . ' XOF' : $repas->prix . ' XOF',
        'photo' => $repas->photo,
        'rating' => $repas->rating,
        'slug' => $repas->slug,
        'imagesSecondairesRepas' => $repas->imagesSecondairesRepas->map(function ($image) {
            return [
                'id' => $image->id,
                'url_image' => $image->url_image,
            ];
        }),
        'variations' => $repas->variations->map(function ($variation) {
            return [
                'id' => $variation->id,
                'type_variation' => $variation->type_variation,
                'valeur_variation' => $variation->valeur_variation,
                'prix' => $variation->prix . ' XOF',
                'image_variation' => $variation->image_variation,
            ];
        }),
        'restaurant' => [
            'id' => $repas->restaurant->id,
            'nom' => $repas->restaurant->nom,
            'adresse' => $repas->restaurant->adresse,
            'photo_restaurant' => $repas->restaurant->photo_restaurant,
        ],
        'categorie' => [
            'id' => $repas->categorie->id,
            'nom' => $repas->categorie->nom,
            'slug' => $repas->categorie->slug,
        ],
        'tags' => $repas->tags->map(function ($tag) {
            return [
                'id' => $tag->id,
                'nom' => $tag->nom,
                'slug' => $tag->slug,
            ];
        }),
    ];

    // Formater les repas similaires
    $formattedRepasSimilaire = $repasSimilaire->map(function ($repas) {
        return [
            'id' => $repas->id,
            'nom' => $repas->nom,
            'prix' => $repas->prix_reduit ? $repas->prix_reduit . ' XOF' : $repas->prix . ' XOF',
            'photo' => $repas->photo,
            'slug' => $repas->slug,
            'restaurant' => [
                'nom' => $repas->restaurant->nom,
            ],
        ];
    });

    // Formater les boissons
    $formattedBoissons = $boissons->map(function ($boisson) {
        return [
            'id' => $boisson->id,
            'nom' => $boisson->nom,
            'prix' => $boisson->prix_reduit ? $boisson->prix_reduit . ' XOF' : $boisson->prix . ' XOF',
            'photo' => $boisson->photo,
            'slug' => $boisson->slug,
            'restaurant' => [
                'nom' => $boisson->restaurant->nom,
            ],
        ];
    });

    // Retourner la vue Inertia avec les données formatées
    return Inertia::render('CommandeRepas/RepasPage', [
        'repas' => $formattedRepas,
        'repasSimilaire' => $formattedRepasSimilaire,
        'boissons' => $formattedBoissons, // Ajouter les boissons
    ]);
}

     public function menu($restaurantId)
    {
        // Récupérer le restaurant par son ID
        $restaurant = Restaurant::findOrFail($restaurantId);
        $restaurant->load('metas');
        // Récupérer les repas du restaurant
        $repas = Repas::where('restaurant_id', $restaurantId)
            ->with(['imagesSecondairesRepas', 'variations'])
            ->get();

        // Formater les données pour la vue Inertia
        $formattedRepas = $repas->map(function ($repas) {
            return [
                'id' => $repas->id,
                'nom' => $repas->nom,
                'photo' => $repas->photo,
                'prix' => $repas->prix_reduit ? $repas->prix_reduit . ' XOF' : $repas->prix . ' XOF',
                'slug' => $repas->slug,
            ];
        });

        return Inertia::render('CommandeRepas/Restaurant/RepasParRestaurant', [
            'restaurant' => $restaurant,
            'repas' => $formattedRepas,
        ]);
    }

    /**
     * Affiche toutes les meilleures offres.
     */
    public function toutesLesMeilleuresOffres()
    {
        $meilleuresOffres = Repas::whereNotNull('reduction')
            ->with('restaurant')
            ->get();

        return Inertia::render('CommandeRepas/ParSection/ToutesLesMeilleuresOffres', [
            'meilleuresOffres' => $meilleuresOffres,
        ]);
    }

    /**
     * Affiche tous les restaurants populaires.
     */
    public function tousLesRestaurantsPopulaires()
    {
        $restaurantsPopulaires = Restaurant::orderBy('rating', 'desc')
            ->get();

        return Inertia::render('CommandeRepas/ParSection/TousLesRestaurantsPopulaires', [
            'restaurantsPopulaires' => $restaurantsPopulaires,
        ]);
    }

    /**
     * Affiche tous les plats populaires.
     */
    public function tousLesPlatsPopulaires()
    {
        $platsPopulaires = Repas::where('est_populaire', true)
            ->with('restaurant')
            ->get();

        return Inertia::render('CommandeRepas/ParSection/TousLesPlatsPopulaires', [
            'platsPopulaires' => $platsPopulaires,
        ]);
    }

    /**
     * Affiche tous les restaurants proches.
     */
    public function tousLesRestaurantsProches()
    {
        $restaurantsProches = Restaurant::orderBy('created_at', 'desc') // Exemple de tri
            ->get();

        return Inertia::render('CommandeRepas/TousLesRestaurantsProches', [
            'restaurantsProches' => $restaurantsProches,
        ]);
    }

    /**
     * Affiche les résultats de la recherche.
     */
    public function rechercherRepas(Request $request)
    {
        // Récupérer le terme de recherche
        $query = $request->input('q');

        // Rechercher les repas correspondants
        $resultats = Repas::where('nom', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->with('restaurant') // Charger les informations du restaurant associé
            ->paginate(30); // Paginer les résultats

        return Inertia::render('CommandeRepas/Recherche/ResultatsRecherche', [
            'resultats' => $resultats,
            'query' => $query, // Passer le terme de recherche à la vue
        ]);
    }

    /**
     * Renvoie les suggestions de recherche en temps réel.
     */
    public function suggestionsRecherche(Request $request)
    {
        // Récupérer le terme de recherche
        $query = $request->input('q');

        // Rechercher les repas correspondants
        $suggestions = Repas::where('nom', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->limit(10) // Limiter à 5 suggestions
            ->get(['id', 'nom']);

        return response()->json($suggestions);
    }


}
