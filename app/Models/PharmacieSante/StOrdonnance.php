<?php

namespace App\Models\PharmacieSante;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StCommande;
use App\Models\PharmacieSante\StMedicament;

class StOrdonnance extends Model
{
    protected $fillable = [
        'user_id',
        'st_medicament_id',
        'st_commande_id',  // Ce champ est maintenant facultatif
        'fichier_ordonnance',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commande()
    {
        return $this->belongsTo(StCommande::class, 'st_commande_id');
    }

    public function medicament()
    {
        return $this->belongsTo(StMedicament::class, 'st_medicament_id');
    }

    /**
     * Accessor pour formater l'URL de l'image.
     */
    public function getFichierOrdonnanceAttribute($value)
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
