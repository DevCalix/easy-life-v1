<?php

use App\Http\Controllers\Pharmacie\StPharmaController;
use App\Http\Controllers\Pharmacie\StPharmaMetaController;
use App\Http\Controllers\Pharmacie\StsCategorieController;
use App\Http\Controllers\Pharmacie\StsCommandeController;
use App\Http\Controllers\Pharmacie\StsMedocsController;





Route::prefix('managers')->group(function(){
    // Routes pour la gestion des pharmacies
    Route::resource('sts-pharmacie', StPharmaController::class)->middleware('auth');

    // Routes pour la gestion des images
    Route::get('/pharmacies/{pharmacie}/images', [StPharmaController::class, 'showImages'])
    ->name('sts-pharmacies.show-images')->middleware('auth');
    Route::post('/pharmacies/{pharmacie}/update-image-principale', [StPharmaController::class, 'updateImagePrincipale'])
    ->name('sts-pharmacies.update-image-principale')->middleware('auth');

    Route::post('/pharmacies/{pharmacie}/add-image-secondaire', [StPharmaController::class, 'addImageSecondaire'])
    ->name('sts-pharmacies.add-image-secondaire')->middleware('auth');

    Route::delete('/pharmacies/images/{image}', [StPharmaController::class, 'deleteImageSecondaire'])
    ->name('sts-pharmacies.delete-image-secondaire')->middleware('auth');

    Route::get('/pharmacies/{pharmacie}/informations-supplementaires/create', [StPharmaMetaController::class, 'create'])
        ->name('sts-pharmacies.informations-supplementaires.create')->middleware('auth');
    Route::post('/pharmacies/{pharmacie}/informations-supplementaires', [StPharmaMetaController::class, 'store'])
        ->name('sts-pharmacies.informations-supplementaires.pharmacie')->middleware('auth');
    Route::delete('/pharmacies/{pharmacie}/informations-supplementaires/{meta}', [StPharmaMetaController::class, 'destroy'])
        ->name('sts-pharmacies.informations-supplementaires.destroy')->middleware('auth');
    
    // Routes pour la gestion des categories
    Route::resource('sts-medoc-categorie', StsCategorieController::class)->middleware('auth');

    // Routes pour la gestion des medicaments
    Route::resource('sts-medicaments', StsMedocsController::class)->middleware('auth');
    // Routes pour la gestion des images
    Route::get('/medicaments/{medicament}/images', [StsMedocsController::class, 'showImages'])
    ->name('sts-medicaments.show-images')->middleware('auth');
    Route::post('/medicaments/{medicament}/update-image-principale', [StsMedocsController::class, 'updateImagePrincipale'])
    ->name('sts-medicaments.update-image-principale')->middleware('auth');

    Route::post('/medicaments/{medicament}/add-image-secondaire', [StsMedocsController::class, 'addImageSecondaire'])
    ->name('sts-medicaments.add-image-secondaire')->middleware('auth');

    Route::delete('/medicaments/images/{image}', [StsMedocsController::class, 'deleteImageSecondaire'])
    ->name('sts-medicaments.delete-image-secondaire')->middleware('auth');

    // Routes pour la gestion des Variations
    Route::get('/medicaments/{medicament}/variations', [StsMedocsController::class, 'showVariations'])
    ->name('sts-medicaments.show-variations')->middleware('auth');
    Route::delete('/medicaments/variations/{variation}', [StsMedocsController::class, 'destroyVariation'])
    ->name('sts-medicaments.variations.destroy')->middleware('auth');

    Route::post('/medicaments/{medicament}/variations', [StsMedocsController::class, 'storeVariations'])
    ->name('sts-medicaments.variations.store')->middleware('auth');

    Route::get('/admin/commandes', [StsCommandeController::class, 'index'])->name('sts-admin.commandes.pharmacie')->middleware('auth');
    Route::get('/admin/afficher-commandes/{commande}', [StsCommandeController::class, 'afficherCommande'])->name('sts-afficherCommande.pharmacie')->middleware('auth');
    Route::post('/afficher-commandes/{commande}/update-statut', [StsCommandeController::class, 'updateStatut'])->name('sts-updateStatut.pharmacie')->middleware('auth');

});
