<?php

namespace App\Models\Supermarche;

use Illuminate\Support\Str;
use App\Models\Supermarche\Produit;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'nom', 'slug'
    ];

    // Relation Many-to-Many avec Produit
    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'produit_tag');
    }

    // Mutator pour générer le slug automatiquement
    public function setNomAttribute($value)
    {
        $this->attributes['nom'] = $value;
        $this->attributes['slug'] = Str::slug($value, '-'); // Génère un slug unique basé sur le nom
    }
}
