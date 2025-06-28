<?php

use App\Http\Controllers\Supermarche\AccueilSupermarcheController;
use App\Http\Controllers\Supermarche\CategorieSupermarcheController;
use App\Http\Controllers\Supermarche\CommandeSupermarcheController;
use App\Http\Controllers\Supermarche\ImageController;
use App\Http\Controllers\Supermarche\PaiementController;
use App\Http\Controllers\Supermarche\PanierController;
use App\Http\Controllers\Supermarche\PanierSupermarcheController;
use App\Http\Controllers\Supermarche\ProduitSupermarcheController;
use App\Http\Controllers\Supermarche\RechercheController;
use App\Http\Controllers\Supermarche\SmBannerController;
use App\Http\Controllers\Supermarche\SpProfilController;
use App\Http\Controllers\Supermarche\StoreController;
use App\Http\Controllers\Supermarche\SupermarcheMetaController;
use App\Http\Controllers\Supermarche\TagSupermarcheController;
use App\Http\Controllers\Supermarche\VariationSupermarcheController;
use App\Http\Middleware\IsAdmin;


Route::prefix('supermarche')->group(function () {
    // Page d'accueil du supermarché
    Route::get('/', [AccueilSupermarcheController::class, 'index'])->name('supermarche.accueil');

    // Gestion des catégories
    Route::resource('categories', CategorieSupermarcheController::class)->middleware(IsAdmin::class);
    Route::get('produit-par-categories/{slug}', [CategorieSupermarcheController::class, 'show'])->name('produit.categorie.sup');
    // Afficher le formulaire de création de catégorie
    Route::get('/new-create/categories', [CategorieSupermarcheController::class, 'create'])
        ->name('categories.newCreate')->middleware(IsAdmin::class);

    Route::put('/image-categories/{categorie}/update-image', [CategorieSupermarcheController::class, 'updateImage'])
    ->name('categories.update-image')->middleware(IsAdmin::class);

    // Traiter la soumission du formulaire
    Route::post('/new-categories', [CategorieSupermarcheController::class, 'storeNewCategorie'])
        ->name('categories.newStore')->middleware(IsAdmin::class);

    // Gestion des tags
    Route::resource('tags', TagSupermarcheController::class)->middleware('auth');

    // Gestion des produits
    Route::resource('produits', ProduitSupermarcheController::class)->middleware(IsAdmin::class);
    // Route unique pour afficher les produits par statut
    Route::get('produits/statut/{statut}', [AccueilSupermarcheController::class, 'afficherProduitsParStatut'])
    ->name('produits-par-statut');
    Route::get('produits/page-produit/{slug}', [AccueilSupermarcheController::class, 'show'])
    ->name('page-produit');

    // Gestion du panier
    Route::resource('panier', PanierSupermarcheController::class);

    // Gestion des commandes
    Route::resource('commandes', CommandeSupermarcheController::class);

    // Affichage du formulaire d'ajout d'images secondaires pour un produit spécifique
    Route::get('produits/{produit}/ajouter-images', [ImageController::class, 'showAddSecondaryImagesForm'])->name('produits.ajouter-images')->middleware(IsAdmin::class);
    Route::post('produits/{produit}/images', [ImageController::class, 'storeImages'])->middleware(IsAdmin::class);
    Route::delete('/supermarche/images-secondaire/{imageSecondaire}', [ImageController::class, 'destroy'])->name('imagesSecondaires.destroy')->middleware(IsAdmin::class);

    // Affichage du formulaire d'ajout d'images secondaires pour un produit spécifique
    Route::get('produits/{produit}/ajouter-variation', [VariationSupermarcheController::class, 'show'])->name('produits.variations.show')->middleware(IsAdmin::class);
    Route::post('/produits/{produit}/variations', [VariationSupermarcheController::class, 'store'])->name('produits.variations.store')->middleware(IsAdmin::class);
    Route::delete('/supermarche/variations/{variation}', [VariationSupermarcheController::class, 'destroy'])->name('produits.variations.destroy')->middleware(IsAdmin::class);


    // Route pour afficher le formulaire de mise à jour de l'image
    Route::get('produits/{produit}/edit-image', [ProduitSupermarcheController::class, 'editImage'])
    ->name('produits.edit-image')->middleware(IsAdmin::class);
    Route::post('produits/{produit}/update-image', [ProduitSupermarcheController::class, 'updateImage'])
    ->name('produits.update-image')->middleware(IsAdmin::class);


    Route::get('/panier-commande', [PanierController::class, 'afficherPanier'])->name('panier');
    Route::get('/panier', [PanierController::class, 'afficher']); // Afficher le panier
    Route::post('/panier/ajouter', [PanierController::class, 'ajouter']); // Ajouter un produit
    Route::put('/panier/modifier/{id}', [PanierController::class, 'modifierQuantite'])->name('supermarche.panier.modifier');
    Route::delete('/panier/supprimer/{id}', [PanierController::class, 'supprimer']); // Supprimer un produit
    Route::post('/panier/vider', [PanierController::class, 'vider']); // Vider le panier
    Route::get('/paiement', [PaiementController::class, 'afficherPaiement'])->name('paiement');
    Route::post('/paiement/process', [PaiementController::class, 'processPayment'])->name('paiement.process');
    Route::post('/paiement/enregistrer-commande', [PaiementController::class, 'enregistrerCommande'])
    ->name('paiement.enregistrer-commande');
    Route::post('/paiement/enregistrer-commande-direct', [PaiementController::class, 'enregistrerCommandeDirect'])
    ->name('paiement.enregistrer-commandeDirect');

    Route::post('/paiement-direct', [PaiementController::class, 'mettreEnSession'])->name('sp-direct.session');
    Route::get('/paiement-direct', [PaiementController::class, 'PayerDirect'])->name('sp-direct.paiement');
    Route::post('/paiement-direct/enregistrer-commande', [PaiementController::class, 'enregistrerCommande'])->name('sp-direct.paiement.enregistrer');

    Route::post('/paiement/tester-enregistrement', [PaiementController::class, 'testerEnregistrementCommande'])
    ->name('paiement.tester-enregistrement');
    Route::get('/recherche', [RechercheController::class, 'index'])->name('supermarche.recherche');

    Route::resource('stores', StoreController::class)->middleware(IsAdmin::class);
    Route::get('/info-stores/{store}', [StoreController::class, 'show'])->name('info-stores');
    Route::post('/stores/{store}/update-image', [StoreController::class, 'updateImage'])
        ->name('stores.update-image')->middleware(IsAdmin::class);
    Route::get('/magasins', [StoreController::class, 'fetchStore']);
    Route::get('/profile', [SpProfilController::class, 'stProfil'])->name('profile.spUser');

    Route::get('/stores/{store}/informations-supplementaires/create', [SupermarcheMetaController::class, 'create'])
        ->name('stores.informations-supplementaires.create');
    Route::post('/stores/{store}/informations-supplementaires', [SupermarcheMetaController::class, 'store'])
        ->name('stores.informations-supplementaires.store');
    Route::delete('/stores/{store}/informations-supplementaires/{meta}', [SupermarcheMetaController::class, 'destroy'])
        ->name('stores.informations-supplementaires.destroy');


});
