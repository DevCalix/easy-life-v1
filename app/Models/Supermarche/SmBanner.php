<?php

namespace App\Models\Supermarche;

use Illuminate\Database\Eloquent\Model;

class SmBanner extends Model
{
    protected $fillable = [
        'image_url',
        'redirect_url',
        'statut',
    ];

    /**
     * Accessor pour formater l'URL de l'image.
     *
     * @param string|null $value
     * @return string|null
     */
    public function getImageUrlAttribute($value)
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
