<?php

namespace App\Models\Supermarche;

use App\Models\Managers\UserService;
use App\Models\Supermarche\Produit;
use App\Models\Supermarche\SupermarcheMeta;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'adresse',
        'coordonnees_map',
        'numero_telephone',
        'horaires_ouverture',
        'rating',
        'photo_store',
    ];

    /**
     * Relation many-to-many avec les produits
     */
    public function produits()
    {
        return $this->hasMany(Produit::class, 'store_id');
    }

    public function metas() {
        return $this->hasMany(SupermarcheMeta::class, 'store_id');
    }

    // Pour récupérer un méta spécifique
    public function getMeta($key) {
        return $this->metas()->where('cle', $key)->value('valeur');
    }

    public function gestionnaires()
    {
        return $this->morphMany(UserService::class, 'service', 'service_type', 'service_id');
    }

    public function users()
    {
        return $this->gestionnaires()->with('user');
    }

    /**
     * Accessor pour formater l'URL de l'image du magasin.
     *
     * @return Attribute
     */
    public function getPhotoStoreAttribute($value)
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
