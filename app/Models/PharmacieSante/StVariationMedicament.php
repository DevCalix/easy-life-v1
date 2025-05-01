<?php

namespace App\Models\PharmacieSante;

use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StMedicament;

class StVariationMedicament extends Model
{
    protected $fillable = [
        'st_medicament_id',
        'type_variation',
        'valeur_variation',
        'prix',
        'image_variation',
    ];

    public function medicament()
    {
        return $this->belongsTo(StMedicament::class, 'st_medicament_id');
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
