<?php

namespace App\Models\HotelReservation;

use App\Models\HotelReservation\HtAvis;
use Illuminate\Database\Eloquent\Model;
use App\Models\HotelReservation\HtImage;
use App\Models\HotelReservation\HtChambre;
use App\Models\HotelReservation\HtService;
use App\Models\HotelReservation\HtHotelMeta;
use App\Models\HotelReservation\HtPromotion;
use App\Models\HotelReservation\HtEquipement;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class HtHotel extends Model
{
    protected $fillable = [
        'nom',
        'type_etablissement',
        'adresse',
        'numero_appartement_etage',
        'ville',
        'pays_region',
        'telephone',
        'email',
        'description',
        'repas_offerts',
        'parking',
        'horaires_arrivee_de',
        'horaires_arrivee_a',
        'horaires_depart_de',
        'horaires_depart_a',
        'accepte_enfants',
        'accepte_animaux',
        'fumer',
        'note',
        'image_principale',
    ];

    protected $casts = [
        'equipements' => 'array', // Convertit le champ JSON en tableau PHP
        'services' => 'array',    // Convertit le champ JSON en tableau PHP
    ];

    // Relation avec les chambres
    public function chambres(): HasMany
    {
        return $this->hasMany(HtChambre::class, 'ht_hotel_id');
    }

    // Relation avec les avis
    public function avis(): HasMany
    {
        return $this->hasMany(HtAvis::class, 'ht_hotel_id');
    }

    // Relation avec les promotions
    public function promotions(): HasMany
    {
        return $this->hasMany(HtPromotion::class, 'ht_hotel_id');
    }

    // Relation avec les images secondaires
    public function images(): HasMany
    {
        return $this->hasMany(HtImage::class, 'ht_hotel_id');
    }

    // Relation many-to-many avec les équipements
    public function equipements(): BelongsToMany
    {
        return $this->belongsToMany(HtEquipement::class, 'ht_hotel_equipement', 'ht_hotel_id', 'ht_equipement_id');
    }

    // Relation many-to-many avec les services
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(HtService::class, 'ht_hotel_service', 'ht_hotel_id', 'ht_service_id');
    }

    public function metas() {
        return $this->hasMany(HtHotelMeta::class, 'ht_hotel_id');
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
