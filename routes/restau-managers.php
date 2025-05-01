<?php

use App\Http\Controllers\Managers\Restau\CategorieMgsController;
use App\Http\Controllers\Managers\Restau\ImgsController;
use App\Http\Controllers\Managers\Restau\RepasCommandeMgsController;
use App\Http\Controllers\Managers\Restau\RepasManagersController;
use App\Http\Controllers\Managers\Restau\ReservationMgsController;
use App\Http\Controllers\Managers\Restau\RestauManagersController;
use App\Http\Controllers\Managers\Restau\RestauMetaController;
use App\Http\Controllers\Managers\Restau\VarMgsController;




Route::prefix('managers')->group(function (){

    Route::resource('mgs-restaurant', RestauManagersController::class)->middleware('auth');
    Route::post('/restaurant/{restaurant}/update-image', [RestauManagersController::class, 'updateImage'])->name('mgs-restaurant.updateImage')->middleware('auth');
    Route::get('/restaurants/{restaurant}/informations-supplementaires/create', [RestauMetaController::class, 'create'])
        ->name('mgs-restaurants.informations-supplementaires.create');
    Route::post('/restaurants/{restaurant}/informations-supplementaires', [RestauMetaController::class, 'store'])
        ->name('mgs-restaurants.informations-supplementaires.restaurant');
    Route::delete('/restaurants/{restaurant}/informations-supplementaires/{meta}', [RestauMetaController::class, 'destroy'])
        ->name('mgs-restaurants.informations-supplementaires.destroy');

    Route::resource('/mgs-repas', RepasManagersController::class)->middleware('auth');
    Route::post('/commande-repas/repas/{repas}/update-image', [RepasManagersController::class, 'updateImage'])
        ->name('mgs-repas.updateImage')->middleware('auth');
    // Routes pour les variations de repas
    Route::get('/repas/{repas}/variations/create', [VarMgsController::class, 'create'])
        ->name('mgs-repas.variations.create')->middleware('auth'); // Afficher le formulaire de création

    Route::post('/repas/{repas}/variations', [VarMgsController::class, 'store'])
        ->name('mgs-repas.variations.store')->middleware('auth');// Enregistrer une nouvelle variation

    Route::delete('/repas/{repas}/variations/{variation}', [VarMgsController::class, 'destroy'])
        ->name('mgs-repas.variations.destroy')->middleware('auth');
// Routes pour les images secondaires des repas
    Route::get('/repas/{repas}/images-secondaires/create', [ImgsController::class, 'create'])
    ->name('mgs-repas.images-secondaires.create')->middleware('auth'); // Afficher le formulaire d'ajout d'images secondaires

    Route::post('/repas/{repas}/images-secondaires', [ImgsController::class, 'store'])
        ->name('mgs-repas.images-secondaires.store')->middleware('auth'); // Enregistrer une nouvelle image secondaire

    Route::delete('/repas/{repas}/images-secondaires/{image}', [ImgsController::class, 'destroy'])
        ->name('mgs-repas.images-secondaires.destroy')->middleware('auth');

    Route::resource('/mgs-categorie-repas', CategorieMgsController::class)->middleware('auth');
    Route::post('/mgs-categorie-repas/{categorieRepas}/image', [CategorieMgsController::class, 'updateImage'])
    ->name('mgs-categorie-repas.updateImage')->middleware('auth');

    Route::get('/reservations-liste', [ReservationMgsController::class, 'index'])
    ->name('mgs-reservations-table.index')->middleware('auth');
     // Valider une réservation
     Route::post('/reservations/{id}/valider', [ReservationMgsController::class, 'valider'])
     ->name('mgs-rest.reservations.valider')->middleware('auth');

     // Supprimer une réservation
     Route::delete('/reservations/{id}', [ReservationMgsController::class, 'destroy'])
     ->name('mgs-rest.reservations.destroy')->middleware('auth');

     Route::get('/commandes-repas', [RepasCommandeMgsController::class, 'index'])
        ->name('mgs-commandes-repas.index')->middleware('auth');
});
