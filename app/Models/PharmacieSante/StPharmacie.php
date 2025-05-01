<?php

namespace App\Models\PharmacieSante;

use App\Models\PharmacieSante\StAvis;
use App\Models\PharmacieSante\StImage;
use App\Models\PharmacieSante\StStock;
use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StCommande;
use App\Models\PharmacieSante\StMedicament;
use App\Models\PharmacieSante\PharmacieMeta;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StPharmacie extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'adresse',
        'heures_ouverture',
        'telephone',
        'lien_carte',
        'image_principale',
        'note',
        'pharmacie_de_garde',
    ];

    // Relation avec les médicaments
    public function medicaments()
    {
        return $this->hasMany(StMedicament::class, 'st_pharmacie_id');
    }

    public function images()
    {
        return $this->hasMany(StImage::class, 'st_pharmacie_id');
    }

    // Relation avec les stocks
    public function stocks()
    {
        return $this->hasMany(StStock::class, 'st_pharmacie_id');
    }
    // Relation avec les avis
    public function avis()
    {
        return $this->hasMany(StAvis::class, 'st_pharmacie_id');
    }
    public function commandes()
    {
        return $this->hasMany(StCommande::class, 'st_pharmacie_id');
    }

    public function metas() {
        return $this->hasMany(PharmacieMeta::class, 'st_pharmacie_id');
    }

    // Pour récupérer un méta spécifique
    public function getMeta($key) {
        return $this->metas()->where('cle', $key)->value('valeur');
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
}
