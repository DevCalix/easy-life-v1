<?php

namespace App\Providers;

use App\Models\Supermarche\Store;
use App\Policies\StorePolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configuration des policies
        Gate::policy(Store::class, StorePolicy::class);
        Vite::prefetch(concurrency: 3);
        // Charger les migrations dans le sous-dossier supermarche
        $this->loadMigrationsFrom(database_path('migrations/supermarche'));
        $this->loadMigrationsFrom(database_path('migrations/restaurant'));
        $this->loadMigrationsFrom(database_path('migrations/hotelreservation'));
        $this->loadMigrationsFrom(database_path('migrations/pharmaciesante'));

    }
}
