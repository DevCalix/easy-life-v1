<?php

namespace App\Models\HotelReservation;

use Illuminate\Database\Eloquent\Model;
use App\Models\HotelReservation\HtHotel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class HtService extends Model
{
    protected $fillable = [
        'nom', // Nom du service (ex: Réception 24h/24, Room service, Navette aéroport)
    ];

    // Relation many-to-many avec les hôtels
    public function hotels(): BelongsToMany
    {
        return $this->belongsToMany(HtHotel::class, 'ht_hotel_service', 'ht_service_id', 'ht_hotel_id');
    }
}
