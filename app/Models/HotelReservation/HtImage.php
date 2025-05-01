<?php

namespace App\Models\HotelReservation;

use Illuminate\Database\Eloquent\Model;
use App\Models\HotelReservation\HtHotel;
use App\Models\HotelReservation\HtChambre;

class HtImage extends Model
{
    protected $fillable = [
        'url', 'ht_hotel_id', 'ht_chambre_id'
    ];

    // Relation avec l'hôtel
    public function hotel()
    {
        return $this->belongsTo(HtHotel::class, 'ht_hotel_id');
    }

    // Relation avec la chambre
    public function chambre()
    {
        return $this->belongsTo(HtChambre::class, 'ht_chambre_id');
    }

    /**
     * Accessor pour formater l'URL de l'image.
     */
    public function getUrlAttribute($value)
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
