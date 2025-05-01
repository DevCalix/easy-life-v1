<?php

namespace App\Models\Restaurant;

use App\Models\Restaurant\Repas;
use Illuminate\Database\Eloquent\Model;
use App\Models\Restaurant\RepasCommande;
use App\Models\Restaurant\VariationRepas;

class DetailCommandeRepas extends Model
{
    protected $fillable = [
        'commande_id',
        'repas_id',
        'variation_id',
        'quantite',
        'prix_unitaire',
        'prix_total',
    ];

    // Relation avec la commande
    public function commande()
    {
        return $this->belongsTo(RepasCommande::class, 'commande_id');
    }

    // Relation avec le repas
    public function repas()
    {
        return $this->belongsTo(Repas::class, 'repas_id');
    }

    // Relation avec la variation
    public function variation()
    {
        return $this->belongsTo(VariationRepas::class, 'variation_id');
    }
}
