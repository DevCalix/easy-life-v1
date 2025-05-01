<?php

namespace App\Models\Restaurant;

use App\Models\Restaurant\Repas;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class CategorieRepas extends Model
{
    protected $fillable = ['nom','slug', 'description', 'image']; // Champs autorisés pour insertion/mise à jour
    public function repas()
    {
        return $this->hasMany(Repas::class, 'categorie_repas_id');
    }

    public function utilisateurs()
    {
        return $this->belongsToMany(User::class, 'restau_categorie_users');
    }

    /**
     * Accessor pour formater l'URL de l'image.
     */
    public function getImageAttribute($value)
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
