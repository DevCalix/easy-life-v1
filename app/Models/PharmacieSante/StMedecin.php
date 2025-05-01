<?php

namespace App\Models\PharmacieSante;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StRdvMedical;

class StMedecin extends Model
{
    protected $fillable = [
        'user_id',
        'nom',
        'specialite',
        'adresse',
        'telephone',
        'email',
        'carte',
        'image_principale',
        'note',
    ];

    // Relation belongsTo avec User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Accessor pour formater l'URL de l'image.
     */
    public function getImagePrincipaleAttribute($value)
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

    /**
     * Relation avec les rendez-vous médicaux.
     */
    public function rdvs()
    {
        return $this->hasMany(StRdvMedical::class, 'st_medecin_id');
    }
}
