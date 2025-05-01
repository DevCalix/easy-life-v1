<?php

namespace App\Models\PharmacieSante;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StPharmacie;
use App\Models\PharmacieSante\StDetailCommande;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StCommande extends Model
{
    protected $fillable = [
        'user_id',
        'prix_total',
        'statut',
        'transaction_ref',
        'montant_total',
        'nom_client',
        'email_client',
        'telephone_client',
        'produits',
    ];

    protected $casts = [
        'produits' => 'array', // Cast le champ produits en array
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function pharmacie(): BelongsTo
    {
        return $this->belongsTo(StPharmacie::class, 'st_pharmacie_id');
    }

    public function details(): HasMany
    {
        return $this->hasMany(StDetailCommande::class, 'st_commande_id');
    }
}
