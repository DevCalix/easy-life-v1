<?php

namespace App\Models\Restaurant;

use App\Models\Restaurant\Repas;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\Models\Restaurant\RestaurantMeta;
use App\Models\Restaurant\RestoReservation;

class Restaurant extends Model
{
    protected $fillable = [
        'random_id',
        'nom',
        'adresse',
        'coordonnees_map',
        'numero_telephone',
        'horaires_ouverture',
        'rating',
        'photo_restaurant',
    ];

    public function repas()
    {
        return $this->hasMany(Repas::class, 'restaurant_id');
    }

    public function reservations()
    {
        return $this->hasMany(RestoReservation::class, 'restaurant_id');
    }

    public function metas() {
        return $this->hasMany(RestaurantMeta::class, 'restaurant_id');
    }

    // Pour récupérer un méta spécifique
    public function getMeta($key) {
        return $this->metas()->where('cle', $key)->value('valeur');
    }

    /**
     * Accessor pour formater l'URL de l'image.
     */
    public function getPhotoRestaurantAttribute($value)
    {
        if (!$value) {
            return null;
        }

        // Si l'URL ne commence pas par "/storage/", l'ajouter
        if (!str_starts_with($value, '/storage/')) {
            return '/storage/' . $value;
        }

        return $value;
    }
}
