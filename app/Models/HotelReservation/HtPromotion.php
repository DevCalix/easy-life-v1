<?php

namespace App\Models\HotelReservation;

use Illuminate\Database\Eloquent\Model;
use App\Models\HotelReservation\HtHotel;
use App\Models\HotelReservation\HtChambre;

class HtPromotion extends Model
{
    protected $fillable = [
        'ht_hotel_id', 'ht_chambre_id', 'pourcentage_reduction', 'date_debut', 'date_fin', 'description'
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
}
