<?php

namespace App\Models\Supermarche;

use App\Models\Supermarche\Produit;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Categorie extends Model
{
    protected $fillable = [
        'nom', 'slug', 'description','image_url',
    ];


    // Relation Many-to-Many avec Produit
    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'produit_categorie');
    }

    // Mutator pour générer le slug automatiquement
    public function setNomAttribute($value)
    {
        $this->attributes['nom'] = $value;
        $this->attributes['slug'] = Str::slug($value, '-'); // Génère un slug unique basé sur le nom
    }

    public function utilisateurs()
    {
        return $this->belongsToMany(User::class, 'sp_category_users');
    }
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
