<?php

namespace App\Models\Supermarche;

use Illuminate\Support\Str;
use App\Models\Supermarche\Tag;
use App\Models\Supermarche\Store;
use App\Models\Supermarche\Commande;
use App\Models\Supermarche\Categorie;
use App\Models\Supermarche\Variation;
use Illuminate\Database\Eloquent\Model;
use App\Models\Supermarche\ImageSecondaire;

class Produit extends Model
{
    protected $fillable = [
        'store_id',
        'nom',
        'description_courte',
        'description',
        'prix',
        'pourcentage_reduction',
        'image_principale',
        'statut',
        'is_variable',
        'est_populaire',
    ];

    // Relation Many-to-Many avec Categorie
    public function categories()
    {
        return $this->belongsToMany(Categorie::class, 'produit_categorie');
    }

    // Relation Many-to-Many avec Tag
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'produit_tag');
    }

    // Relation One-to-Many avec Variation
    public function variations()
    {
        return $this->hasMany(Variation::class);
    }

    public function imagesSecondaires()
    {
        return $this->hasMany(ImageSecondaire::class);
    }

    // Relation one to Many avec Store (Magasin)
    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }


    // Génération automatique du slug basé sur le nom
    public function setNomAttribute($value)
    {
        $this->attributes['nom'] = $value;
        $this->attributes['slug'] = Str::slug($value, '-');
    }


    // Relation Many-to-Many avec Commande via la table pivot commande_produit
    public function commandes()
    {
        return $this->belongsToMany(Commande::class, 'commande_produit')
                    ->withPivot('quantite', 'prix_unitaire', 'prix_total')
                    ->withTimestamps();
    }

    public function scopeForVendor($query, $user) {
        return $query->whereIn('store_id', $user->stores()->pluck('stores.id'));
    }
    
    /**
     * Accessor pour formater l'URL de l'image principale.
     *
     * @param string|null $value
     * @return string|null
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
