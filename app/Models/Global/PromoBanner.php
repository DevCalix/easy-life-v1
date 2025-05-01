<?php

namespace App\Models\Global;

use Illuminate\Database\Eloquent\Model;

class PromoBanner extends Model
{
    protected $fillable = [
        'promo_banner',
        'redirect_url',
        'statut',
    ];

    /**
     * Accessor pour formater l'URL de l'image.
     *
     * @param string|null $value
     * @return string|null
     */
    public function getPromoBannerAttribute($value)
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
