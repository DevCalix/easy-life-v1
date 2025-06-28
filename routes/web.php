<?php

use App\Http\Controllers\Admin\AdminSetupController;
use App\Http\Controllers\Admin\SubmenuController;
use App\Http\Controllers\Global\PopupController;
use App\Http\Controllers\Global\PromoBanController;
use App\Http\Controllers\Global\PromoBannerController;
use App\Http\Controllers\Global\SectionController;
use App\Http\Controllers\Global\TopVendeurController;
use App\Http\Controllers\GlobalController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Test\WhatsAppController;
use App\Http\Controllers\UserProfilController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;










Route::get('/', [GlobalController::class, 'index'])->name('easy-life');

Route::get('/dashboard-user', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth','verified'])->prefix('user-profile')->name('user-profile.')->group(function () {
    Route::get('/', [UserProfilController::class, 'index'])->name('index');
    Route::get('/create', [UserProfilController::class, 'create'])->name('create');
    Route::post('/', [UserProfilController::class, 'store'])->name('store');

    Route::get('/{id}/edit', [UserProfilController::class, 'edit'])->name('edit');
    Route::put('/{id}', [UserProfilController::class, 'update'])->name('update');

    // Route personnalisée pour la mise à jour de la photo
    Route::patch('/{id}/update-photo', [UserProfilController::class, 'updatePhoto'])->name('update-photo');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Afficher le formulaire pour devenir administrateur
    Route::get('/devenir-admin', [AdminSetupController::class, 'showForm'])->name('devenir.admin.form');

    // Traiter la soumission du formulaire
    Route::post('/devenir-admin', [AdminSetupController::class, 'processForm'])->name('devenir.admin.process');
});

Route::get('/politique-de-confidentialite', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

Route::prefix('adds')->group(function () {
    Route::resource('banners', PromoBannerController::class)->middleware(IsAdmin::class);
    Route::resource('section', SectionController::class)->middleware(IsAdmin::class);
    Route::put('section/{section}/update-image', [SectionController::class, 'updateImage'])
        ->name('section.updateImage')
        ->middleware(IsAdmin::class);
    Route::resource('top-vendeur', TopVendeurController::class)->middleware(IsAdmin::class);
    Route::put('top-vendeur/{topVendeur}/update-image', [TopVendeurController::class, 'updateImage'])
        ->name('top-vendeur.updateImage')
        ->middleware(IsAdmin::class);
    Route::resource('banniere', PromoBanController::class)->middleware(IsAdmin::class);
    Route::put('banniere/{promoBan}/toggle', [PromoBanController::class, 'toggle'])
        ->name('banniere.toggle')
        ->middleware(IsAdmin::class);
    Route::resource('popups', PopupController::class)->middleware(IsAdmin::class);

    // Route pour la mise à jour de l'image
    Route::post('/banners/{banner}/update-image', [PromoBannerController::class, 'updateImage'])
        ->name('banners.update-image')
        ->middleware(IsAdmin::class);

        Route::get('/contact-number/', [GlobalController::class, 'getPhoneNumber'])->name('admin.contact-number');
        Route::get('/contact-number/edit', [GlobalController::class, 'editPhoneNumber'])->name('admin.contact-number.edit')->middleware(IsAdmin::class);
        Route::put('/contact-number/update', [GlobalController::class, 'updatePhoneNumber'])->name('admin.contact-number.update')->middleware(IsAdmin::class);
});
Route::prefix('admin')->middleware(['auth',IsAdmin::class])->group(function(){
    Route::resource('sous-menu', SubmenuController::class);
});

Route::get('/active-popup', [PopupController::class, 'showPopup'])->name('active-popup');

//twillio test
Route::get('/test/send-form', [WhatsAppController::class, 'sendWhatsappForm']);
Route::post('/test/send-whatsapp', [WhatsAppController::class, 'sendWhatsapp']);
Route::post('/test/send-sms', [WhatsAppController::class, 'sendSms']);


require __DIR__.'/auth.php';
require __DIR__.'/supermarche.php';
require __DIR__.'/restaurant.php';
require __DIR__.'/hotelreservation.php';
require __DIR__.'/pharmacie.php';
require __DIR__.'/vendeur.php';
require __DIR__.'/restau-managers.php';
require __DIR__.'/htgestion.php';
require __DIR__.'/pharma-sts.php';
