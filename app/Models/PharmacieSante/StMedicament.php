<?php

namespace App\Models\PharmacieSante;

use Illuminate\Support\Str;
use App\Models\PharmacieSante\StImage;
use App\Models\PharmacieSante\StStock;
use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StCategorie;
use App\Models\PharmacieSante\StPharmacie;
use App\Models\PharmacieSante\StPromotion;
use App\Models\PharmacieSante\StDetailCommande;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\PharmacieSante\StVariationMedicament;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StMedicament extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'slug',
        'description',
        'image_principale',
        'prix',
        'ordonnance_requise',
        'medicament_urgent',
        'st_pharmacie_id',
    ];

    // Relation avec la pharmacie
    public function pharmacie()
    {
        return $this->belongsTo(StPharmacie::class, 'st_pharmacie_id');
    }

    // Relation avec les images
    public function images()
    {
        return $this->hasMany(StImage::class, 'st_medicament_id');
    }

    public function categories()
    {
        return $this->belongsToMany(StCategorie::class, 'st_medicament_categorie', 'st_medicament_id', 'st_categorie_id');
    }


    public function stocks(): HasMany
    {
        return $this->hasMany(StStock::class, 'st_medicament_id');
    }

    public function promotions(): HasMany
    {
        return $this->hasMany(StPromotion::class, 'st_medicament_id');
    }

    public function details(): HasMany
    {
        return $this->hasMany(StDetailCommande::class, 'st_medicament_id');
    }

    public function variations()
    {
        return $this->hasMany(StVariationMedicament::class, 'st_medicament_id');
    }

    /**
     * Boot method pour gérer les événements du modèle
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($medicament) {
            $medicament->slug = self::generateUniqueSlug($medicament->nom, $medicament->st_pharmacie_id);
        });

        static::updating(function ($medicament) {
            if ($medicament->isDirty('nom')) { // Si le nom a changé
                $medicament->slug = self::generateUniqueSlug($medicament->nom, $medicament->st_pharmacie_id, $medicament->id);
            }
        });
    }

    /**
     * Génère un slug unique pour chaque médicament en fonction de sa pharmacie
     */
    private static function generateUniqueSlug($nom, $pharmacieId, $ignoreId = null)
    {
        $randomId = Str::upper(Str::random(10)); // Génère une chaîne aléatoire de 10 caractères
        $baseSlug = $randomId . '-' . Str::slug($nom);
        $slug = $baseSlug;
        $count = 1;

        while (self::query()
            ->where('slug', $slug)
            ->where('st_pharmacie_id', $pharmacieId)
            ->where('id', '!=', $ignoreId) // Ignore l'ID actuel en cas de mise à jour
            ->exists()) {
            $slug = $baseSlug . '-' . $count;
            $count++;
        }

        return $slug;
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
