<?php

namespace App\Models\PharmacieSante;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StMedicament;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class StCategorie extends Model
{
    // protected $table = 'st_categories';

    protected $fillable = [
        'nom',
        'slug',
        'description',
        'image_principale',
    ];

    public function medicaments()
    {
        return $this->belongsToMany(StMedicament::class, 'st_medicament_categorie', 'st_categorie_id', 'st_medicament_id');
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

    public static function boot()
    {
        parent::boot();

        static::creating(function ($categorie) {
            $categorie->slug = Str::slug($categorie->nom);
        });

        static::updating(function ($categorie) {
            $categorie->slug = Str::slug($categorie->nom);
        });
    }
}
