<?php

namespace App\Models\Supermarche;

use App\Models\Supermarche\VariationImage;
use App\Models\Supermarche\Produit;
use Illuminate\Database\Eloquent\Model;

class Variation extends Model
{
    protected $fillable = [
        'produit_id', 'type_variation', 'valeur_variation', 'prix_additionnel'
    ];

    // Relation One-to-Many avec Produit
    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function images()
    {
        return $this->hasMany(VariationImage::class);
    }

}
