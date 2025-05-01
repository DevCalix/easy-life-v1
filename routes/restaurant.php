<?php

use App\Http\Middleware\IsAdmin;
use App\Http\Controllers\Restaurant\RepasController;
use App\Http\Controllers\Restaurant\TagRestauController;
use App\Http\Controllers\Restaurant\RestaurantController;
use App\Http\Controllers\Restaurant\RestProfilController;
use App\Http\Controllers\Restaurant\ReservationController;
use App\Http\Controllers\Restaurant\CategorieRepasController;
use App\Http\Controllers\Restaurant\RestaurantMetaController;
use App\Http\Controllers\Restaurant\VariationRepasController;
use App\Http\Controllers\Restaurant\GlobalRestaurantController;
use App\Http\Controllers\Restaurant\RestaurantPanierController;
use App\Http\Controllers\Restaurant\RestaurantPaiementController;
use App\Http\Controllers\Restaurant\ImageSecondaireRepasController;
Route::prefix('commande-repas')->middleware('transfert.panier')->group(function(){
    Route::get('/', [GlobalRestaurantController::class, 'index'])->name('accueil.restaurant');
    Route::resource('restaurant', RestaurantController::class)->middleware(IsAdmin::class);
    Route::post('/restaurant/{restaurant}/update-image', [RestaurantController::class, 'updateImage'])->name('restaurant.updateImage')->middleware(IsAdmin::class);
    Route::resource('/categorie-repas', CategorieRepasController::class)->middleware(IsAdmin::class);
    Route::post('/categorie-repas/{categorieRepas}/image', [CategorieRepasController::class, 'updateImage'])
    ->name('categorie-repas.updateImage')->middleware(IsAdmin::class);

    //Repas
    Route::resource('/repas', RepasController::class)->middleware(IsAdmin::class);
    Route::resource('/repas/tagrepas', TagRestauController::class)->middleware(IsAdmin::class);
    Route::post('/commande-repas/repas/{repas}/update-image', [RepasController::class, 'updateImage'])
    ->name('repas.updateImage')->middleware(IsAdmin::class);
    // Routes pour les variations de repas
    Route::get('/repas/{repas}/variations/create', [VariationRepasController::class, 'create'])
        ->name('repas.variations.create')->middleware(IsAdmin::class); // Afficher le formulaire de création

    Route::post('/repas/{repas}/variations', [VariationRepasController::class, 'store'])
        ->name('repas.variations.store')->middleware(IsAdmin::class);// Enregistrer une nouvelle variation

    Route::delete('/repas/{repas}/variations/{variation}', [VariationRepasController::class, 'destroy'])
        ->name('repas.variations.destroy')->middleware(IsAdmin::class); // Supprimer une variation

        // Routes pour les images secondaires des repas
    Route::get('/repas/{repas}/images-secondaires/create', [ImageSecondaireRepasController::class, 'create'])
    ->name('repas.images-secondaires.create')->middleware(IsAdmin::class); // Afficher le formulaire d'ajout d'images secondaires

    Route::post('/repas/{repas}/images-secondaires', [ImageSecondaireRepasController::class, 'store'])
        ->name('repas.images-secondaires.store')->middleware(IsAdmin::class); // Enregistrer une nouvelle image secondaire

    Route::delete('/repas/{repas}/images-secondaires/{image}', [ImageSecondaireRepasController::class, 'destroy'])
    ->name('repas.images-secondaires.destroy')->middleware(IsAdmin::class); // Supprimer une image secondaire

    // Route pour afficher les repas d'une catégorie spécifique
    Route::get('/repas-par-categories/{slug}', [GlobalRestaurantController::class, 'afficherRepasParCategorie'])->name('categories-repas.show');

    // Route pour afficher les details d'un repas
    Route::get('/repas/{slug}/details', [GlobalRestaurantController::class, 'detailRepas'])
        ->name('repas.details');

    // Route pour afficher les détails d'un restaurant et ses repas
    Route::get('/restaurant/{restaurant}/menu', [GlobalRestaurantController::class, 'menu'])
        ->name('restaurant.menu');

    // Route pour afficher toutes les meilleures offres
    Route::get('/meilleures-offres', [GlobalRestaurantController::class, 'toutesLesMeilleuresOffres'])
        ->name('meilleures-offres.toutes');

    // Route pour afficher tous les restaurants populaires
    Route::get('/restaurants-populaires', [GlobalRestaurantController::class, 'tousLesRestaurantsPopulaires'])
        ->name('restaurants-populaires.tous');

    // Route pour afficher tous les plats populaires
    Route::get('/plats-populaires', [GlobalRestaurantController::class, 'tousLesPlatsPopulaires'])
        ->name('plats-populaires.tous');

    // Route pour afficher tous les restaurants proches
    Route::get('/restaurants-proches', [GlobalRestaurantController::class, 'tousLesRestaurantsProches'])
        ->name('restaurants-proches.tous');

    Route::get('/recherche', [GlobalRestaurantController::class, 'rechercherRepas'])
    ->name('restaurant.recherche');

    Route::get('/recherche-suggestions', [GlobalRestaurantController::class, 'suggestionsRecherche'])
        ->name('restaurant.suggestions');

    // Routes pour le panier
    Route::prefix('panier')->group(function () {
        Route::get('/', [RestaurantPanierController::class, 'afficher'])->name('panier.afficher'); // Afficher le panier
        Route::post('/ajouter', [RestaurantPanierController::class, 'ajouter'])->name('panier.ajouter'); // Ajouter un repas au panier
        Route::delete('/supprimer/{id}', [RestaurantPanierController::class, 'supprimer'])->name('panier.supprimer'); // Supprimer un repas du panier
        Route::post('/vider', [RestaurantPanierController::class, 'vider'])->name('panier.vider'); // Vider le panier
        Route::get('/afficher', [RestaurantPanierController::class, 'afficherPanier'])->name('panier.page'); // Afficher la page du panier
        Route::put('/mettre-a-jour-quantite/{id}', [RestaurantPanierController::class, 'mettreAJourQuantite'])
        ->name('panier.mettre-a-jour-quantite');
    });
    Route::get('/paiement', [RestaurantPaiementController::class, 'afficher'])->name('commande-repas.paiement');
    Route::post('/paiement/enregistrer-commande', [RestaurantPaiementController::class, 'enregistrerCommande'])->name('commande-repas.paiements');

    // Routes pour les réservations
    Route::get('/reservations/create', [ReservationController::class, 'create'])
        ->name('reservations-table.create')->middleware('auth'); // Afficher le formulaire de réservation

    Route::post('/reservations-table', [ReservationController::class, 'store'])
        ->name('reservations-table.store'); // Enregistrer une nouvelle réservation
    Route::get('/reservations-liste', [ReservationController::class, 'index'])
    ->name('reservations-table.index')->middleware(IsAdmin::class);
     // Valider une réservation
     Route::post('/reservations/{id}/valider', [ReservationController::class, 'valider'])
     ->name('rest.reservations.valider')->middleware(IsAdmin::class);

     // Supprimer une réservation
     Route::delete('/reservations/{id}', [ReservationController::class, 'destroy'])
     ->name('rest.reservations.destroy')->middleware(IsAdmin::class);

    Route::post('/paiement/enregistrer-commande', [RestaurantPaiementController::class, 'enregistrerCommande'])->name('commande-repas.paiements');
    Route::get('/paiement/success/{reference}', [RestaurantPaiementController::class, 'afficherSuccess'])
    ->name('commande-repas.paiement.success');

    Route::get('/paiement-direct', [RestaurantPaiementController::class, 'paiementDirect'])
    ->name('commande-repas.paiement.direct');
    Route::get('/profile', [RestProfilController::class, 'stProfil'])->name('profile.restUser');

    Route::get('/restaurants/{restaurant}/informations-supplementaires/create', [RestaurantMetaController::class, 'create'])
        ->name('restaurants.informations-supplementaires.create');
    Route::post('/restaurants/{restaurant}/informations-supplementaires', [RestaurantMetaController::class, 'store'])
        ->name('restaurants.informations-supplementaires.restaurant');
    Route::delete('/restaurants/{restaurant}/informations-supplementaires/{meta}', [RestaurantMetaController::class, 'destroy'])
        ->name('restaurants.informations-supplementaires.destroy');



});
