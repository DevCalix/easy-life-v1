<?php

use App\Http\Controllers\Managers\Hotels\HtGestionChambreController;
use App\Http\Controllers\Managers\Hotels\HtGestionController;
use App\Http\Controllers\Managers\Hotels\HtGestionMetaController;
use App\Http\Controllers\Managers\Hotels\HtGestionPromotionController;
use App\Http\Controllers\Managers\Hotels\HtGestionReservationController;


Route::prefix('hotel/managers')->group(function(){
    Route::resource('mgs-hotels', HtGestionController::class)->middleware('auth');

    // Routes pour la gestion des images
    Route::get('/hotels/{hotel}/images', [HtGestionController::class, 'showImages'])
    ->name('mgs-hotels.show-images')->middleware('auth');

    Route::post('/hotels/{hotel}/update-image-principale', [HtGestionController::class, 'updateImagePrincipale'])
    ->name('mgs-hotels.update-image-principale')->middleware('auth');

    Route::post('/hotels/{hotel}/add-image-secondaire', [HtGestionController::class, 'addImageSecondaire'])
    ->name('mgs-hotels.add-image-secondaire')->middleware('auth');

    Route::delete('/hotels/images/{image}', [HtGestionController::class, 'deleteImageSecondaire'])
    ->name('mgs-hotels.delete-image-secondaire')->middleware('auth');

    Route::post('/mgs-hotels/{hotel}/update-image', [HtGestionController::class, 'updateImage'])
        ->name('mgs-hotels.update-image')->middleware('auth');

    Route::get('/mgs-hotels/{hotel}/informations-supplementaires/create', [HtGestionMetaController::class, 'create'])
        ->name('mgs-hotels.informations-supplementaires.create');
    Route::post('/mgs-hotels/{hotel}/informations-supplementaires', [HtGestionMetaController::class, 'store'])
        ->name('mgs-hotels.informations-supplementaires.store');
    Route::delete('/mgs-hotels/{hotel}/informations-supplementaires/{meta}', [HtGestionMetaController::class, 'destroy'])
        ->name('mgs-hotels.informations-supplementaires.destroy');

    // Routes ressource pour les chambres
    Route::resource('mgs-chambres', HtGestionChambreController::class)->middleware('auth');

    Route::get('/chambres/{chambre}/images', [HtGestionChambreController::class, 'showImages'])
    ->name('mgs-chambres.show-images')->middleware('auth');
    Route::post('/chambres/{chambre}/update-image-principale', [HtGestionChambreController::class, 'updateImagePrincipale'])
    ->name('mgs-chambres.update-image-principale')->middleware('auth');

    Route::post('/chambres/{chambre}/add-image-secondaire', [HtGestionChambreController::class, 'addImageSecondaire'])
    ->name('mgs-chambres.add-image-secondaire')->middleware('auth');

    Route::delete('/chambres/images/{image}', [HtGestionChambreController::class, 'deleteImageSecondaire'])
    ->name('mgs-chambres.delete-image-secondaire')->middleware('auth');

    // Routes ressource pour les promotions
    Route::resource('mgs-promotions', HtGestionPromotionController::class)->middleware('auth');

    // Routes ressource pour les réservations
    Route::resource('htm-reservations', HtGestionReservationController::class)->middleware('auth');
    Route::post('/reservations/{id}/validate', [HtGestionReservationController::class, 'validateReservation'])
    ->name('mgs-reservations.validate')->middleware('auth');
});
