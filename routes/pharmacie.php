<?php

use App\Http\Middleware\IsAdmin;
use App\Http\Controllers\Pharmacie\StPanierController;
use App\Http\Middleware\PharmacieSante\CheckAbonneVip;
use App\Http\Controllers\Pharmacie\PharmacieController;
use App\Http\Controllers\Pharmacie\StHopitalController;
use App\Http\Controllers\Pharmacie\StMedecinController;
use App\Http\Controllers\Pharmacie\StProfileController;
use App\Http\Controllers\Pharmacie\OrdonnanceController;
use App\Http\Controllers\Pharmacie\StCommandeController;
use App\Http\Controllers\Pharmacie\StCategorieController;
use App\Http\Controllers\Pharmacie\StVipAbonneController;
use App\Http\Controllers\Pharmacie\StMedicamentController;
use App\Http\Controllers\Pharmacie\StRdvMedicalController;
use App\Http\Controllers\Pharmacie\PharmacieMetaController;
use App\Http\Controllers\Pharmacie\GlobalPharmacieController;
    Route::prefix('pharmacie-sante')->group(function(){
        Route::get('/', [GlobalPharmacieController::class, 'index'])->name('accueil.pharmacie');
        Route::get('/urgence-sante', [GlobalPharmacieController::class, 'urgenceSante'])->name('urgence.sante')->middleware('auth');

        // Routes pour la gestion des pharmacies
        Route::resource('pharmacie', PharmacieController::class)->middleware(IsAdmin::class);

        // Routes pour la gestion des images
        Route::get('/pharmacies/{pharmacie}/images', [PharmacieController::class, 'showImages'])
        ->name('pharmacies.show-images')->middleware(IsAdmin::class);
        Route::post('/pharmacies/{pharmacie}/update-image-principale', [PharmacieController::class, 'updateImagePrincipale'])
        ->name('pharmacies.update-image-principale')->middleware(IsAdmin::class);

        Route::post('/pharmacies/{pharmacie}/add-image-secondaire', [PharmacieController::class, 'addImageSecondaire'])
        ->name('pharmacies.add-image-secondaire')->middleware(IsAdmin::class);

        Route::delete('/pharmacies/images/{image}', [PharmacieController::class, 'deleteImageSecondaire'])
        ->name('pharmacies.delete-image-secondaire')->middleware(IsAdmin::class);
        // Routes pour la gestion des categories
        Route::resource('medoc-categorie', StCategorieController::class)->middleware(IsAdmin::class);

        // Routes pour la gestion des medicaments
        Route::resource('medicaments', StMedicamentController::class)->middleware(IsAdmin::class);
         // Routes pour la gestion des images
         Route::get('/medicaments/{medicament}/images', [StMedicamentController::class, 'showImages'])
         ->name('medicaments.show-images')->middleware(IsAdmin::class);
         Route::post('/medicaments/{medicament}/update-image-principale', [StMedicamentController::class, 'updateImagePrincipale'])
         ->name('medicaments.update-image-principale')->middleware(IsAdmin::class);

         Route::post('/medicaments/{medicament}/add-image-secondaire', [StMedicamentController::class, 'addImageSecondaire'])
         ->name('medicaments.add-image-secondaire')->middleware(IsAdmin::class);

         Route::delete('/medicaments/images/{image}', [StMedicamentController::class, 'deleteImageSecondaire'])
         ->name('medicaments.delete-image-secondaire')->middleware(IsAdmin::class);

         // Routes pour la gestion des Variations
         Route::get('/medicaments/{medicament}/variations', [StMedicamentController::class, 'showVariations'])
         ->name('medicaments.show-variations')->middleware(IsAdmin::class);
         Route::delete('/medicaments/variations/{variation}', [StMedicamentController::class, 'destroyVariation'])
         ->name('medicaments.variations.destroy')->middleware(IsAdmin::class);

         Route::post('/medicaments/{medicament}/variations', [StMedicamentController::class, 'storeVariations'])
         ->name('medicaments.variations.store')->middleware(IsAdmin::class);

        // Routes pour la gestion des hopitaux
        Route::resource('hopitaux', StHopitalController::class)->middleware(IsAdmin::class);
         // Routes pour la gestion des images
         Route::get('/hopitaux/{medicament}/images', [StHopitalController::class, 'showImages'])
         ->name('hopitaux.show-images')->middleware(IsAdmin::class);
         Route::post('/hopitaux/{medicament}/update-image-principale', [StHopitalController::class, 'updateImagePrincipale'])
         ->name('hopitaux.update-image-principale')->middleware(IsAdmin::class);

         Route::post('/hopitaux/{medicament}/add-image-secondaire', [StHopitalController::class, 'addImageSecondaire'])
         ->name('hopitaux.add-image-secondaire')->middleware(IsAdmin::class);

         Route::delete('/hopitaux/images/{image}', [StHopitalController::class, 'deleteImageSecondaire'])
         ->name('hopitaux.delete-image-secondaire')->middleware(IsAdmin::class);

        Route::get('/pharmacie-sante/categories/{slug}', [GlobalPharmacieController::class, 'medicamentsParCategorie'])->name('medicaments.par-categorie');


         Route::get('/medicaments-urgents', [GlobalPharmacieController::class, 'allUrgents'])
         ->name('medicaments.urgents.all');
         //Page Medicament
         Route::get('/medicaments/details/{slug}', [GlobalPharmacieController::class, 'detailsMedicaments'])->name('medicaments.details')->middleware('auth');

         Route::get('/pharmacies-de-garde', [GlobalPharmacieController::class, 'pharmaciesDeGarde'])->name('pharmacies-de-garde');
         Route::get('/pharmacies-proches', [GlobalPharmacieController::class, 'pharmaciesProche'])->name('pharmacies-proche');
         Route::get('/info-pharmacies/{id}', [GlobalPharmacieController::class, 'infoPharmacie'])->name('pharmacie.info');
         // Routes pour la gestion des hopitaux
        Route::resource('specialiste-de-sante', StMedecinController::class)->middleware('auth');
        Route::get('/all-specialistes', [GlobalPharmacieController::class, 'allSpecialiste'])->middleware(['auth', CheckAbonneVip::class])->name('specialiste.all');
        // Route pour afficher la page d'abonnement VIP
        Route::get('/abonnement-vip', [StVipAbonneController::class, 'showAbonnementPage'])->name('abonnement.vip');
        Route::post('/abonnement-vip/enregistrer', [StVipAbonneController::class, 'enregistrerAbonnement']);

        // Mettre à jour l'image de profil
        Route::post('/specialiste-de-sante/profil/image', [StMedecinController::class, 'updateProfileImage'])->name('medecin.profil.updateImage')->middleware('auth');
         //Recherche
         Route::get('/recherche', [GlobalPharmacieController::class, 'rechercherMedicaments'])->name('pharmacie.recherche');
         Route::get('/recherche-suggestions', [GlobalPharmacieController::class, 'suggestionsMedicaments'])->name('pharmacie.suggestions');
         Route::get('/profile', [StProfileController::class, 'stProfil'])->name('profile.stUser')->middleware('auth');
         Route::get('/profile-edit', [StProfileController::class, 'stProfilEdit'])->name('profile.stProfilEdit')->middleware('auth');

        Route::get('/panier', [StPanierController::class, 'index'])->name('stpanier.index')->middleware('auth');
        Route::get('/mon-panier', [StPanierController::class, 'afficherPanier'])->name('pharmacie.panier')->middleware('auth');
        Route::post('/panier/ajouter', [StPanierController::class, 'ajouter'])->name('stpanier.ajouter')->middleware('auth');
        Route::put('/panier/mettre-a-jour/{id}', [StPanierController::class, 'mettreAJour'])->name('stpanier.mettre-a-jour')->middleware('auth');
        Route::delete('/panier/supprimer/{id}', [StPanierController::class, 'supprimer'])->name('stpanier.supprimer')->middleware('auth');
        Route::get('/paiement', [StPanierController::class, 'afficherPaiement'])->name('pharmacie.paiement')->middleware('auth');

        // Afficher la page de paiement pour un achat direct
        Route::get('/paiement/direct', [StPanierController::class, 'afficherPaiementDirect'])->name('pharmacie.paiement.direct')->middleware('auth');
        // Enregistrer la commande
        Route::post('/paiement/enregistrer-commande', [StPanierController::class, 'enregistrerCommande'])->name('pharmacie.enregistrer-commande')->middleware('auth');

        // Afficher la page d'upload des ordonnances
        Route::get('/upload-ordonnance', [OrdonnanceController::class, 'uploadForm'])
        ->name('ordonnance.upload')->middleware('auth');
        Route::get('/upload-ordonnance-direct', [OrdonnanceController::class, 'uploadFormDirect'])
        ->name('ordonnance.direct.upload')->middleware('auth');

        // Soumettre les ordonnances
        Route::post('/upload-ordonnance', [OrdonnanceController::class, 'upload'])
            ->name('ordonnance.upload.store')->middleware('auth');
        Route::post('/upload-ordonnance-direct', [OrdonnanceController::class, 'uploadDirect'])
            ->name('ordonnance.uploadDirect.store')->middleware('auth');

        // Afficher le formulaire de rendez-vous pour un médecin spécifique
        Route::get('/prendre-rendez-vous/{medecin}', [StRdvMedicalController::class, 'create'])
        ->name('prendre-rendez-vous.create')->middleware(CheckAbonneVip::class)->middleware('auth');

        // Soumettre le formulaire de rendez-vous
        Route::post('/prendre-rendez-vous', [StRdvMedicalController::class, 'store'])
            ->name('prendre-rendez-vous.store')->middleware('auth');
        // Afficher le formulaire de confirmation
        Route::get('/rendez-vous/{rdv}/confirmer', [StRdvMedicalController::class, 'confirmerForm'])
        ->name('rendez-vous.confirmer-form')->middleware('auth');

        // Confirmer le rendez-vous
        Route::post('/rendez-vous/{rdv}/confirmer', [StRdvMedicalController::class, 'confirmer'])
            ->name('rendez-vous.confirmer')->middleware('auth');

        // Annuler le rendez-vous
        Route::post('/rendez-vous/{rdv}/annuler', [StRdvMedicalController::class, 'annuler'])
            ->name('rendez-vous.annuler')->middleware('auth');

        Route::get('/admin/commandes', [StCommandeController::class, 'index'])->name('admin.commandes.pharmacie')->middleware('auth');
        Route::get('/admin/afficher-commandes/{commande}', [StCommandeController::class, 'afficherCommande'])->name('afficherCommande.pharmacie')->middleware('auth');
        Route::post('/afficher-commandes/{commande}/update-statut', [StCommandeController::class, 'updateStatut'])->name('updateStatut.pharmacie')->middleware('auth');

        Route::get('/pharmacies/{pharmacie}/informations-supplementaires/create', [PharmacieMetaController::class, 'create'])
            ->name('pharmacies.informations-supplementaires.create')->middleware(IsAdmin::class);
        Route::post('/pharmacies/{pharmacie}/informations-supplementaires', [PharmacieMetaController::class, 'store'])
            ->name('pharmacies.informations-supplementaires.pharmacie')->middleware(IsAdmin::class);
        Route::delete('/pharmacies/{pharmacie}/informations-supplementaires/{meta}', [PharmacieMetaController::class, 'destroy'])
            ->name('pharmacies.informations-supplementaires.destroy')->middleware(IsAdmin::class);

        Route::put('/panier/mettre-a-jour-quantite/{id}', [StPanierController::class, 'mettreAJourQuantite'])
        ->name('st-panier.mettre-a-jour-quantite')->middleware('auth');
    });
