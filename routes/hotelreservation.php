<?php
use App\Http\Middleware\IsAdmin;
use App\Http\Controllers\HotelReservation\HtHotelMetaController;
use App\Http\Controllers\HotelReservation\HtAvisController;
use App\Http\Controllers\HotelReservation\HtHotelController;
use App\Http\Controllers\HotelReservation\HtProfilController;
use App\Http\Controllers\HotelReservation\HtChambreController;
use App\Http\Controllers\HotelReservation\HtServiceController;
use App\Http\Controllers\HotelReservation\HtPromotionController;
use App\Http\Controllers\HotelReservation\HtEquipementController;
use App\Http\Controllers\HotelReservation\HtReservationController;
use App\Http\Controllers\HotelReservation\GlobalHotelReservationController;


Route::prefix('reservation-hotel')->group(function(){
    Route::get('/', [GlobalHotelReservationController::class, 'index'])->name('reservation-hotel.accueil');

    // Routes ressource pour les hôtels
    Route::resource('hotels', HtHotelController::class)->middleware(IsAdmin::class);
    // Routes pour la gestion des images
    Route::get('/hotels/{hotel}/images', [HtHotelController::class, 'showImages'])
    ->name('hotels.show-images')->middleware(IsAdmin::class);
    Route::post('/hotels/{hotel}/update-image-principale', [HtHotelController::class, 'updateImagePrincipale'])
    ->name('hotels.update-image-principale')->middleware(IsAdmin::class);

    Route::post('/hotels/{hotel}/add-image-secondaire', [HtHotelController::class, 'addImageSecondaire'])
    ->name('hotels.add-image-secondaire')->middleware(IsAdmin::class);

    Route::delete('/hotels/images/{image}', [HtHotelController::class, 'deleteImageSecondaire'])
    ->name('hotels.delete-image-secondaire')->middleware(IsAdmin::class);
    // Routes pour les équipements
    Route::get('/equipements', [HtEquipementController::class, 'index'])->name('equipements.index')->middleware('auth');
    Route::post('/equipements', [HtEquipementController::class, 'store'])->name('equipements.store')->middleware('auth');

    // Routes pour les services
    Route::get('/services', [HtServiceController::class, 'index'])->name('services.index')->middleware('auth');
    Route::post('/services', [HtServiceController::class, 'store'])->name('services.store')->middleware('auth');

    // Routes ressource pour les chambres
    Route::resource('chambres', HtChambreController::class)->middleware(IsAdmin::class);

    Route::get('/chambres/{chambre}/images', [HtChambreController::class, 'showImages'])
    ->name('chambres.show-images')->middleware(IsAdmin::class);
    Route::post('/chambres/{chambre}/update-image-principale', [HtChambreController::class, 'updateImagePrincipale'])
    ->name('chambres.update-image-principale')->middleware(IsAdmin::class);

    Route::post('/chambres/{chambre}/add-image-secondaire', [HtChambreController::class, 'addImageSecondaire'])
    ->name('chambres.add-image-secondaire')->middleware(IsAdmin::class);

    Route::delete('/chambres/images/{image}', [HtChambreController::class, 'deleteImageSecondaire'])
    ->name('chambres.delete-image-secondaire')->middleware(IsAdmin::class);

    // Routes ressource pour les réservations
    Route::resource('reservations', HtReservationController::class)->middleware('auth');

    // Routes ressource pour les promotions
    Route::resource('promotions', HtPromotionController::class)->middleware(IsAdmin::class);

    // Routes ressource pour les avis
    Route::resource('avis', HtAvisController::class);

    Route::get('/nos-hotels/{id}', [GlobalHotelReservationController::class, 'nosHotels'])->name('nos.hotels');
    Route::get('/chambre-details/{id}', [GlobalHotelReservationController::class, 'chambreDetails'])->name('chambre.details');
    Route::get('/promotion-details/{id}', [GlobalHotelReservationController::class, 'promoDetails'])->name('promotion.details');
    Route::get('/recherche-logement', [GlobalHotelReservationController::class, 'search'])->name('hotels.search');
    Route::get('/chambres-disponible/{id}', [GlobalHotelReservationController::class, 'chambresDisponibles'])
    ->name('chambres.disponibles');

    Route::get('/reservations/{reservation_key}/status', [HtReservationController::class, 'showStatus'])
    ->name('reservation-hotel.reservations.status');

    // Afficher le formulaire de vérification du statut
    Route::get('/statut-reservations', [HtReservationController::class, 'showCheckStatusForm'])
    ->name('reservations.showCheckStatusForm');

    // Traiter la soumission du formulaire
    Route::post('/reservations/check-status', [HtReservationController::class, 'checkStatus'])
    ->name('reservations.checkStatus');

    Route::post('/reservations/{id}/validate', [HtReservationController::class, 'validateReservation'])
    ->name('reservations.validate')->middleware('auth'); 

    // Route pour afficher le formulaire d'avis
    Route::get('/hotel/{hotel}/avis/create', [HtAvisController::class, 'create'])
    ->name('hotel.avis.create')
    ->middleware('auth');

    // Route pour enregistrer un avis
    Route::post('/hotel/{hotel}/avis', [HtAvisController::class, 'store'])
    ->name('hotel.avis.store')
    ->middleware('auth');

    // Route pour afficher le profil de l'utilisateur avec ses réservations
    Route::get('/profile', [HtProfilController::class, 'show'])
        ->name('hotel.profile')
        ->middleware('auth'); // Seuls les utilisateurs connectés peuvent accéder à cette page
    Route::get('/profile-edit', [HtProfilController::class, 'htProfilEdit'])->name('profile.htProfilEdit');
    Route::get('aide-et-assistance', [GlobalHotelReservationController::class, 'aideEtAssistance'])->name('aide-et-assistance');


    Route::get('/hotels/{hotel}/informations-supplementaires/create', [HtHotelMetaController::class, 'create'])
        ->name('hotels.informations-supplementaires.create');
    Route::post('/hotels/{hotel}/informations-supplementaires', [HtHotelMetaController::class, 'store'])
        ->name('hotels.informations-supplementaires.store');
    Route::delete('/hotels/{hotel}/informations-supplementaires/{meta}', [HtHotelMetaController::class, 'destroy'])
        ->name('hotels.informations-supplementaires.destroy');

});
