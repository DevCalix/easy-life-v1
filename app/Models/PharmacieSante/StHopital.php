<?php

namespace App\Models\PharmacieSante;

use App\Models\PharmacieSante\StImage;
use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StMedecin;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StHopital extends Model
{
    use HasFactory;

    // Champs remplissables en masse
    protected $fillable = [
        'nom',
        'adresse',
        'telephone',
        'carte',
        'image_principale',
        'note',
    ];

    // Casts pour convertir automatiquement les types
    protected $casts = [
        'note' => 'float',
    ];

    /**
     * Relation avec les médecins, si applicable
     */
    public function medecins()
    {
        return $this->hasMany(StMedecin::class);
    }

    public function images()
    {
        return $this->hasMany(StImage::class, 'st_hopital_id');
    }

    /**
     * Accessor pour formater l'URL de l'image.
     */
    public function getImagePrincipaleAttribute($value)
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
