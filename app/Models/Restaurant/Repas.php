<?php

namespace App\Models\Restaurant;

use App\Models\Restaurant\Tagrepas;
use App\Models\Restaurant\Restaurant;
use Illuminate\Database\Eloquent\Model;
use App\Models\Restaurant\CategorieRepas;
use App\Models\Restaurant\VariationRepas;
use App\Models\Restaurant\ImageSecondaireRepas;

class Repas extends Model
{
    protected $fillable = [
        'repasId',
        'restaurant_id',
        'categorie_repas_id',
        'nom',
        'slug',
        'description',
        'prix',
        'reduction',
        'prix_reduit',
        'rating',
        'est_populaire',
        'photo',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    public function categorie()
    {
        return $this->belongsTo(CategorieRepas::class, 'categorie_repas_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tagrepas::class, 'repas_tagrepas', 'repas_id', 'tagrepas_id');
    }

    // Relation avec les images secondaires
    public function imagesSecondairesRepas()
    {
        return $this->hasMany(ImageSecondaireRepas::class, 'repas_id');
    }

    // Relation avec les variations de repas
    public function variations()
    {
        return $this->hasMany(VariationRepas::class, 'repas_id');
    }

    /**
     * Accessor pour formater l'URL de l'image.
     */
    public function getPhotoAttribute($value)
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
