<?php

namespace App\Models\HotelReservation;

use Illuminate\Database\Eloquent\Model;
use App\Models\HotelReservation\HtHotel;
use App\Models\HotelReservation\HtImage;
use App\Models\HotelReservation\HtPromotion;
use App\Models\HotelReservation\HtEquipement;
use App\Models\HotelReservation\HtReservation;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class HtChambre extends Model
{
    protected $fillable = [
        'ht_hotel_id',
        'numero_chambre',
        'type',
        'prix_par_nuit',
        'capacite',
        'lits_disponibles',
        'description',
        'est_disponible',
        'image_principale',
    ];

    // Relation avec l'hôtel
    public function hotel()
    {
        return $this->belongsTo(HtHotel::class, 'ht_hotel_id');
    }

    // Relation avec les réservations
    public function reservations()
    {
        return $this->hasMany(HtReservation::class, 'ht_chambre_id');
    }

    // Relation avec les promotions
    public function promotions()
    {
        return $this->hasMany(HtPromotion::class, 'ht_chambre_id');
    }

    // Relation avec les images secondaires
    public function images()
    {
        return $this->hasMany(HtImage::class, 'ht_chambre_id');
    }

    // Relation many-to-many avec les équipements
    public function equipements(): BelongsToMany
    {
        return $this->belongsToMany(HtEquipement::class, 'ht_chambre_equipement', 'ht_chambre_id', 'ht_equipement_id');
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
