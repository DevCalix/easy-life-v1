<?php

namespace App\Models\Restaurant;

use App\Models\Restaurant\Repas;
use Illuminate\Database\Eloquent\Model;

class VariationRepas extends Model
{
    protected $fillable = [
        'repas_id',
        'type_variation',
        'valeur_variation',
        'prix',
        'image_variation',
    ];

    public function repas()
    {
        return $this->belongsTo(Repas::class, 'repas_id');
    }

    /**
     * Accessor pour formater l'URL de l'image.
     */
    public function getImageVariationAttribute($value)
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
