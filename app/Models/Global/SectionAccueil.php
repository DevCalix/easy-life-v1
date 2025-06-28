<?php

namespace App\Models\Global;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SectionAccueil extends Model
{
    use HasFactory;
    protected $table = 'section_accueils';

    protected $fillable = [
        'section',
        'nom_produit',
        'prix',
        'prix_promotion',
        'pourcentage_promotion',
        'image',
        'lien_redirection',
    ];

    // Si tu veux des casts automatiques pour les prix :
    protected $casts = [
        'prix' => 'float',
        'prix_promotion' => 'float',
        'pourcentage_promotion' => 'float',
    ];

    // Liste des sections disponibles
    public static function sectionsDisponibles()
    {
        return [
            'inspire_visites' => 'Inspiré de vos visites',
            'nouveaux_arrivages' => 'Nouveaux arrivages',
            'meilleures_offres' => 'Nos meilleurs offres',
            'top_ventes' => 'Nos tops vendeurs',
            'mini_prix' => 'Sélection de mini prix',
            'pret_livraison' => 'Prêt à la livraison',
            'meilleures_marques' => 'Nos meilleurs marques',
            'faim' => 'Tu as faim le matin, à midi ou le soir',
            'produits_alimentaires' => 'Produits mangeables',
            'qualite_certifiee' => 'Qualité certifiée',
            'tendance' => 'Tendance du moment',
            'offre_mois' => 'Offre du mois'
        ];
    }

    // Accesseur pour formater l'URL de l'image
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
