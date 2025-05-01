<?php

namespace App\Models\Restaurant;

use Illuminate\Database\Eloquent\Model;
use App\Models\Restaurant\DetailCommandeRepas;
use App\Models\Restaurant\RepasCommandePanier;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RepasCommande extends Model
{
    protected $fillable = [
        'reference',
        'utilisateur_id',
        'nom_client',
        'email_client',
        'telephone_client',
        'montant_total',
        'statut',
    ];

    // Relation avec les repas commandés
    public function repas()
    {
        return $this->hasMany(RepasCommandePanier::class, 'commande_id');
    }
    public function details(): HasMany
    {
        return $this->hasMany(DetailCommandeRepas::class, 'commande_id');
    }
}
