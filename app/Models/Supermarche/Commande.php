<?php

namespace App\Models\Supermarche;

use App\Models\User;
use App\Models\Supermarche\Produit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'utilisateur_id',
        'nom_client',
        'email_client',
        'telephone_client',
        'montant_total',
        'statut',
    ];

    // Relation Many-to-Many avec Produit via la table pivot commande_produit
    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'commande_produit')
                    ->withPivot('quantite', 'prix_unitaire', 'prix_total')
                    ->withTimestamps();
    }

    // Relation avec l'utilisateur (si connecté)
    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'utilisateur_id');
    }


}
