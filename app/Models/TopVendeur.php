<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TopVendeur extends Model
{
    protected $fillable = [
        'section',
        'nom',
        'description',
        'image',
        'lien_redirection',
    ];

    // Liste des sections disponibles
    public static function sectionsDisponibles()
    {
        return [

            'top_ventes' => 'Nos tops vendeurs',
            
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
