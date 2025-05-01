<?php

namespace App\Models\Supermarche;

use App\Models\Supermarche\Produit;
use App\Models\Supermarche\Variation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Panier extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'session_id',
        'produit_id',
        'variation_id',
        'quantite',
        'prix_unitaire',
        'prix_total',
    ];

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'produit_id');
    }

    // Relation avec la variation
    public function variation()
    {
        return $this->belongsTo(Variation::class, 'variation_id');
    }
}
