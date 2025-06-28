<?php

use App\Http\Controllers\Managers\Supermarche\SpCategorieController;
use App\Http\Controllers\Managers\Supermarche\SpCommandeController;
use App\Http\Controllers\Managers\Supermarche\SpImageController;
use App\Http\Controllers\Managers\Supermarche\SpMetaController;
use App\Http\Controllers\Managers\Supermarche\SpProductController;
use App\Http\Controllers\Managers\Supermarche\SpVariationController;
use App\Http\Controllers\Managers\VendeurController;
use App\Http\Controllers\Managers\VendeurStoreController;
use App\Http\Controllers\Supermarche\Vendeur\StoreController;




Route::get('/vendeur/services-select', [VendeurController::class, 'devenirVendeur'])->name('vendeur.index')->middleware('auth');
Route::get('/vendeur/services-avantage', [VendeurController::class, 'avantageVendeur'])->name('vendeur.avantage');
Route::get('/vendeur/market-store-form', [VendeurController::class, 'marketStoreForm'])->name('vendeur.market.store.form')->middleware('auth');
Route::get('/vendeur/restau-store-form', [VendeurController::class, 'restauStoreForm'])->name('vendeur.restau.store.form')->middleware('auth');
Route::get('/vendeur/pharmacie-store-form', [VendeurController::class, 'pharmacieStoreForm'])->name('vendeur.pharmacie.store.form')->middleware('auth');
Route::get('/vendeur/hotel-store-form', [VendeurController::class, 'hotelStoreForm'])->name('vendeur.hotel.store.form')->middleware('auth');

Route::prefix('supermarche/managers')->group(function () {
    Route::resource('stores-managers', VendeurStoreController::class);
    Route::post('/stores/{store}/update-image', [VendeurStoreController::class, 'updateImage'])
        ->name('stores-managers.update-image')->middleware('auth');

    Route::get('/stores/{store}/informations-supplementaires/create', [SpMetaController::class, 'create'])
        ->name('stores-managers.informations-supplementaires.create');
    Route::post('/stores/{store}/informations-supplementaires', [SpMetaController::class, 'store'])
        ->name('stores-managers.informations-supplementaires.store');
    Route::delete('/stores/{store}/informations-supplementaires/{meta}', [SpMetaController::class, 'destroy'])
        ->name('stores-managers.informations-supplementaires.destroy');

    Route::get('dashboard', [VendeurController::class, 'marketDashboard'])->name('market.dashboard')->middleware('auth');

    Route::resource('/mds-produits', SpProductController::class)->middleware('auth');
    Route::get('/mds-magasins', [VendeurStoreController::class, 'fetchStore']);
    // Route pour afficher le formulaire de mise à jour de l'image
    Route::get('mds-produits/{produit}/edit-image', [SpProductController::class, 'editImage'])
    ->name('mds-produits.edit-image')->middleware('auth');
    Route::post('mds-produits/{produit}/update-image', [SpProductController::class, 'updateImage'])
    ->name('mds-produits.update-image')->middleware('auth');

    // Affichage du formulaire d'ajout d'images secondaires pour un produit spécifique
    Route::get('mds-produits/{produit}/ajouter-images', [SpImageController::class, 'showAddSecondaryImagesForm'])->name('mds-produits.ajouter-images')->middleware('auth');
    Route::post('mds-produits/{produit}/images', [SpImageController::class, 'storeImages']);
    Route::delete('/supermarche/images-secondaire/{imageSecondaire}', [SpImageController::class, 'destroy'])->name('mds-imagesSecondaires.destroy')->middleware('auth');

    // Affichage du formulaire d'ajout d'images secondaires pour un produit spécifique
    Route::get('produits/{produit}/ajouter-variation', [SpVariationController::class, 'show'])->name('mds-produits.variations.show')->middleware('auth');
    Route::post('/produits/{produit}/variations', [SpVariationController::class, 'store'])->name('mds-produits.variations.store')->middleware('auth');
    Route::delete('/supermarche/variations/{variation}', [SpVariationController::class, 'destroy'])->name('mds-produits.variations.destroy')->middleware('auth');

    // Gestion des catégories
    Route::resource('mds-categories', SpCategorieController::class)->middleware('auth');
    Route::get('/new-create/categories', [SpCategorieController::class, 'create'])
            ->name('mds-categories.newCreate')->middleware('auth');
    Route::put('/image-categories/{categorie}/update-image', [SpCategorieController::class, 'updateImage'])
    ->name('mds-categories.update-image')->middleware('auth');
    // Traiter la soumission du formulaire
    Route::post('/new-categories', [SpCategorieController::class, 'storeNewCategorie'])
        ->name('mds-categories.newStore')->middleware('auth');

    Route::get('/mes-commandes', [SpCommandeController::class, 'index'])->name('mds-commandes.index')->middleware('auth');


})->middleware('auth');
Route::prefix('hotel/managers')->group(function () {
    Route::resource('hotel-managers', VendeurStoreController::class);
    Route::get('dashboard', [VendeurController::class, 'marketDashboard'])->name('ht-market.dashboard')->middleware('auth');
})->middleware('auth');
Route::prefix('pharmacie/managers')->group(function () {
    Route::resource('pharmacie-managers', VendeurStoreController::class);
    Route::get('dashboard', [VendeurController::class, 'marketDashboard'])->name('st-market.dashboard')->middleware('auth');
})->middleware('auth');
